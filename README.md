# Student Management Web Application

## Project Overview

This project is mainly used to handle the student data in an efficient way using React Js, Node Js, Express Js, Mysql.

## Table of Contents

1. [Project Structure](#project-structure)
2. [Dependencies](#dependencies)
3. [Installation](#installation)
4. [Usage](#usage)
5. [Components](#components)
6. [API Integration](#api-integration)
7. [Styling](#styling)
8. [Contributing](#contributing)

## 1. Project Structure <a name="project-structure"></a>

There are three directories in this project :

1. /components
2. /server
3. /public

The /components directory contains individual React components that make up the user interface of this application.
The /server directory contains server-side logic for this application. 
The /public directory is a place to store static assets like images, which can be accessed directly by the browser.
App.js: This is the main entry point of your React application. It likely renders and organizes the main structure of this application.

```
/src
  /components
    - AddStudentForm.js
    - DeleteModal.js
    - Login.js
    - StudentList.js
    - AddStudentForm.css
    - Login.css
    - DeleteModal.css
    - StudentList.css
- App.js
/server
    - index.js
/public
    - calender.png
```

## 2. Dependencies <a name="dependencies"></a>

Frontend Dependencies:

    "axios": "^1.6.2",
    "date-fns": "^3.0.6",
    "react": "^18.2.0",
    "react-datepicker": "^4.25.0",
    "react-dom": "^18.2.0",
    "react-icons": "^4.12.0",
    "react-router-dom": "^6.21.1",
    "react-scripts": "5.0.1",
    "web-vitals": "^2.1.4",
    "@fortawesome/fontawesome-free": "^6.5.1",
    "@fortawesome/free-solid-svg-icons": "^6.5.1",
    "@fortawesome/react-fontawesome": "^0.2.0",
    "@testing-library/jest-dom": "^5.17.0",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0"

Backend Dependencies:

    "body-parser": "^1.20.2",
    "cors": "^2.8.5",
    "express": "^4.18.2",
    "mysql": "^2.18.1"

## 3. Installation <a name="installation"></a>

# Clone the repository
git clone https://github.com/Muthubalasudhan7/Student_management_system

# Navigate to the project directory
cd student_management_system

# Install dependencies
npm install


## 4. Usage <a name="usage"></a>

# Run the development server
npm start

## 5. Components <a name="components"></a>

  AddStudentForm: Form for adding/editing student details.
  DatePicker: Component for date picking.
  DeleteModal: Modal for confirming student deletion.
  StudentList: Component displaying the list of students.

## 6. API Integration <a name="api-integration"></a>

Base URL: http://localhost:3001
Endpoints:
    GET /students: Retrieve the list of students.
    GET /students/:id: Retrieve details of a specific student.
    POST /students: Add a new student.
    PUT /students/:id: Update an existing student.
    DELETE /students/:id: Delete a student.

## 7. Styling <a name="styling"></a>

### Font Awesome Icons

This project utilizes Font Awesome for scalable vector icons. The following dependencies are used for incorporating Font Awesome icons into the project:

- `@fortawesome/fontawesome-free`: Version `^6.5.1`
  - The core Font Awesome package providing fundamental functionality.
  
- `@fortawesome/free-solid-svg-icons`: Version `^6.5.1`
  - Includes a set of free solid icons from Font Awesome, which are used for various graphical elements in the project.

- `@fortawesome/react-fontawesome`: Version `^0.2.0`
  - A React component for Font Awesome icons, facilitating the integration of icons into React components seamlessly.


## 8. Contributing <a name="Contributing"></a>

Feel free to customize the content, add more sections, or remove any sections that may not be relevant to your project.

