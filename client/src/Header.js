// import React from 'react';

// const Header = () => {
//     return(
//         <div className="header">
//         <div className="bounds">
//           <a className="header--logo" href="/">Courses</a>
//           <nav><a className="signup" href="/signup">Sign Up</a><a className="signin" href="/signin">Sign In</a></nav>
//         </div>
//       </div>
//     )
// }

// export default Header; 

import React from 'react';
import { Link } from 'react-router-dom';

export default class Header extends React.PureComponent {
  render() {
    const { context } = this.props;
    const authUser = context.authenticatedUser;
    //console.log(authUser.user[0].firstName)

    return (
      <div className="header">
        <div className="bounds">
          <a href="/" className="header--logo">Courses</a>
          <nav>
          {authUser ?
              <React.Fragment>
                <span>Welcome, {authUser.user[0].firstName}!</span>
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
  }
};