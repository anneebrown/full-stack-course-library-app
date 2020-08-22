import React from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Courses from './Courses'
import Header from './Header'
import CourseDetail from './CourseDetail'
import CreateCourse from './CreateCourse'
import UserSignUp from './UserSignUp'
import withContext from './Context';

const UserSignUpWithContext = withContext(UserSignUp);

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <header className="App-header">
      <Header />
      </header>
      <Switch>
        <Route exact path="/" component={Courses} />
        <Route exact path="/courses/create" component={CreateCourse} />
        <Route exact path="/courses/:id" component={CourseDetail} />
        <Route exact path="/signup" component={UserSignUpWithContext} />
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
