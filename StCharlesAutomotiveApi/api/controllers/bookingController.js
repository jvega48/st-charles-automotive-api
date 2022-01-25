import mongoose from 'mongoose';
import { BookingSchema } from '../models/booking';
const Bookings = mongoose.model('Booking', BookingSchema)

export const addNewBookingSlots = async (req, res) => {
    const { date, timeSlots } = req.body;

    let currentSlots = [];
    let previousBooking = null;
    let saveBookings = null;

    try {
      previousBooking = await Bookings.findOne({ date: date , isBooked: false}).exec();
    } catch (error) {
      return res.status(409).json({
        error: "line 29" + error,
        statusCode: 409,
      });
    }

    if (previousBooking == null) {
      const newBookings = new Bookings({
        date,
        timeSlots,
      });

      try {
        saveBookings = await newBookings.save();
      } catch (error) {
        return res
          .status(409)
          .json({
            error: `37 Error adding new time slots to the existing dates, please check the time slots: ${error}`,
            statusCode: 409,
          });
      }

       return res.status(200).json({ data: saveBookings, statusCode: 200 });
    }

    for(const previousSlot of previousBooking.timeSlots){
      currentSlots.push(previousSlot)
    }


    for (const slot of timeSlots) {
      currentSlots.push(slot);
    }

    let objectId = previousBooking["_id"] + ''

    try {
      saveBookings = await Bookings.findOneAndUpdate({_id: objectId }, {"$set":{ "timeSlots": currentSlots }}, {new: false}).exec()
    } catch (error) {
       return res
        .status(409)
        .json({
          error: `68 Error adding new time slots to the existing dates, please check the time slots: ${error}`,
          statusCode: 409,
        });
    }

     res.status(200).json({ data: saveBookings, statusCode: 200 });

};

export const getAllBookings = async (req, res) => {
    let bookings = null;

    try {
      bookings = await Bookings.find({}).sort().exec();
    } catch (error) {
      return res.status(409).json({ error: error.keyValue, statusCode: 409 });
    }

     res.status(200).json({ data: bookings, statusCode: 200 });

};

export const deleteBookingById = async (req, res) => {
  const bookingId = req.params.bookingId;
  let bookings = null;

  try {
    bookings = await Bookings.findByIdAndDelete({ _id: bookingId }).exec();
  } catch (error) {
    return res.status(409).json({ error: error.keyValue, statusCode: 409 });
  }

   res.status(200).json({data: "Booking delete successfully", statusCode: 200})
}