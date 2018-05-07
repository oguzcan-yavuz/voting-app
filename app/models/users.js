'use strict';

const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let User = new Schema({
    twitter: {
        id: String,
        username: String,
        displayName: String
    },
    ownedPolls: [{ type: Schema.Types.ObjectId, ref: 'Polls' }],
    registrationTime: Date
});

module.exports = mongoose.model('Users', User);
