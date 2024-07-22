const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../model/User')

// ! user registration

const usersController = {
    // ! Register
    register: asyncHandler(async (req, res) => {
        const { username, email, password, role } = req.body;

        // validate
        if (!username || !email || !password || !role) {
            throw new Error('All Fields are Required');
        }
        // check if already exist
        const UserExist = await User.findOne({
            email
        });
        if (UserExist) {
            throw new Error('User Already Exist');
        }

        // Hash user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create the user and save into DB
        const userCreated = await User.create({
            username,
            email,
            password: hashedPassword,
            role,
        });

        // Send response
        res.json({
            username: userCreated.username,
            email: userCreated.email,
            id: userCreated._id,
            role: userCreated.role

        });
    }),


    // ! login
    login: asyncHandler(async (req, res) => {
        const { email, password } = req.body;
        // check if email is correct
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('Invalid Email or Password');
        }

        // compare user password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Invalid Email or Password');
        }

        //verification complete
        // Generate token
        const token = jwt.sign({ id: user._id }, 'ipangramKey', {
            expiresIn: '30d',
        });

        // send response
        res.json({
            message: 'Login successful',
            token,
            id: user._id,
            email: user.email,
            username: user.username,
            role: user.role
        });

    })
};

module.exports = usersController;
