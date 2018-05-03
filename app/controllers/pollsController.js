const polls = require('../models/polls.js');
const dbController = require('./dbController');

function getPolls() {
    return dbController.findAll(polls);
}

function createPoll(title, options) {
    // await polls.insertMany({title: "first poll", options: [{name: "option 1", count: 0}, {name: "option 2", count: 5}], creationTime: new Date()});
    let doc = {
        title: title,
        options: {}
    };
    return dbController.insert(doc);
}

module.exports = { getPolls, createPoll };
