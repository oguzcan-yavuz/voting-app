'use strict';

const users = require('../models/users.js');
const dbController = require('./dbController');
const pollsController = require('./pollsController.js');

class UsersController {
    constructor(user) {
        this.user = user;
    }

    get getCurrentUser() {
        return this.user;
    }

    getOwnedPolls() {
        return Promise.all(this.user.ownedPolls.map(poll => pollsController.getPoll(poll)));
    }

    get getVotedPolls() {
        return this.user.votedPolls;
    }

    updateCurrentUser(updatedUser) {
        this.user = updatedUser;
    }

    updateOwnedPoll(poll, insert=true) {
        // push the created poll to the ownedPolls of this.user
        let query = { _id: this.user._id };
        let doc = (insert) ? { $push: { ownedPolls: poll } } : { $pull: { ownedPolls: poll } };
        let options = { new: true };
        return dbController.updateAndReturn(users, query, doc, options);
    }

    createPoll(title, options) {
        return pollsController.createPoll(title, options).then(poll => {
            return this.updateOwnedPoll(poll[0]).then(updatedUser => {
                this.updateCurrentUser(updatedUser);
                return poll[0];
            });
        });
    }

    isOwned(pollId) {
        let ownedPolls = this.user.ownedPolls;
        // this for loop pattern repeats itself
        for(let poll of ownedPolls) {
            if(poll.toString() === pollId)
                return true;
        }
        return false;
    }

    deleteOwnedPoll(pollId) {
        // check if the user really owns the given poll
        if(this.isOwned(pollId)) {
            return pollsController.deletePoll(pollId).then(() => {
                // update user's ownedPolls.
                return this.updateOwnedPoll(pollId, false).then(updatedUser => {
                    this.updateCurrentUser(updatedUser);
                    return updatedUser;
                })
            });
        } else {
            return Promise.reject("");
        }
    }

}

module.exports = UsersController;
