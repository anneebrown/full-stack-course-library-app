# full-stack-course-library-app
 
This is an app designed to showcase all the courses at my fictional Awesome School. Users can sign up and sign in to create, edit and delete their own courses. 

The app is optimized to run on Google Chrome. 

To run it, follow these steps: 

Open your terminal or other command line tool, and navigate to the api folder. Run npm install, npm run seed, then npm start. 
Open another terminal window or another command line tool window and navigate to the client folder. Again, run npm install, then npm start. 

Visit http://localhost:3000 to see the app. 

FAQs:

What's in the header? 
The header consists of links to sign up and sign in or to sign out. "Courses" is a link back to the home page which lists all courses. 

How do I sign up? 
To sign up, please fill out all fields in the sign up form. 

Do you really need all that info to create a course? 
To create a new course, a title and description are required, the other fields are optional. 

How do I make changes to the courses I created? 
From the home page, click on your course to view it in detail. If you know your course's ID, you can also navigate to http://localhost:3000/courses/:id. You can then choose if you'd like to delete the course or edit it. When editing/updating the course, a title and description are required again. 

How do you handle password security? 
Passwords are encrypted using base64 encryption. There are no minimum requirements but I recommend using a unique password. 