import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AppShow from './AppShow';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter,Route } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <div>
      <Route exact path="/" component={App}/>
      <Route exact path="/post/:postId" component={AppShow}/>
    </div>
  </BrowserRouter>
  , document.getElementById('root'));
registerServiceWorker();
