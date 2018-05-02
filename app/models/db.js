'use strict';

const mongoose = require('mongoose');
let connection;

function createConnection() {
    // connect and return the connection as a promise
    const uri = process.env.MONGO_URI;
    const options = {};
    mongoose.Promise = global.Promise;
    mongoose.connect(uri, options).then(() => {
        connection = mongoose.connection;
    });
}

module.exports = { connection, createConnection };
