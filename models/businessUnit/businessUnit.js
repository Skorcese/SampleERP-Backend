const mongoose = require('mongoose')
const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi);

const BusinessUnit = mongoose.model(
    'BusinessUnit',
    new mongoose.Schema({
        bu_code: {
            type: String,
            minlength: 1,
            maxlength: 20,
            unique: true,
            required: true
        },
        bu_name: {
            type: String,
            minlength: 1,
            maxlength: 50,
            required: true
        },
        bu_type: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'BusinessUnit_Type',
            required: true
        },
        bu_country: {
            type: String,
            maxlength: 2,
            required: true
        },
        bu_address_street: {
            type: String,
            maxlength: 128
        },
        bu_address_city: {
            type: String,
            maxlength: 128
        },
        bu_address_postcode: {
            type: String,
            maxlength: 20
        },
        bu_archived: {
            type: Boolean,
            default: false
        }
    })
);

function validateBusinessUnit(businessUnit){
    const schema = {
        bu_type: Joi.objectId().required(),
        bu_code: Joi.string().min(1).max(20).required(),
        bu_name: Joi.string().min(1).max(50).required(),
        bu_country: Joi.string().max(2).required(),
        bu_address_street: Joi.string().max(128),
        bu_address_city: Joi.string().max(128),
        bu_address_postcode: Joi.string().max(20)
    };

    return Joi.validate(businessUnit, schema);
};

module.exports.validate = validateBusinessUnit;
module.exports.BusinessUnit = BusinessUnit;