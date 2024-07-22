const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const errorHandler = require('./middlewares/errorHandlerMiddleware')
const userRoutes = require('./routes/userRoutes')
const departmentRoutes = require('./routes/departmentRoutes')
const employeeRoutes = require('./routes/employeeRoutes')


const app = express();

//!Connect to mongodb
mongoose
    .connect("mongodb+srv://shahriya553:HPVeEkH9mSOMTh9o@cluster0.izavyio.mongodb.net/ipangram-mern?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("DB Connected"))
    .catch((e) => console.log(e));

// ! Cors config
const corsOptions = {
    origin: ["http://localhost:5173"],
};
app.use(cors(corsOptions));
// ! Middlewares
app.use(express.json()); //?Pass incoming json data

// ! Routes
app.use('/', userRoutes);
app.use('/', departmentRoutes);
app.use('/', employeeRoutes);


// ! Error handling middleware
app.use(errorHandler);


// ! Start the server
const PORT = process.env.PORT || 8090;
app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
})


// password HPVeEkH9mSOMTh9o
// username shahriya553