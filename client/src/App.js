import React from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Courses from './Courses';
import Header from './Header';
import NotFound from './NotFound';
import CourseDetail from './CourseDetail';
import CreateCourse from './CreateCourse';
import UpdateCourse from './UpdateCourse';
import UserSignUp from './UserSignUp';
import UserSignIn from './UserSignIn';
import UserSignOut from './UserSignOut';
import Error from './Error';
import withContext from './Context';
import PrivateRoute from './PrivateRoute';

const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const HeaderWithContext = withContext(Header);
const CreateCourseWithContext = withContext(CreateCourse);
const CourseDetailWithContext = withContext(CourseDetail);
const UpdateCourseWithContext = withContext(UpdateCourse);
const UserSignOutWithContext = withContext(UserSignOut);

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <header className="App-header">
      <HeaderWithContext />
      </header>
      <Switch>
        <Route exact path="/" component={Courses} />
        <PrivateRoute exact path="/courses/create" component={CreateCourseWithContext} />
        <Route exact path="/courses/:id" component={CourseDetailWithContext} />
        <PrivateRoute exact path="/courses/:id/update" component={UpdateCourseWithContext} />
        <Route exact path="/signup" component={UserSignUpWithContext} />
        <Route exact path="/signin" component={UserSignInWithContext} />
        <Route exact path="/signout" component={UserSignOutWithContext} />
        <Route exact path="/error" component={Error} />
        <Route component={NotFound} />
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
