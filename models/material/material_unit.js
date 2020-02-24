const mongoose = require('mongoose');
const Joi = require('joi');

const Material_Unit = mongoose.model(
    'Material_Unit',
    new mongoose.Schema({
        mat_unit_code: {
            type: String,
            minlength: 1,
            maxlength: 4,
            required: true,
            unique: true
        },
        mat_unit_name: {
            type: String,
            minlength: 1,
            maxlength: 50,
            required: true
        }
    })
)

function validateUnit(unit){
    const schema = {
        mat_unit_code: Joi.string().min(1).max(4).required(),
        mat_unit_name: Joi.string().min(1).max(50).required()
    }
    
    return Joi.validate(unit, schema);
}

module.exports.validate = validateUnit;
module.exports.Material_Unit = Material_Unit;