'use strict';

const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let User = new Schema({
    github: {
        id: String,
        displayName: String,
        username: String,
    },
    ownedPolls: [{ type: Schema.Types.ObjectId, ref: 'Polls' }],
    registrationTime: Date
});

module.exports = mongoose.model('Users', User);
