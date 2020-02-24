const mongoose = require('mongoose')
const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi);

const BusinessUnit_Type = mongoose.model(
    'BusinessUnit_Type',
    new mongoose.Schema({
        bu_type_id: {
            type: Number,
            required: true
        },
        bu_type_description: {
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
        bu_type_id: Joi.number().required(),
        bu_type_description: Joi.string().min(1).max(20).required().unique()
    };

    return Joi.validate(type, schema);
};

module.exports.BusinessUnit_Type = BusinessUnit_Type;
module.exports.validate = validateType;