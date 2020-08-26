import React, { Component } from 'react';
import Data from './Data';
import Cookies from 'js-cookie';

const Context = React.createContext(); 

export class Provider extends Component {

  state = {
    authenticatedUser: Cookies.getJSON('authenticatedUser') || null,
    password: Cookies.getJSON('password') || null,
  };

  constructor() {
    super();
    this.data = new Data();
  }

  render() {
    const { authenticatedUser, password } = this.state;
    console.log(this.state)

    const value = {
      authenticatedUser,
      password,
      data: this.data,
      actions: {// Add the 'actions' property and object
      signIn: this.signIn,
      signOut: this.signOut
      }
    };
    return (
      <Context.Provider value={value}>
        {this.props.children}
      </Context.Provider>  
    );
  }

  
  signIn = async (username, password) => {
    const user = await this.data.getUser(username, password);
    console.log(password);
    if (user !== null) {
      this.setState(() => {
        return {
          authenticatedUser: user,
          password: password
        };
      });
      console.log(this.state.password)
      // Set cookie
      Cookies.set('authenticatedUser', JSON.stringify(user), { expires: 1});
      Cookies.set('password', JSON.stringify(password), { expires: 1});
    }
    return user;
  }

  signOut = () => {
    this.setState(() => {
      return {
        authenticatedUser: null,
      };
    });
    Cookies.remove('authenticatedUser');
  }
}

export const Consumer = Context.Consumer;

/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */

export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {context => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  }
}

