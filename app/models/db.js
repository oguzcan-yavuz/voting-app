'use strict';

const mongoose = require('mongoose');

function connectDB() {
    // connect and return the connection as a promise
    const uri = process.env.MONGO_URI;
    const options = {};
    mongoose.Promise = global.Promise;
    mongoose.connect(uri, options);
}

module.exports = { connectDB };
