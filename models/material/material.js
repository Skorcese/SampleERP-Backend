const mongoose = require('mongoose')
const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi);

const Material = mongoose.model(
    'Material',
    new mongoose.Schema({
        mat_code: {
            type: String,
            minlength: 1,
            maxlength: 20,
            unique: true,
            required: true
        },
        mat_name: {
            type: String,
            minlength: 1,
            maxlength: 50,
            required: true
        },
        mat_type: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Material_Type',
            required: true
        },
        mat_unit: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Material_Unit',
            required: true
        },
        mat_archived: {
            type: Boolean,
            default: false
        }
    })
);

function validateMaterial(material){
    const schema = {
        mat_type: Joi.objectId().required(),
        mat_code: Joi.string().min(1).max(20).required(),
        mat_name: Joi.string().min(1).max(50).required(),
        mat_unit: Joi.objectId().required()
    };

    return Joi.validate(material, schema);
};

module.exports.validate = validateMaterial;
module.exports.Material = Material;