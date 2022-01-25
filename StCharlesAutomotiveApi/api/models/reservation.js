// import mongoose from 'mongoose';
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

export const ReservationSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      unique: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      minlength: 12,
      maxlength: 18,
    },
    email: {
      type: String,
      maxlength: 50,
    },
    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      unique: true
    },
    isComplete: {
      type: Boolean,
      default: false,
      required: true,
    },
    timeSlotId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    isBeingWorkedOn: {
      type: Boolean,
      default: false,
      required: true,
    },
    reservationModified: {
      type: Date,
      default: new Date(),
    },
    vehicleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
    },
    priority: {
      type: String,
      default: "low",
      minlength: 3,
      maxlength: 6,
      enum: ["low", "medium", "high"],
    },
    notes: {
      type: String,
      maxlength: 300,
    },
    licensePlate: {
      type: String,
      unique: true,
      required: false,
      minlength: 5,
      maxlength: 8,
    },
    vinNumber: {
      type: String,
      unique: true,
      required: false,
      minlength: 11,
      maxlength: 17,
    }
  },
  { versionKey: false }
);
