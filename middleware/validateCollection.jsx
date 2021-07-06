const mongoose = require('mongoose');
const Joi = require('joi');

function validateCollection(collection) {
    const schema = Joi.object({
        name: Joi.string().min(2).max(50).required(),
        cards: Joi.string().required(),
    });

    return schema.validate(card);
}

exports.validateCollection = validateCollection;