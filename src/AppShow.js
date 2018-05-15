import React, { Component } from 'react';
import axios from "axios";
import "./App.css";
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';
import { Link } from "react-router-dom";

class AppShow extends Component {
  constructor(props){
    super(props);
    this.state = {
      post: []
    }
  }
  componentDidMount() {
    const postId = this.props.match.params.postId;
  	axios({
	    method: "get",
	    url: "https://jsonplaceholder.typicode.com/posts/"+ postId ,
	    headers: {
	      "Content-Type": "application/json",
	    }
	  })
	.then(response => {
      	this.setState({ post: response.data });
	})
	.catch(error => {
		console.log(error.response)
    });
  }

  render() {
    return (
      <div className="App">
            <div  className="col-sm-4 box">
               <Link to="/">Back</Link>
              <Card>
                <CardBody>
                  <CardTitle>
                   {this.state.post.id} {this.state.post.title}
                  </CardTitle>
                  <CardText>
                    {this.state.post.body}
                  </CardText>
                </CardBody>
              </Card>
            </div>
      </div>
    );
  }
}

export default AppShow;
