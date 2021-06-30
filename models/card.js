const mongoose = require('mongoose');
const Joi = require('joi');

const cardSchema = new mongoose.Schema({

    name: {type: String, required: true, minLength:2, maxLength:255},
    description: {type: String, required: true},
    category: {type: String, required: true, minLength:5, maxLength:50},
    price: {type: Number, required: true},
    dateModified: {type: Date, default: Date.now},

});

const Card = mongoose.model('Card',cardSchema);

function validateCard(card) {
    const schema = Joi.object({
        name: Joi.string().min(2).max(50).required(),
        description: Joi.string().required(),
        category: Joi.string().min(5).max(50).required(),
        price: Joi.number().required(),
    });

    return schema.validate(card);
}


exports.Card = Card;
exports.validate = validateCard;
exports.cardSchema = cardSchema;