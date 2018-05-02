const mongoose = require('mongoose');
let Schema = mongoose.Schema;
let polls = require('./polls');

let User = new Schema({
    github: {
        id: String,
        displayName: String,
        username: String,
    },
    ownedPolls: [{ type: Schema.Types.ObjectId, ref: 'Polls' }],
    votedPolls: [{ type: Schema.Types.ObjectId, ref: 'Polls' }]
});

mongoose.model('Polls', polls);
module.exports = mongoose.model('Users', User);
