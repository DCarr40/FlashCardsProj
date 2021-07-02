const mongoose = require('mongoose');
const Joi = require('joi');

const collectionSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: true, minLength:2, maxLength:255},
});

const Collection = mongoose.model('Collection',collectionSchema);