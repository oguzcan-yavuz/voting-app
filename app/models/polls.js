const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let polls = new Schema({
    title: String,
    options: [
        {
            name: String,
            count: Number
        }
    ]
});

module.exports = polls;
