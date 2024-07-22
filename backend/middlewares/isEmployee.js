const User = require("../model/User");


const isEmployee = async (req, res, next) => {
    const userId = req.user;
    console.log(userId);
    const userFound = await User.findById(userId);
    if (userFound) {
        console.log(userFound);
        const role = userFound.role;
        if (role === 'employee') {
            next();
        }
        else {
            res.status(401).send("You are not authorized to access this resource");
        }
    }
    else {
        res.status(401).send("You are not authorized to access this resource");
    }

}


module.exports = isEmployee;