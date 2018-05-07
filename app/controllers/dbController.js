'use strict';

async function deleteOne(model, query) {
    return model.deleteOne(query);
}

async function deleteAll(model) {
    return model.deleteMany({}, () => {});
}

async function findById(model, query) {
    return model.findById(query);
}

async function findAll(model) {
    return model.find();
}

async function insert(model, docs) {
    return model.insertMany(docs);
}

async function updateAndReturn(model, query, doc, options) {
    return model.findOneAndUpdate(query, doc, options);
}

module.exports = { deleteOne, deleteAll, findById, findAll, insert, updateAndReturn };
