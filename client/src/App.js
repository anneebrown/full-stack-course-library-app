import React from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Courses from './Courses'
import Header from './Header'
import CourseDetail from './CourseDetail'

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <header className="App-header">
      <Header />
      </header>
      <Switch>
        <Route exact path="/" component={Courses} />
        <Route exact path="/courses/:id" component={CourseDetail} />
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
