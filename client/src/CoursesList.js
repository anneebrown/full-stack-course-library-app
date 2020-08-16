//import statements
//config
import React, {Component} from 'react';
import axios from 'axios';

let coursesToMap;
//class or function declaration for the courses list, including export statement
export default class CoursesList extends Component {
//method to connect to the api and retrieve data
//const url
//const options
//return fetch(url, options)
  // constructor() {
  //   super();
  //   this.state = {
  //     courses: [],
  //   };
  // } 
  let courseData;
  //let coursesToMap;
  retrieveCourses() {
    axios.get('http://localhost:5000/api/courses')
    .then(response => {
        courseData = response.data.courses;
        courseData.map((courseData) => { `<div className="bounds">
        <div className="grid-33"><a className="course--module course--link" href="/courses/${courseData.id}">
            <h4 className="course--label">Course</h4>
            <h3 className="course--title">${courseData.title}</h3>
        </a></div>`})
        //console.log(typeof coursesToMap)
        return courseData;
    })
    .catch(error => {
        console.log('Error fetching and parsing data', error);
    });    
  } 

  componentDidMount() {
      this.retrieveCourses();
  }

  render() {
    console.log(coursesToMap)
    return (

        <div className="grid-33"><a className="course--module course--add--module" href="/courses/create">
            <h3 className="course--add--title"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                viewBox="0 0 13 13" className="add">
                <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
              </svg>New Course</h3>
          </a></div>
    )
  };

//retrieve data with axios.get('localhost/5000/api/courses')
//map over data
//store courses in a variable

//courselist component


//course component

//return statement with html, using the courses data
//link to each course details page
//link to create a new course 
}
