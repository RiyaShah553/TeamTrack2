const asyncHandler = require('express-async-handler');
const Employee = require('../model/Employee');
const mongoose = require('mongoose');
const User = require('../model/User');
const { ObjectId } = mongoose.Types;
// ! create employee

const employeeController = {
    // ! create
    create: asyncHandler(async (req, res) => {
        const { name, date_of_birth, job_title, location, contact_no, department_name } = req.body;

        // validate
        if (!name || !date_of_birth || !job_title || !location || !contact_no) {
            throw new Error('Fields is Required');
        }
        // check if already exist
        const EmployeeExist = await Employee.findOne({
            name, date_of_birth, contact_no
        });
        if (EmployeeExist) {
            throw new Error('Employee Already Exist');
        }

        // Create the department and save into DB
        const employeeCreate = await Employee.create({
            user_id: req.user,
            name,
            date_of_birth,
            job_title,
            location,
            contact_no,
            department_name,
        });

        // Send response
        res.status(200).json(employeeCreate);
    }),
    // ! get 1 user
    list: asyncHandler(async (req, res) => {
        try {
            const userId = req.params.id;


            // Check if userId is present
            if (!userId) {
                return res.status(400).json({ message: "User ID is missing" });
            }

            // Validate userId format (if it's a MongoDB ObjectID, for example)
            if (!ObjectId.isValid(userId)) {
                return res.status(400).json({ message: "Invalid User ID format" });
            }

            // Find employee by ID
            const employeeDetails = await User.findById(userId);

            // Check if employee is found
            if (!employeeDetails) {
                return res.status(404).json({ message: "Employee not found" });
            }

            res.json(employeeDetails);
        } catch (error) {
            console.error("Server Error:", error.message);
            res.status(500).json({ message: "Server Error", error: error.message });
        }
    }),

    // ! get all employees
    lists: asyncHandler(async (req, res) => {
        const employeeList = await Employee.find({ employee: req.employee });
        res.json(employeeList);
    }),

    // ! update
    update: asyncHandler(async (req, res) => {
        try {
            const employeeId = req.params.id;
            const updates = req.body;

            // Ensure the employee ID is provided
            if (!employeeId) {
                return res.status(400).json({ message: 'Employee ID is required' });
            }

            // Find the employee by ID
            const employee = await Employee.findById(employeeId);

            // Check if employee exists
            if (!employee) {
                return res.status(404).json({ message: 'Employee not found' });
            }

            // Update fields only if they are provided
            if (updates.date_of_birth) employee.date_of_birth = updates.date_of_birth;
            if (updates.job_title) employee.job_title = updates.job_title;
            if (updates.location) employee.location = updates.location;
            if (updates.contact_no) employee.contact_no = updates.contact_no;
            if (updates.department_name) employee.department_name = updates.department_name.toLowerCase();

            // Save the updated employee
            const updatedEmployee = await employee.save();

            // Return the updated employee data
            res.json(updatedEmployee);
        } catch (error) {
            console.error('Error updating employee:', error);
            res.status(500).json({ message: 'Server error' });
        }
    }),
    // ! Delete
    delete: asyncHandler(async (req, res) => {
        const employeeId = req.params.id;
        const employee = await Employee.findByIdAndDelete(employeeId);
        res.json({ message: "Employee Deleted" });
    }),


    // ! get filter data by location 
    //ascending location
    filterLocation: asyncHandler(async (req, res) => {
        const { sort = 'ascending' } = req.query; // Default to 'ascending'

        try {
            const sortOrder = sort === 'ascending' ? 1 : -1; // 1 for ascending, -1 for descending
            const employees = await Employee.find().sort({ location: sortOrder });
            res.json(employees);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }),

    // ! get filter data by  name  
    //name
    filterName: asyncHandler(async (req, res) => {
        const { sort = 'ascending' } = req.query; // Default to 'ascending'
        const sortOrder = sort === 'ascending' ? 1 : -1; // 1 for ascending, -1 for descending

        try {
            const employees = await Employee.find().sort({ name: sortOrder });
            res.json(employees);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }),

};

module.exports = employeeController;
