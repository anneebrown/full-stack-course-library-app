import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import Form from './Form';
import axios from 'axios';
//import Data from './Data';
//import config from './config';

export default class UpdateCourse extends Component {
  constructor() {
    super();
    this.state = {
    id: '',
    title: '',
    description: '',
    estimatedTime: '',
    materialsNeeded: '',
    userId: '',
    errors: [],
  }
}

    //gets the course from the api
    retrieveCourses() {
        axios.get(`http://localhost:5000/api/courses/${this.props.match.params.id}`)
        .then(response => this.setState({
            //sets the id state so put requests can always be made to the correct api endpoint
            id: response.data.course.id, 
            title: response.data.course.title,
            description: response.data.course.description,
            estimatedTime: response.data.course.estimatedTime,
            materialsNeeded: response.data.course.materialsNeeded
        }),
            console.log(this.state)
        )
        .catch(error => {
            console.log('Error fetching and parsing data', error);
        });    
      } 

    componentDidMount(){
        this.retrieveCourses();
    }


  render() {
    const {
     // title,
     // description,
     // estimatedTime,
     // materialsNeeded,
      errors,
    } = this.state;

    const { context } = this.props;

    //maps over the errors array to create a list
    let errorsToRender = this.state.errors.map(error => <li key={error}>{error}</li>)

    return (
      <div className="bounds course--detail">
      <h1>Update Course</h1>
        <div>  
          <Form 
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Update Course"
            buttonClass="grid-100"
            elements={() => (
              <React.Fragment>
              <div>
              <p>{errorsToRender}</p>
              </div>
              <form>
                <div className="grid-66">
                  <div className="course--header">
                    <h4 className="course--label">Course</h4>
                    <input 
                      id="title" 
                      name="title" 
                      type="text"
                      className="input-title course--title--input" 
                      value={this.state.title}
                      onChange={this.change}  />
                  </div>
                <p>By {context.authenticatedUser.user[0].firstName} {context.authenticatedUser.user[0].lastName}</p>
                <div>
                  <div className="course--description">
                    <textarea 
                      id="description" 
                      name="description" 
                      type="text"
                      value={this.state.description}
                      onChange={this.change} 
                       />
                  </div>
                  </div>
                </div>
                <div className="grid-25 grid-right">
                  <div className="course--stats">
                    <ul class="course--stats--list">
                      <li class="course--stats--list--item">
                      <h4>Estimated Time</h4>
                  <div>
                  <input 
                    id="estimatedTime" 
                    name="estimatedTime"
                    type="text"
                    className="course--time--input"
                    value={this.state.estimatedTime}
                    onChange={this.change} 
                     />
                </div>
                </li>
                <li className="course--stats--list--item">
                  <h4>Materials Needed</h4>
                  <textarea 
                    id="materialsNeeded" 
                    name="materialsNeeded"
                    type="text"
                    value={this.state.materialsNeeded}
                    onChange={this.change} 
                     />
                    </li>
                </ul>
                </div>
                </div>
              </form>
              </React.Fragment>
            )} 

            />
        </div>
      </div>
    );
  }

  change = (event) => {
    //sets values for state depending on the user entering information
    const { context } = this.props;
    const userId = context.authenticatedUser.user[0].id;
    this.setState({userId: userId});
    this.setState({id: this.props.match.params.id})
    if(event.target.id === 'title'){
      this.setState({title: event.target.value})
    }
    if(event.target.id === 'description'){
      this.setState({description: event.target.value})
    }
    if(event.target.id === 'estimatedTime'){
      this.setState({estimatedTime: event.target.value})
    }
    if(event.target.id === 'materialsNeeded'){
      this.setState({materialsNeeded: event.target.value})
    }
    //const value = event.target.value;
  }

  //submits the put request 
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
      .then( errors => {
        if (errors.length) {
          //console.log(errors)
          let errorTest = [];
          for ( let i = 0; i < errors.length; i ++) {
            errorTest.push(errors[i].msg + ': ' + errors[i].param)
          }
          this.setState({ errors: errorTest });
          console.log(this.state.errors)
        } else {
          //console.log(emailAddress)
          console.log(`course has been successfully updated!`)
          this.props.history.push('/courses/' + course.id)
            // .then(() => {
            //   this.props.history.push('/');    
            // });
        }
      })  
      .catch( err => { // handle rejected promises
        console.log(err);
        this.props.history.push('/error'); // push to history stack
      });
  
  }


  cancel = () => {
    this.props.history.push('/courses/' + this.state.id);
  }
}
