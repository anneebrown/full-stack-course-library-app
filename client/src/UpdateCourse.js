import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import Form from './Form';
import axios from 'axios';
//import Data from './Data';
//import config from './config';

export default class UpdateCourse extends Component {
  state = {
    id: '',
    title: '',
    description: '',
    estimatedTime: '',
    materialsNeeded: '',
    userId: '',
    errors: [],
  }

    // //gets the course from the api
    // retrieveCourses() {
    //     axios.get(`http://localhost:5000/api/courses/${this.props.match.params.id}`)
    //     .then(response => this.setState({
    //         id: response.data.course.id, 
    //         title: response.data.course.title,
    //         description: response.data.course.description,
    //         estimatedTime: response.data.course.estimatedTime,
    //         materialsNeeded: response.data.course.materialsNeeded
    //     }),
    //         console.log(this.state)
    //     )
    //     .catch(error => {
    //         console.log('Error fetching and parsing data', error);
    //     });    
    //   } 


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
          <h1>Update this Course</h1>
          <Form 
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Update Course"
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
    this.setState({id: this.props.match.params.id})
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
      id,
      title,
      description,
      estimatedTime,
      materialsNeeded, 
    } = this.state; 

    // update course payload
    const course = {
      id, 
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userId
    };

    console.log(course)
  
    context.data.updateCourse(course, credentials)
    // .then( errors => {
    // if (errors.length) {
    //     this.setState({ errors });
    // } else {
    //     console.log('course successfully updated')
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
