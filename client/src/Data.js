import config from './config';

export default class Data {

  //base method for all api calls
  api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
    const url = config.apiBaseUrl + path;
    //console.log(credentials.user[0].password)
  
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    // Check if auth is required
    if (requiresAuth) {    
      //console.log(credentials.emailAddress)
      const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);
      console.log(encodedCredentials)
      options.headers['Authorization'] = `Basic ${encodedCredentials}`;
    }

    return fetch(url, options);
  }

  //getUser function used while signing in and to verify the authenticated user
  async getUser(emailAddress, password) {
    console.log(emailAddress)
    const response = await this.api(`/users`, 'GET', null, true, { emailAddress, password });
    if (response.status === 200) {
      return response.json().then(data => data);
    }
    else if (response.status === 401) {
      return null;
    }
    else {
      throw new Error();
    }
  }
  
  //creates a user by making a post request to the api's users endpoint
  async createUser(user) {
    const response = await this.api('/users', 'POST', user);
    if (response.status === 201) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    else {
      throw new Error();
    }
  }

  //creates a course by making a post request to the api's courses endpoint
  async createCourse(course, authUser) {
    console.log(authUser)
    const response = await this.api('/courses', 'POST', course, true, authUser);
    if (response.status === 201) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    else {
      throw new Error();
    }
  }

  //updates a course by making a put request to the api's courses/:id endpoint
  async updateCourse(course, authUser) {
    //console.log(authUser)
    const response = await this.api('/courses/' + course.id, 'PUT', course, true, authUser);
    if (response.status === 204) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    else {
      throw new Error();
    }
  }

  //deletes a course by making a delete request
  async deleteCourse(course, authUser) {
    //console.log(authUser)
    const response = await this.api('/courses/' + course.id, 'DELETE', course, true, authUser);
    if (response.status === 204) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    else {
      throw new Error();
    }
  }
}
