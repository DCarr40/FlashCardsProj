const mongoose = require('mongoose');
const Joi = require('joi');


function validateCard(card) {
    const schema = Joi.object({
        name: Joi.string().min(2).max(50).required(),
        description: Joi.string().required(),
    });

    return schema.validate(card);
}

exports.validate = validateCard;

