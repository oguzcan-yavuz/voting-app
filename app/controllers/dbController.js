'use strict';

async function deleteOne(model, query) {
    return model.deleteOne(query);
}

async function deleteAll(model) {
    return model.deleteMany({}, () => {});
}

async function findAll(model) {
    return model.find();
}

async function insert(model, docs) {
    return model.insertMany(docs);
}

async function findOne(model, query) {
    return model.findOne(query);
}

async function updateAndReturn(model, query, doc, options) {
    return model.findOneAndUpdate(query, doc, options);
}

async function update(query, doc) {
    return query.update(doc);
}

async function findById(model, query) {
    return model.findById(query);
}

module.exports = { deleteOne, findAll, deleteAll, insert, findOne, findById, update, updateAndReturn };
