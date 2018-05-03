const polls = require('../models/polls.js');
const dbController = require('./dbController');

function getPolls() {
    return dbController.findAll(polls);
}

function createPoll(title, options) {
    // polls.insertMany({title: "second poll", options: [{name: "option 1", count: 3}, {name: "option 2", count: 2}], creationTime: new Date()});
    let doc = {
        title: title,
        options: {}
    };
    return dbController.insert(doc);
}

module.exports = { getPolls, createPoll };
