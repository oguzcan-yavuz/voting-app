'use strict';

const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let polls = new Schema({
    title: String,
    options: [
        {
            name: String,
            count: Number
        }
    ],
    votedPeople: [],
    creationTime: Date
});

module.exports = mongoose.model('Polls', polls);
