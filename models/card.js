const mongoose = require('mongoose');
const Joi = require('joi');

const cardSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: true, minLength:2, maxLength:255},
});

const Card = mongoose.model('Card',cardSchema);

exports.Card = Card;
exports.cardSchema = cardSchema;