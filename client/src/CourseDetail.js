//import statements
import React, {Component} from 'react';
import axios from 'axios';
import ReactMarkdown from "react-markdown";

//class or function declaration for the courses list, including export statement
export default class CourseDetail extends Component {
  //state declaration
  constructor() {
    super();
    this.state = {
      course: [],
      user: []
    };
  } 
  //console log helper function to help with debugging during development 
  consoleLog(){
  console.log(this.props.match.params)
  }
  
  //gets the course from the api
  retrieveCourses() {
    axios.get(`http://localhost:5000/api/courses/${this.props.match.params.id}`)
    .then(response => this.setState({course: response.data.course, user: response.data.user}))
    .catch(error => {
        console.log('Error fetching and parsing data', error);
    });    
  } 
  
  componentDidMount() {
     this.retrieveCourses();
     //this.consoleLog();
  }

  render() {
    //gets context, authenticated user, sets sources for materialsNeeded and description to later be used for ReactMarkdown
    const { context } = this.props;
    const authUser = context.authenticatedUser;
    //console.log(typeof this.state.course.materialsNeeded)
    let materialsSource = this.state.course.materialsNeeded; 
    let descSource = this.state.course.description;
    return (
      <div className="bounds">
              <div>
        <div className="actions--bar">
          <div className="bounds">
          <div className="grid-100">
          {/* returns different buttons depending on if there is an authenticator user and if they are the course owner */}
          {authUser ?
             authUser.user[0].id === this.state.course.userId ?
              <React.Fragment>
              <span><a className="button" href={'/courses/' + this.props.match.params.id + '/update'}> Update Course</a>
              <button className="button" onClick={this.submit} >Delete Course</button></span>
              <a className="button button-secondary" href="/">Return to List</a>
              </React.Fragment>
              : 
              <React.Fragment>
                <a className="button button-secondary" href="/">Return to List</a>
              </React.Fragment>
            :    
              <React.Fragment>
                <p>Is this your course? <a href='/signin'>Sign in</a> to make changes!</p>
                <a className="button button-secondary" href="/">Return to List</a>
              </React.Fragment>
            }
          </div>
          </div>
        </div>
        <div className="bounds course--detail">
          <div className="grid-66">
            <div className="course--header">
              <h4 className="course--label">Course</h4>
              <h3 className="course--title">{this.state.course.title}</h3>
              <p>By {this.state.user.firstName} {this.state.user.lastName}</p>
            </div>
            <div className="course--description">
               <ReactMarkdown source={descSource} />
            </div>
          </div>
          <div className="grid-25 grid-right">
            <div className="course--stats">
              <ul className="course--stats--list">
                <li className="course--stats--list--item">
                  <h4>Estimated Time</h4>
                  <h3>{this.state.course.estimatedTime}</h3>
                </li>
                <li className="course--stats--list--item">
                  <h4>Materials Needed</h4>
                  <ul>
                    <ReactMarkdown source={materialsSource} />
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      </div>
    )
  };
 

  //submit handler for my delete button
  submit = () => {
    //getting the course and the data for the currently signed in user
    //only course owners can delete courses
    const { context } = this.props;
    const emailAddress = context.authenticatedUser.user[0].emailAddress;
    const password = context.password;
    const credentials = {emailAddress, password}
    let course = this.state.course;
  


   context.data.deleteCourse(course, credentials)
    .then( 
       this.props.history.push('/'),
       //refresh is necessary so the course list doesn't display the delete course anymore
       window.location.reload(),
       console.log(`SUCCESS!`)
   )
  
  }
}
