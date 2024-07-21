Employee Management System

Overview
This project is an Employee Management System designed to streamline the management of employees and departments within an organization. The system features user authentication, role-based access, employee and department management, and filtering capabilities. The system has been built with a focus on both frontend and backend integration, providing a seamless user experience for both employees and managers.

Features

Frontend

1. Signup/Login Page
   Users can sign up and log in as either employees or managers.

2. Department Management
   Managers can create, update, and delete departments.

3. Employee List
   A page displaying a list of all employees.

4. Employee Details
   A page or modal to show detailed information about each employee. This is accessible by managers.

5. Employee Filtering
   A filter button to sort employees by location and name in ascending and descending order. This is achieved using API endpoints, not client-side JavaScript.

6. Department Assignment
   Managers can assign departments to employees.

Backend

1. Authentication
   Routes for user login and signup.

2. Department Management
   Routes to create, read, update, and delete departments, restricted to managers.

3. Employee Management
   Routes to create, read, update, and delete employees. Update and delete operations are restricted to managers.

4. Employee Filtering
   Two API endpoints to filter employees:

Endpoint to get employees sorted by location in ascending order.

Endpoint to get employees sorted by name in ascending and descending order based on the selected filter.

API Endpoints

1. Authentication

POST http://localhost:8090/api/v1/users/register = registeration
POST http://localhost:8090/api/v1/users/login = login

2. Departments

POST http://localhost:8090/api/v1/department/create = create department
GET http://localhost:8090/api/v1/department/lists = get all department
PUT http://localhost:8090/api/v1/department/update/:id = update department
DELETE http://localhost:8090/api/v1/department/delete/:id = delete department

3. Employee

POST http://localhost:8090/api/v1/employee/create = create employee
GET http://localhost:8090/api/v1/employee/lists = get all employees
GET http://localhost:8090/api/v1/employee/list/:id = get 1 employee
PUT http://localhost:8090/api/v1/employee/update/:id = update employee
DELETE http://localhost:8090/api/v1/employee/delete/:id = delete employee
GET http://localhost:8090/api/v1/employee/lists/filterLocation = filter employee by location
GET http://localhost:8090/api/v1/employee/lists/filterName = filter employee by name

Languages Used

1. frontend
   vite
   react.js
   redux
   react-query
   tailwind css

2. backend
   node.js
   express.js
   mongoose

3. Other libaries
   bcryptjs
   jsonwebtoken
   cors
   experess-async-handler
   formik
   yup
   axios
   react-icon
   chart.js
   react-router-dom
   @headlessui/react
   @heroicons/react


commands to run
frontend = npm run dev
backend = node --watch app
