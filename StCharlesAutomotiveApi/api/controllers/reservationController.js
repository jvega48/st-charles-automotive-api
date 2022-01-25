import mongoose from "mongoose";
import { ReservationSchema } from "../models/reservation";
import { BookingSchema } from "../models/booking";
import { UserSchema } from "../models/user";
import { VehicleSchema } from "../models/vehicle";

const Vehicle = mongoose.model("Vehicle", VehicleSchema);
const Bookings = mongoose.model("Booking", BookingSchema);
const Reservation = mongoose.model("Reservation", ReservationSchema);
const User = mongoose.model("User", UserSchema);

export const addNewReservation = async (req, res) => {
    const {
      user,
      phoneNumber,
      email,
      bookingId,
      isComplete,
      timeSlotId,
      vehicleId,
      priority,
      notes,
      licensePlates,
      vinNumber,
      isBeingWorkedOn,
    } = req.body;

    let userLookUp = null;

    if (!user) {
      return res.status(400).json({
        error: "Please provide a user id for the reservation",
        statusCode: 400,
      });
    }

    try {
      userLookUp = await User.findOne({ _id: user }).exec();
    } catch (error) {
      return res
        .status(400)
        .json({ error: error, statusCode: 400 });
    }

    if(!userLookUp){
      return res.status(404).json({
        error: "No user matches our records",
        statusCode: 404,
      });
    }

    // if ( userLookUp.email !== email) {
    //   return res.status(400).json({
    //     error: "User email and input email don't match our records",
    //     statusCode: 400,
    //   });
    // }


    if (!bookingId) {
      return res.status(409).json({
        error: "No booking id provided cannot create booking",
        statusCode: 409,
      });
    }


    const newReservation = new Reservation({
      user,
      phoneNumber,
      email,
      bookingId,
      isComplete,
      vehicleId,
      timeSlotId,
      priority,
      isBeingWorkedOn,
      notes,
      licensePlates,
      vinNumber,
    });

    let bookings = null;

    try {
      bookings = await Bookings.findOne({ _id: bookingId })
        .sort("-timeSlots")
        .exec();
    } catch (error) {
       return res.status(400).json({ error: error, statusCode: 400 });
    }

    if(!bookings) {
      return res.status(400).json({ error: "there no booking available", statusCode: 400 });
    }

    let slots = bookings.timeSlots;

    let updatedSlots = [];
    let isTimePresent = false;
    for (const slot of slots) {
      let id = slot._id + ''
      if (id=== timeSlotId) {
        updatedSlots.push({
          _id: id,
          slot: slot.slot,
          isBooked: true,
          bookedBy: user,
        }),
        isTimePresent = true;
      } else {
        updatedSlots.push(slot);
      }
    }

    if (!isTimePresent) {
       return res.status(404).json({ error: "Cannot create the booking, because the time slot id requested is not present in the available slots.", statusCode: 404 });
    }

    bookings.timeSlots = updatedSlots;
    try {
      bookings = await bookings.save();
    } catch (error) {
      return res.status(409).json({ error: error, statusCode: 409 });
    }

    let saveBookings = null;

    try {
      saveBookings = await newReservation.save();
    } catch (error) {
      return res.status(409).json({ error: error, statusCode: 409 });
    }

     res.status(200).json({ data: saveBookings, statusCode: 200 });
};

export const getAllReservations = async (req, res) => {
  let reservations = null;

  try {
    reservations = await Reservation.find({})
      .populate("user")
      .populate("vehicleId")
      .populate("bookingId")
      .select("-password")
      .exec();
  } catch (error) {
    return res.status(404).json({ error: error.keyValue, statusCode: 404 });
  }

   res.status(200).json({ data: reservations, statusCode: 200 });
};

// working
export const getUserReservationsByUserId = async (req, res) => {
  const userId = req.params.userId;
  let reservation = null;

  if (!userId) {
    return res
      .status(400)
      .json({
        error: "Please provide user id for the reservation",
        statusCode: 400,
      });
  }

  try {
    reservation = await Reservation.findOne({ user: userId })
      .populate("user")
      .populate("vehicleId")
      .select("-password")
      .exec();
  } catch (error) {
    return res
      .status(404)
      .json({
        error: "Reservation not found: " + error.keyValue,
        statusCode: 404,
      });
  }

  res.status(200).json({ data: reservation, statusCode: 200 });
};
// working
export const getUserReservationsByReservationId = async (req, res) => {
  const reservationId = req.params.reservationId;
  let reservation = null;

  if (!reservationId) {
    return res
      .status(400)
      .json({
        error: "Please provide reservation id for the reservation",
        statusCode: 400,
      });
  }

  try {
    reservation = await Reservation.findOne({ _id: reservationId })
      .populate("user")
      .populate("vehicleId")
      .select("-password")
      .exec();
  } catch (error) {
    return res
      .status(404)
      .json({
        error: "Reservation not found: " + error.keyValue,
        statusCode: 404,
      });
  }

  res.status(200).json({ data: reservation, statusCode: 200 });
};

export const getUserReservationHistory = async (req, res) => {
  const reservationId = req.params.reservationId;
  const userId = req.params.userId;
  let reservationHistory = null;

  if (!reservationId || !userId) {
    return res.status(400).json({
      error: "Please provide reservation id and the user id",
      statusCode: 404,
    });
  }

  try {
    reservationHistory = await Reservation.find({
      _id: reservationId,
      user: userId,
    })
      .populate("user")
      .populate("vehicleId")
      .select("-password")
      .exec();
  } catch (error) {
    return res.status(404).json({
      error: "Can't get users history: " + error.keyValue,
      statusCode: 404,
    });
  }

  res.status(200).json({ data: reservationHistory, statusCode: 200 });
};

export const deleteUserReservationByReservationId = async (req, res) => {
  const reservationId = req.params.reservationId;
  let userReservation = null;

  if (!reservationId) {
    return res
      .status(400)
      .json({ error: "Please provide reservation id", statusCode: 404 });
  }

  try {
    userReservation = await Reservation.findByIdAndDelete({
      _id: reservationId,
    }).exec();
  } catch (error) {
    return res.status(404).json({
      error: "User reservation couldn't be delete: " + error.keyValue,
      statusCode: 404,
    });
  }

   res
    .status(200)
    .json({ data: "Reservation delete successfully", statusCode: 200 });
};

export const updateUserReservationByReservationId = async (req, res) => {
  const reservationId = req.params.reservationId;
  let updatedReservation = null;

  if (!reservationId) {
    return res
      .status(400)
      .json({ error: "Please provide user id", statusCode: 404 });
  }

  try {
    updatedReservation = await Reservation.findOneAndUpdate(
      { _id: reservationId },
      req.body,
      { new: true }
    )
      .populate("user")
      .populate("vehicleId")
      .select("-password")
      .exec();
  } catch (error) {
    return res.status(404).json({
      error: error,
      statusCode: 404,
    });
  }

   res.status(200).json({ data: updatedReservation, statusCode: 200 });
};

export const startReservationByReservationId = async (req, res) => {
  const reservationId = req.params.reservationId;
  let reservation = null;

  if (!reservationId) {
    return res
      .status(400)
      .json({ error: "Please provide reservation id", statusCode: 404 });
  }

  try {
    reservation = await Reservation.findOneAndUpdate(
      { _id: reservationId },
      { $set: { isComplete: false, isBeingWorkedOn: true } }, { new: true }
    )
      .populate("user")
      .populate("vehicleId")
      .select("-password")
      .exec();
  } catch (error) {
    return res
      .status(404)
      .json({ error: error, statusCode: 404 });
  }

  if (!reservation) {
    return res
      .status(404)
      .json({ error: "Unable to update start the reservation", statusCode: 404 });
  }

   res.status(200).json({ data: reservation, statusCode: 200 });
};

export const completeReservationByReservationId = async (req, res) => {
  const reservationId = req.params.reservationId;
  let reservation = null;

  if (!reservationId) {
    return res
      .status(400)
      .json({ error: "Please provide reservation id", statusCode: 404 });
  }

  try {
    reservation = await Reservation.findOneAndUpdate(
      { _id: reservationId },
      { $set: { isComplete: true, isBeingWorkedOn: false } }
    )
      .populate("user")
      .populate("vehicleId")
      .select("-password")
      .exec();
  } catch (error) {
    return res.status(400).json({
      error: "Unable to update the reservation to complete: " + error,
      statusCode: 400,
    });
  }

  const vehicleId = reservation.vehicleId;
  let vehicle = null;
  
  try {
    vehicle = await Vehicle.findOneAndUpdate(
      { _id: vehicleId },
      { $set: { maintenanceHistory: reservationId } } , { new: true}
    ).exec();
  } catch (error) {
    return res.status(400).json({
      error: "Unable to update the reservation: " + error,
      statusCode: 400,
    });
  }

   res.status(200).json({ data: reservation, statusCode: 200 });
};
