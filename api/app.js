'use strict';

// load modules
const express = require('express');
const morgan = require('morgan');
const models = require('./models');
const {User, Course} = models;
const auth = require('basic-auth');
const bcryptjs = require('bcryptjs');
const { body, validationResult } = require('express-validator');
var cors = require('cors')

//FROM STACKOVERFLOW https://stackoverflow.com/questions/9177049/express-js-req-body-undefined
var bodyParser = require('body-parser')


// variable to enable global error logging
const enableGlobalErrorLogging = process.env.ENABLE_GLOBAL_ERROR_LOGGING === 'true';

// create the Express app
const app = express();

app.use(cors())
//FROM STACKOVERFLOW https://stackoverflow.com/questions/9177049/express-js-req-body-undefined
// create application/json parser
var jsonParser = bodyParser.json()

//FROM STACKOVERFLOW https://stackoverflow.com/questions/9177049/express-js-req-body-undefined
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// setup morgan which gives us http request logging
app.use(morgan('dev'));

//uses the stackoverflow thing
app.use(jsonParser);

// TODO setup your api routes here

//set up authentication middleware 
const authenticateUser = async (req, res, next) => {
  const credentials = auth(req);
  //console.log(credentials);
  let message;
  //console.log(message);
  if (credentials) {
    const user = await User.findAll({
      where: {
        emailAddress: credentials.name
      }
    });
    //console.log(user);
    if (user.length > 0) {
      const authenticated = bcryptjs
        .compareSync(credentials.pass, user[0].dataValues.password);
      if (authenticated) {
        req.currentUser = user;
      } else {
       message = `Authentication failure for username: ${user.username}`;
      } 
    } else {
      message = 'Auth header not found';
    }
  }
  if (message !== undefined) {
    //console.log(message);

    // Return a response with a 401 Unauthorized HTTP status code.
    res.status(401).json({ message: 'Access Denied' });
  } //else {
    next();
 // }
};

// setup a friendly greeting for the root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the REST API project!',
  });
});

//* USER ROUTES *//

//get route to get the current user
app.get('/api/users', authenticateUser, async (req, res) => {
  const user = await req.currentUser;
  //console.log(user);
  if(user) {
    res.json({
      user
    });
    res.status(200).end();
  } else {
    res.status(401).end();
  }
})

//post route to create a user
//urlencondedParser is from stackoverflow: https://stackoverflow.com/questions/9177049/express-js-req-body-undefined
app.post('/api/users', urlencodedParser, async (req, res) => {
  //await console.log(req.body);
  let user = req.body;
  try {
    //console.log(req.body);
    if(user.password){
      user.password = bcryptjs.hashSync(user.password);
    }
    await User.create(user);
    res.location('/');
    res.status(201).end();
  } catch (error) {
      if(error.name === "SequelizeValidationError" || error.name === "SequelizeUniqueConstraintError") {
        res.status(400).send(error);
      } else {
      throw error;
      }
     }  
  }
);

//* COURSE ROUTES *//

//get route to retrieve courses: /api/courses
app.get('/api/courses', async (req, res) => {
  let courses = await Course.findAll();
  //console.log(courses);
  res.json({
    courses
  });
  res.status(200).end();
})

//get route to retrieve a specific course, based on the course id: /api/courses/:id
app.get('/api/courses/:id', async (req, res) => {
  let course = await Course.findByPk(req.params.id);
  if(course){
    let user = await User.findByPk(course.dataValues.userId);
    res.json({
      course, user
    });
    res.status(200).end();
  } else {
    res.status(404).end();
  }
})

//post route to create a new course, set the location header for the new course, returns no content: /api/courses 
app.post('/api/courses', authenticateUser, async (req, res) => {
  let course;
  let user = await req.currentUser; 
  //console.log(user[0].dataValues.id );
  //console.log(req.body.userId);
  if (user) {
    //if (user[0].dataValues.id === req.body.userId) {
      try {
        course = await Course.create(req.body);
        //console.log(req.body);
        res.location('/api/courses/' + course.id);
        res.status(201).end();
      } catch (error) {
        if(error.name === "SequelizeValidationError") {
          res.status(400).send(error);
        } else {
          throw error;
        }
      }
    // } else {
    //   res.status(401).end();
    // }
  } else {
    res.status(401).end();
  }
});

//put route to update a course: /api/courses/:id 
app.put('/api/courses/:id', authenticateUser, [ 
  body('title').isLength({min: 1}),
  body('description').isLength({min: 1}),
  body('userId').isLength({min: 1})], async (req, res) => {
  
  let course;
  let user = await req.currentUser; 

  const errors = validationResult(req);

  try {
    course = await Course.findByPk(req.params.id);
    //console.log(course.dataValues);
    if(course) {
      if(user) {
        //this snippet is taken from the express validator docs at https://express-validator.github.io/docs/
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
      }
        if (user[0].dataValues.id === course.dataValues.userId) {
            course = course.update(req.body);
            res.status(204).end();
        } else {
          res.status(401).end();
        } 
      } else {
        console.log('user not authenticated');
        res.status(401).end();
      }
    } else {
      res.status(404).end();
    }

  } catch (error) {
    if(error.name === "SequelizeValidationError") {
      res.status(400).send(error);
    } else {
      throw error;
    }
  }
  });

//delete route to delete a course: /api/courses/:id
app.delete('/api/courses/:id', authenticateUser, async (req, res) => {
  let course;
  let user = await req.currentUser; 
  try {
    course = await Course.findByPk(req.params.id);
    //console.log(course.dataValues);
    if(course) {
      if(user) {
        if (user[0].dataValues.id === course.dataValues.userId) {
          course = course.destroy(req.body);
          res.status(204).end();
        } else {
          res.status(401).end();
        } 
      } else {
        //res.status(404);
        console.log('user not authenticated');
        res.status(401).end();
    }} else {
      res.status(404).end();
    }

  } catch (error) {
    if(error.name === "SequelizeValidationError") {
      res.status(400).send(error);
    } else {
      throw error;
    }
  }
});

//* error handling, etc *//

// send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    message: 'Route Not Found',
  });
});

// setup a global error handler
app.use((err, req, res, next) => {
  if (enableGlobalErrorLogging) {
    console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
  }

  res.status(err.status || 500).json({
    message: err.message,
    error: {},
  });
});

// set our port
app.set('port', process.env.PORT || 5000);

// start listening on our port
const server = app.listen(app.get('port'), () => {
  console.log(`Express server is listening on port ${server.address().port}`);
});
