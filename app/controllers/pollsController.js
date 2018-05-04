'use strict';

const polls = require('../models/polls.js');
const dbController = require('./dbController');

function getAllPolls() {
    return dbController.findAll(polls);
}

function createPoll(title, options) {
    let doc = {
        title: title,
        // converts options array which includes option names to => [{ name: optionName, count: 0 }]
        options: options.split("\n").map(option => {
            return { name: option, count: 0 };
        }),
        creationTime: new Date()
    };
    return dbController.insert(polls, doc);
}

function getPoll(pollId) {
    return dbController.findById(polls, pollId);
}

function deletePoll(pollId) {
    let query = { _id: pollId };
    return dbController.deleteOne(polls, query);
}

async function isVoted(person, pollId) {
    // let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;     // client's ip
    let poll = await getPoll(pollId);
    for(let votedPerson of poll.votedPeople) {
        if(person === votedPerson)
            return true;
    }
    return false;
}

module.exports = { getAllPolls, createPoll, getPoll, deletePoll, isVoted };
