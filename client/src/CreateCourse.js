import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import Form from './Form';
//import Data from './Data';
//import config from './config';

export default class CreateCourse extends Component {
  state = {
    title: '',
    description: '',
    estimatedTime: '',
    materialsNeeded: '',
    userId: '',
    errors: [],
  }

  render() {
    const {
     // title,
     // description,
     // estimatedTime,
     // materialsNeeded,
      errors,
    } = this.state;

    return (
      <div className="bounds course--detail">
        <div className="grid-66">
          <h1>Create a new Course</h1>
          <Form 
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Create Course"
            elements={() => (
              <React.Fragment>
                <input 
                  id="title" 
                  name="title" 
                  type="text"
                  //value={} 
                  onChange={this.change} 
                  placeholder="Title" />
                <input 
                  id="description" 
                  name="description" 
                  type="text"
                  //value={description} 
                  onChange={this.change} 
                  placeholder="Course Description" />
                <input 
                  id="estimatedTime" 
                  name="estimatedTime"
                  type="text"
                  //value={estimatedTime} 
                  onChange={this.change} 
                  placeholder="Hours" />
                <input 
                  id="materialsNeeded" 
                  name="materialsNeeded"
                  type="text"
                  //value={materialsNeeded} 
                  onChange={this.change} 
                  placeholder="List materials..." />
              </React.Fragment>
            )} />
        </div>
      </div>
    );
  }

  change = (event) => {
    const { context } = this.props;
    const userId = context.authenticatedUser.user[0].id;
    this.setState({userId: userId});
    if(event.target.id == 'title'){
      this.setState({title: event.target.value})
    }
    if(event.target.id == 'description'){
      this.setState({description: event.target.value})
    }
    if(event.target.id == 'estimatedTime'){
      this.setState({estimatedTime: event.target.value})
    }
    if(event.target.id == 'materialsNeeded'){
      this.setState({materialsNeeded: event.target.value})
    }
    //const value = event.target.value;
  }

  submit = () => {
    const { context } = this.props;
    const emailAddress = context.authenticatedUser.user[0].emailAddress;
    const password = context.password;
    const credentials = {emailAddress, password}
    const userId = context.authenticatedUser.user[0].id;

    //this.setState({userId: userId});

    //console.log(userId)
    //console.log(typeof credentials)
    //console.log(authUser.user[0].userId)

    const {
      title,
      description,
      estimatedTime,
      materialsNeeded, 
    } = this.state; 

    // New course payload
    const course = {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userId
    };

    console.log(course)
  
    context.data.createCourse(course, credentials)
    // .then( errors => {
    // if (errors.length) {
    //     this.setState({ errors });
    // } else {
    //     console.log('course successfully created')
    //     .then(() => {
    //         this.props.history.push('/');    
    //     });
    // }
    // })  
    // .catch( err => { // handle rejected promises
    // console.log(err);
    // this.props.history.push('/error'); // push to history stack
    // });
  }


  cancel = () => {
    this.props.history.push('/');
  }
}
