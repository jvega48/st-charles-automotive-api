// import mongoose from 'mongoose';
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

export const VehicleSchema = new Schema(
  {
    make: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 15

    },
    model: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 15
    },
    trim: {
      type: String,
    },
    year: {
      type: Number,
      required: true,
      min: 1800,
      max: 9999
    },
    licensePlate: {
      type: String,
      unique: true,
      required: true,
      minlength: 5,
      maxlength: 8
    },
    vinNumber: {
      type: String,
      unique: true,
      required: true,
      minlength: 11,
      maxlength: 17
    },
    color: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 10,
    },
    miles: {
      type: Number,
      required: true,
      max: 200000,
    },
    created_date: {
      type: Date,
      default: Date.now,
    },
    maintenanceHistory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reservation",
      },
    ],
  },
  { versionKey: false }
);
