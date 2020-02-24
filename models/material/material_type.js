const mongoose = require('mongoose');
const Joi = require('joi');

const Material_Type = mongoose.model(
    'Material_Type',
    new mongoose.Schema({
        mat_type_description: {
            type: String,
            minlength: 1,
            maxlength: 20,
            required: true,
            unique: true
        }
    })
);

function validateType(type){
    const schema = {
        mat_type_description: Joi.string().min(1).max(20).required()
    };

    return Joi.validate(type, schema);
};

module.exports.validate = validateType;
module.exports.Material_Type = Material_Type;