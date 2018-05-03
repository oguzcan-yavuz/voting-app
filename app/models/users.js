const mongoose = require('mongoose');
let Schema = mongoose.Schema;
require('./polls');     // create Polls Schema at start so we can Ref it in Users Schema

let User = new Schema({
    github: {
        id: String,
        displayName: String,
        username: String,
    },
    ownedPolls: [{ type: Schema.Types.ObjectId, ref: 'Polls' }],
    votedPolls: [{ type: Schema.Types.ObjectId, ref: 'Polls' }],
    registrationTime: Date
});

module.exports = mongoose.model('Users', User);
