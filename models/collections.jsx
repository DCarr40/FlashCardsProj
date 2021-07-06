const mongoose = require('mongoose');
const Joi = require('joi');
const { cardSchema } = require('./card');

const collectionSchema = new mongoose.Schema({
    name: {type: String, required: true},
    cards: { type :[cardSchema], default: []},
});

const Collection = mongoose.model('Collection',collectionSchema);



exports.Collection = Collection;
exports.collectionSchema = collectionSchema;

