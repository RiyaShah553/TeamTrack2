//is user login or not
const jwt = require('jsonwebtoken');

const isAuthenticated = async (req, res, next) => {
    const headerObj = req.headers;
    const token = headerObj?.authorization.split(" ")[1];
    console.log(headerObj?.authorization.split(" "));
    //    verify token
    const verifyToken = jwt.verify(token, 'ipangramKey', (err, decoded) => {
        if (err) {
            return false;
        } else {
            return decoded;
        }
    });
    console.log(verifyToken);
    if (verifyToken) {
        // save user in request  obj
        req.user = verifyToken.id;
        next();
    } else {
        const err = new Error('Session expired');
        next(err);
    }
}

module.exports = isAuthenticated;