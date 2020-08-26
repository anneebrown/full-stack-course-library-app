//import statements
//config
import React, {Component} from 'react';
import axios from 'axios';

//class or function declaration for the courses list, including export statement
export default class Courses extends Component {
  constructor() {
    super();
    this.state = {
      courses: []
    };
  } 
  
  //gets the courses list from the api
  retrieveCourses() {
    axios.get('http://localhost:5000/api/courses')
    .then(response => this.setState({courses: response.data.courses}))
    .catch(error => {
        console.log('Error fetching and parsing data', error);
    });    
  } 

  //loops over the courses, creates html elements for each course and stores the elements in an array
  pushCourses() {
    let htmlCourses = [];
    for (let i = 0; i < this.state.courses.length; i++) {
     htmlCourses.push(<div className="grid-33" key={this.state.courses[i].id}><a className="course--module course--link" href={'/courses/' + this.state.courses[i].id}>
      <h4 className="course--label">Course</h4>
      <h3 className="course--title">{this.state.courses[i].title}</h3>
      </a></div>
     )
    }
    return htmlCourses;
  }

  componentDidMount() {
     this.retrieveCourses();
     this.pushCourses();
  }

  // componentDidUpdate() {
  //  this.retrieveCourses();
  //   this.pushCourses();
  // }

  //JSX to display the courses list and the button to create a new course
  render() {
    console.log(this.state.courses)
    return (
      <div className="bounds">
      {this.pushCourses()}
        <div className="grid-33"><a className="course--module course--add--module" href="/courses/create">
            <h3 className="course--add--title"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                viewBox="0 0 13 13" className="add">
                <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
              </svg>New Course</h3>
          </a></div>
      </div>
    )
  };
}
