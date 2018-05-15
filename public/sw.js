importScripts('/idb.js');

var CACHE_NAME = "blog";
var urlsToCache = [
  '/',
  '/App.js',
  '/AppShow.js',
  '/App.css',
  '/index.js',
  '/index.css',
  '/idb.js'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        // Open a cache and cache our files
        return cache.addAll(urlsToCache);
      })
  );
});


var dbPromise = idb.open("posts-store",1,function(db){
  if(!db.objectStoreNames.contains('posts')){
    db.createObjectStore('posts',{keyPath: 'id'})
  }
});


self.addEventListener('fetch', function(event) {
   var url = "https://jsonplaceholder.typicode.com/posts";
   if(event.request.url.indexOf(url) > -1){
     event.respondWith(fetch(event.request)
     .then(function (res) {
        var clonedRes = res.clone();
        clonedRes.json()
        .then(function(data){
          for(var key in data){
            dbPromise
            .then(function(db){
              var tx = db.transaction('posts', 'readwrite');
              var store = tx.objectStore('posts');
              store.put(data[key]);
              return tx.complete;
            });
          }
        });
        return res;
     })
   );
   }
});

// var dbPromise = idb.open('couches-n-things', 2, function(upgradeDb) {
//
// });



//
// dbPromise.then(function(db) {
//   var tx = db.transaction('products', 'readwrite');
//   var store = tx.objectStore('products');
//   var items = [
//     {
//       name: 'Couch',
//       id: 'cch-blk-ma',
//       price: 499.99,
//       color: 'black',
//       material: 'mahogany',
//       description: 'A very comfy couch',
//       quantity: 3
//     }
//   ];
//   return Promise.all(items.map(function(item) {
//       console.log('Adding item: ', item);
//       return store.add(item);
//     })
//   ).catch(function(e) {
//     tx.abort();
//     console.log(e);
//   }).then(function() {
//     console.log('All items added successfully!');
//   });
// });
