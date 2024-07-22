const asyncHandler = require('express-async-handler');
// const User = require('../model/Department');
const Department = require('../model/Department');
const Employee = require('../model/Employee');

// ! create department

const departmentController = {
    // ! create
    create: asyncHandler(async (req, res) => {
        const { department_name } = req.body;

        // validate
        if (!department_name) {
            throw new Error('Fields is Required');
        }
        // check if already exist
        const normalizeName = department_name.toLowerCase();

        // Check if department already exist on the user account
        const DepartmentExist = await Department.findOne({
            department_name: normalizeName,
            user_id: req.user,
        });
        if (DepartmentExist) {
            throw new Error(`Department ${DepartmentExist.department_name} Already Exist`);
        }

        // Create the department and save into DB
        const departmentCreate = await Department.create({
            user_id: req.user,
            department_name: department_name.toLowerCase(),
        });

        // Send response
        res.json({
            user_id: departmentCreate.user_id,
            department_name: departmentCreate.department_name,
        });
    }),

    // ! get all departments
    lists: asyncHandler(async (req, res) => {
        const departmentList = await Department.find({ user_id: req.user });
        res.json(departmentList);
    }),

    // ! update
    update: asyncHandler(async (req, res) => {
        const departmentId = req.params.id;
        const { department_name } = req.body;

        const normalizeName = department_name.toLowerCase();
        const department = await Department.findById(departmentId);
        if (!department && department.user_id.toString() !== req.user.toString()) {
            throw new Error('Department Not Found or User not Authorized');
        }
        const oldDepartmentName = department.department_name;

        //    update department properties
        department.department_name = normalizeName;

        // save into DB
        const updateDepartment = await department.save();

        // update affected employees
        if (oldDepartmentName !== updateDepartment.department_name) {
            await Employee.updateMany({
                user_id: req.user,
                department_name: oldDepartmentName,
            }, {
                $set: {
                    department_name: updateDepartment.department_name
                }
            });
        }
        res.json(updateDepartment);
    }),

    // ! Delete
    delete: asyncHandler(async (req, res) => {
        const departmentId = req.params.id;
        const department = await Department.findById(departmentId);
        if (department && department.user_id.toString() === req.user.toString()) {
            // update employees that have this department name
            const defaultDepartment = "Uncategorized";
            await Employee.updateMany({
                user_id: req.user,
                department_name: department.department_name
            },
                {
                    $set:
                    {
                        department_name: defaultDepartment
                    }
                }
            );

            // remove department
            await Department.findByIdAndDelete(departmentId);
            res.json({ message: "Department Removed and Employees Updated Successfully" });
        } else {
            throw new Error('Department Not Found or User not Authorized');
        }

    }),
};

module.exports = departmentController;
