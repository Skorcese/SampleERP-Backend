const Joi = require('joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255
  },
  surname: { 
    type: String,  
    required: true,
    minlength: 3,
    maxlength: 255
  },
  email: { 
    type: String, 
    required: true,
    unique: true,
    min: 0,
    max: 255
  },
  password: { 
    type: String, 
    required: true,
    min: 5,
    max: 255
  }
});

userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign({_id:this._id}, config.get('jwtPrivateKey'));
   return token;
}

const User = mongoose.model('User', userSchema);

function validateUser(user) {
  const schema = {
    name: Joi.string().min(3).max(255).required(),
    surname: Joi.string().min(3).max(255).required(),
    email: Joi.string().min(0).max(255).required().email(),
    password: Joi.string().min(5).max(255).required()
  };

  return Joi.validate(user, schema);
}

exports.User = User; 
exports.validate = validateUser;