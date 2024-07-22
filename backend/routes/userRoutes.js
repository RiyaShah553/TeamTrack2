const express = require('express');
const usersController = require('../controller/usersCtrl');


const userRouter = express.Router();

// ! for Registration
userRouter.post('/api/v1/users/register', usersController.register);

// ! for Login
userRouter.post('/api/v1/users/login', usersController.login);


module.exports = userRouter;