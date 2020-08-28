import React, { Component } from 'react';
import Form from './Form';

export default class CreateCourse extends Component {
  
  //state declaration
  constructor(){
    super();
    this.state = {
      title: undefined,
      description: undefined,
      estimatedTime: undefined,
      materialsNeeded: undefined,
      userId: undefined,
      errors: [],
    }
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

    //if there are errors in the errors array, they are mapped over to display a list
    let errorsToRender = this.state.errors.map(error => <li key={error}>{error}</li>)

    return (
       <div className="bounds course--detail">
          <h1>Create Course</h1>
          <Form 
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Create Course"
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
                      placeholder="Course title..."
                      onChange={this.change}  />
                  </div>
                <p>By {context.authenticatedUser.user[0].firstName} {context.authenticatedUser.user[0].lastName}</p>
                
                <div>
                  <div className="course--description">
                    <textarea 
                      id="description" 
                      name="description" 
                      type="text"
                      onChange={this.change} 
                      placeholder="Course Description" />
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
                    onChange={this.change} 
                    placeholder="Hours" />
                </div>
                </li>
                <li className="course--stats--list--item">
                  <h4>Materials Needed</h4>
                  <textarea 
                    id="materialsNeeded" 
                    name="materialsNeeded"
                    type="text"
                    onChange={this.change} 
                    placeholder="List materials..." />
                    </li>
                </ul>
                </div>
                </div>
              </form>
              </React.Fragment>
              
            )} 

           
            />
        </div>
      
    );
  }

  //stores the entered form values in state, sets a userId depending on the authenticated user
  change = (event) => {
    const { context } = this.props;
    const userId = context.authenticatedUser.user[0].id;
    this.setState({userId: userId});
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

  //submit handler to create a new course, needs the authenticated user to pass to the create course function in Data.js as only signed in users can create courses
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
     .then( errors => {
      if (errors.length) {
        //console.log(errors)
        let errorTest = [];
        for ( let i = 0; i < errors.length; i ++) {
          errorTest.push(errors[i].message)
        }
        this.setState({ errors: errorTest });
        console.log(this.state.errors)
      } else {
        //console.log(emailAddress)
        console.log(`course has been successfully created!`)
        this.props.history.push('/')
      }
    })  
    .catch( err => { // handle rejected promises
      console.log(err);
      this.props.history.push('/error'); // push to history stack
    });
  }


  cancel = () => {
    this.props.history.push('/');
  }
}
