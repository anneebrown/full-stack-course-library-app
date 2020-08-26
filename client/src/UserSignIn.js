import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';
//import config from './config';

export default class UserSignIn extends Component {
  state = {
    emailAddress: '',
    password: '',
    errors: [],
  }

  render() {
    const {
      //emailAddress,
      //password,
      errors,
    } = this.state;

    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign In</h1>
          <Form 
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Sign In"
            elements={() => (
              <React.Fragment>
                <input 
                  id="emailAddress" 
                  name="emailAddress" 
                  type="text"
                  //value={emailAddress} 
                  onChange={this.change} 
                  placeholder="Email Address" />
                <input 
                  id="password" 
                  name="password"
                  type="password"
                  //value={password} 
                  onChange={this.change} 
                  placeholder="Password" />                
              </React.Fragment>
            )} />
          <p>
            Don't have a user account? <Link to="/signup">Click here</Link> to sign up!
          </p>
        </div>
      </div>
    );
  }

  change = (event) => {
   //sets state depending on entered values
    if (event.target.id === 'emailAddress') {
      this.setState({emailAddress: event.target.value})
    }
    if (event.target.id === 'password') {
        this.setState({password: event.target.value})
      }
  }

  //upon submit, this signs the user in or returns errors
  submit = () => {
    const { context } = this.props;
    const { emailAddress, password } = this.state;
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    console.log(this.state)
    context.actions.signIn(emailAddress, password)
      .then( user => {
        if (user === null) {
          this.setState(() => {
            return { errors: [ 'Sign-in was unsuccessful' ] };
          });
        } else {
          this.props.history.push(from);
          console.log(`SUCCESS! ${emailAddress} is now signed in!`);
        }
      })
      .catch( err => {
        console.log(err);
        this.props.history.push('/error');
      })

  }
 
  //if the user changes their mind, this returns them to the main page
  cancel = () => {
    this.props.history.push('/');
  }
}
