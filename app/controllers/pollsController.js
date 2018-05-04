'use strict';

const polls = require('../models/polls.js');
const dbController = require('./dbController');

function getPolls() {
    return dbController.findAll(polls);
}

function createPoll(title, options) {
    let doc = {
        title: title,
        // converts options array which includes option names to => [{ name: optionName, count: 0 }]
        options: options.map(option => {
            return { name: option, count: 0 };
        }),
        creationTime: new Date()
    };
    return dbController.insert(polls, doc);
}

function getPoll(pollID) {
    return dbController.findById(polls, pollID);
}

module.exports = { getPolls, createPoll, getPoll };
