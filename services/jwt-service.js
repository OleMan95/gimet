const jwt = require('jsonwebtoken');
const JWT_SECRET = require('../config').jwt.secret;

module.exports = {
    async genToken(data){
        return await jwt.sign(data, JWT_SECRET);
    },

    async verify(token){
        return await jwt.verify(token, JWT_SECRET);
    },
};