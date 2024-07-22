const express = require('express');
const departmentController = require('../controller/departmentCtrl');
const isAuthenticated = require('../middlewares/isAuth');
const isManager = require('../middlewares/isManager')


const departmentRouter = express.Router();

// ! for create
departmentRouter.post('/api/v1/department/create', isAuthenticated, isManager, departmentController.create);

// ! for get all
departmentRouter.get('/api/v1/department/lists', isAuthenticated, isManager, departmentController.lists);

// ! for update
departmentRouter.put('/api/v1/department/update/:id', isAuthenticated, isManager, departmentController.update);

// ! for delete
departmentRouter.delete('/api/v1/department/delete/:id', isAuthenticated, isManager, departmentController.delete);


module.exports = departmentRouter;