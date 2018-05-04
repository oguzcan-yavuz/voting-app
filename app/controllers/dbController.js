'use strict';


async function deleteAll(model) {
    model.deleteMany({}, () => {});
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

async function findOneAndUpdate(model, query, doc) {

}

async function update(query, doc) {
    return query.update(doc);
}

async function findById(model, query) {
    return model.findById(query);
}

module.exports = { findAll, deleteAll, insert, findOne, findOneAndUpdate, findById, update };
