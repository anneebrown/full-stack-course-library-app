import React from 'react';
import { Link } from 'react-router-dom';

export default ({context}) => {
  
    const authUser = context.authenticatedUser;
    //console.log(authUser.user[0].firstName)

    //if there is an authenticated users, they are welcomed and given the option to signout, if there isn't they can sign up or in
    //"Courses" is a link to the main page of the app for an additional way of navigating
    return (
      <div className="header">
        <div className="bounds">
          <a href="/" className="header--logo">Courses</a>
          <nav>
          {authUser ?
              <React.Fragment>
                <span>Welcome, {authUser.user[0].firstName} {authUser.user[0].lastName}!</span>
                <Link className="signout" to="/signout">Sign Out</Link>
              </React.Fragment>
            :    
              <React.Fragment>
                <Link className="signup" to="/signup">Sign Up</Link>
                <Link className="signin" to="/signin">Sign In</Link>
              </React.Fragment>
            }
          </nav>
        </div>
      </div>
    );
 // }
};