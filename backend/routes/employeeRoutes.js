const express = require('express');
const employeeController = require('../controller/employeeCtrl');
const isAuthenticated = require('../middlewares/isAuth');
const isManager = require('../middlewares/isManager')
const isEmployee = require('../middlewares/isEmployee')



const employeeRouter = express.Router();

// ! for create
employeeRouter.post('/api/v1/employee/create', isAuthenticated, isEmployee, employeeController.create);

// ! for get 1 employee
employeeRouter.get('/api/v1/employee/list/:id', isAuthenticated, isEmployee, employeeController.list);


// ! for get all
employeeRouter.get('/api/v1/employee/lists', isAuthenticated, employeeController.lists);

// ! for update
employeeRouter.put('/api/v1/employee/update/:id', isAuthenticated, isManager, employeeController.update);

// ! for delete
employeeRouter.delete('/api/v1/employee/delete/:id', isAuthenticated, isManager, employeeController.delete);

// ! for get all employee by filter location
employeeRouter.get('/api/v1/employee/lists/filterLocation', isAuthenticated, employeeController.filterLocation);

// ! for get all employee by filterName
employeeRouter.get('/api/v1/employee/lists/filterName', isAuthenticated, employeeController.filterName);


module.exports = employeeRouter;