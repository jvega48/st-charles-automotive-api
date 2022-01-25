import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const BookingSchema = new Schema(
  {
    date: {
      type: Date,
      required: true,
      unique: true
    },
    timeSlots: [
      {
        bookedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        slot: {
          type: Date,
          required: true,
          unique: true,
        },
        isBooked: {
          type: Boolean,
          default: false,
          required: true,
        },
      },
    ],
  },
  { versionKey: false }
);