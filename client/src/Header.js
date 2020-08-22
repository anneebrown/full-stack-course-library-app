import React from 'react';

const Header = () => {
    return(
        <div className="header">
        <div className="bounds">
          <a className="header--logo" href="/">Courses</a>
          <nav><a className="signup" href="/signup">Sign Up</a><a className="signin" href="/signin">Sign In</a></nav>
        </div>
      </div>
    )
}

export default Header; 