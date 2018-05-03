'use strict';


async function deleteAll(model) {
    model.deleteMany({}, () => {});
}

async function findAll(model) {
    return model.find().select('-_id');
}

async function insert(model, docs) {
    return model.insertMany(docs);
}

module.exports = { findAll, deleteAll, insert };
