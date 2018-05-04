'use strict';

const users = require('../models/users.js');
const dbController = require('./dbController');
const pollsController = require('./pollsController.js');

class UsersController {
    constructor(user) {
        // just check if username values in github object matches, ignore others
        // let query = { 'github.username': username };
        // this.user = dbController.findOne(users, query);
        this.user = user;
    }

    get getCurrentUser() {
        return this.user;
    }

    get getAllUsers() {
        return dbController.findAll(users);
    }

    get getOwnedPolls() {
        return this.user.ownedPolls;
    }

    isVoted(poll) {
        let ownedPolls = this.getOwnedPolls;
        return (ownedPolls.filter(ownedPoll => ownedPoll._id === poll._id)).length === 1;
    }

    updateOwnedPolls(poll) {
        // push the created poll to the ownedPolls of this.user
        let doc = { $push: { ownedPolls: poll } };
        return dbController.update(this.user, doc);
    }

    createPoll(title, ...options) {
        return pollsController.createPoll(title, options).then(poll => {
            return this.updateOwnedPolls(poll[0]).then(() => {
                return poll[0];
            });
        });
    }

}

module.exports = UsersController;
