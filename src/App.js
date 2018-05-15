import React, { Component } from 'react';
import axios from "axios";
import "./App.css";
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';
import { Link } from "react-router-dom";


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      title: '',
      body: '',
      posts: []
    }
  //  this.onChangeField = this.onChangeField.bind(this);
  }
  componentDidMount() {
  	axios({
	    method: "get",
	    url: "https://jsonplaceholder.typicode.com/posts" ,
	    headers: {
	      "Content-Type": "application/json",
	    }
	  })
	.then(response => {
      	this.setState({ posts: response.data });
	})
	.catch(error => {
		console.log(error.response)
    });
  }

  render() {
    return (
      <div className="App">
        {this.state.posts.map((c) => {
          return(
            <div key={c.id} className="col-sm-4 box">
              <Card>
                <CardBody>
                  <CardTitle>
                   <Link to={{pathname: `/post/${c.id}`}}> {c.title}</Link>
                  </CardTitle>
                  <CardText>{c.title}</CardText>
                </CardBody>
              </Card>
            </div>
          ) })}
      </div>
    );
  }
}

export default App;
