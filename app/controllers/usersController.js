const users = require('../models/users.js');
const dbController = require('./dbController');

function getUsers() {
    return dbController.findAll(users);
}

module.exports = { getUsers };
