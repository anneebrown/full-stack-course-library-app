import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';

export default class UserSignUp extends Component {
  
  constructor(){
    super();
    this.state = {
    firstName: undefined,
    lastName: undefined,
    emailAddress: undefined,
    password: undefined,
    errors: [],
  }
}

  render() {
    const {
      firstName,
      lastName,
      emailAddress,
      password,
      errors,
    } = this.state;

    //errors array is mapped over and a list of errors is produced
    let errorsToRender = this.state.errors.map(error => <li key={error}>{error}</li>)

    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign Up</h1>
          <Form 
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Sign Up"
            elements={() => (
              <React.Fragment>
               <p>{errorsToRender}</p>
                <input 
                  id="firstName" 
                  name="firstName" 
                  type="text"
                  value={firstName} 
                  onChange={this.change} 
                  placeholder="First Name" />
                <input 
                  id="lastName" 
                  name="lastName" 
                  type="text"
                  value={lastName} 
                  onChange={this.change} 
                  placeholder="Last Name" />
                <input 
                  id="emailAddress" 
                  name="emailAddress" 
                  type="text"
                  value={emailAddress} 
                  onChange={this.change} 
                  placeholder="Email Address" />
                <input 
                  id="password" 
                  name="password"
                  type="password"
                  value={password} 
                  onChange={this.change} 
                  placeholder="Password" />
              </React.Fragment>
            )} />
          <p>
            Already have a user account? <Link to="/signin">Click here</Link> to sign in!
          </p>
        </div>
      </div>
    );
  }

  change = (event) => {
    //sets state depending on values entered
    if(event.target.id === 'firstName'){
      this.setState({firstName: event.target.value})
    }
    if(event.target.id === 'lastName'){
      this.setState({lastName: event.target.value})
    }
    if(event.target.id === 'emailAddress'){
      this.setState({emailAddress: event.target.value})
    }
    if(event.target.id === 'password'){
      this.setState({password: event.target.value})
    }
  }

  submit = () => {
    const { context } = this.props;
   
    const {
      firstName,
      lastName,
      emailAddress,
      password,
    } = this.state; 

    // New user payload
    const user = {
      firstName,
      lastName,
      emailAddress,
      password,
    };

    //creates the user in the database or returns errors
    context.data.createUser(user)
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
          console.log(emailAddress)
          console.log(`${firstName} is successfully signed up and authenticated!`);
          context.actions.signIn(emailAddress, password)
            .then(() => {
              this.props.history.push('/');    
            });
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
