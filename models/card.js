const mongoose = require('mongoose');
const Joi = require('joi');

const cardSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: true, minLength:2, maxLength:255},
});

const Card = mongoose.model('Card',cardSchema);

function validateCard(card) {
    const schema = Joi.object({
        name: Joi.string().min(2).max(50).required(),
        description: Joi.string().required(),
    });

    return schema.validate(card);
}


exports.Card = Card;
exports.validate = validateCard;
exports.cardSchema = cardSchema;