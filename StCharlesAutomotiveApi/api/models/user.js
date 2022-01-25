// import mongoose from 'mongoose';
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

export const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      maxlength: 20,
      minlength: 1,
    },
    lastName: {
      type: String,
      maxlength: 20,
      minlength: 1,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      maxlength: 40,
      validate: [validateEmail, 'Please fill a valid email address'],
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    address: {
      type: String,
      maxlength: 60,
    },
    phoneNumber: {
      type: String,
      minlength: 12,
      maxlength: 18,
      validate: [validatePhonenumber, 'Please fill a valid phone number'],
      match: /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/
    },
    password: {
      type: String,
      required: true,
      minlength: 8
    },
  },
  { versionKey: false }
);

UserSchema.statics.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};


UserSchema.statics.comparePassword = async (password, receivedPassword) => {
  return await bcrypt.compare(password, receivedPassword);
};

function validateEmail(email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email)
};

function validatePhonenumber(phoneNumber) {
  var re = /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/
  return re.test(phoneNumber)
};
