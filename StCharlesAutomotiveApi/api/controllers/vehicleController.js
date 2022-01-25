import mongoose from 'mongoose';
import { VehicleSchema } from '../models/vehicle';

const Vehicle = mongoose.model('Vehicle', VehicleSchema);

export const addNewVehicle = async (req, res) => {
    const {
      make,
      model,
      trim,
      year,
      licensePlate,
      vinNumber,
      color,
      miles,
      maintenanceHistory,
    } = req.body;

    let duplicateVehicle = null;
    let savedVehicle = null;

    try {
      duplicateVehicle = await Vehicle.findOne({ vinNumber: vinNumber }).exec();
    } catch (error) {
      return res.status(409).json({ error: error.keyValue, statusCode: 409 });
    }

    if (duplicateVehicle != null) {
      return res
        .status(409)
        .json({
          error: "Vehicle with vin number " + vinNumber + " has been created",
          statusCode: 409,
        });
    }

    try {
      duplicateVehicle = await Vehicle.findOne({ licensePlate: licensePlate }).exec();
    } catch (error) {
      return  res
        .status(409)
        .json({ error: error, statusCode: 409 });
    }

    if(duplicateVehicle != null){
       return res
        .status(409)
        .json({ error: "Vehicle with the same license plate " + licensePlate + " is present", statusCode: 409 });
    }

    const newVehicle = new Vehicle({
      make,
      model,
      trim,
      year,
      licensePlate,
      vinNumber,
      color,
      miles,
      maintenanceHistory,
    });

    try {
      savedVehicle = await newVehicle.save();
    } catch (error) {
       return res
        .status(404)
        .json({ error: error.errors, statusCode: 404 });
    }

     res.status(200).json({ data: savedVehicle, statusCode: 200 });

};

export const getAllVehicles = async (req, res) => {
    let allVehicles = null;

    try {
      allVehicles = await Vehicle.find().exec();
    } catch (error) {
      return res.status(400).json({ error: error.keyValue, statusCode: 400 });
    }

    res.status(200).json({ data: allVehicles, statusCode: 200 });
};

export const getVehicleById = async (req, res) => {
    const vehicleId = req.params.vehicleId;
    let vehicle = null;

    if (!vehicleId) {
      return res
        .status(400)
        .json({ error: "Please provide vehicle id", statusCode: 404 });
    }

    try {
      vehicle = await Vehicle.findById({ _id: vehicleId }).exec();
    } catch (error) {
      return res.status(400).json({ error: error.message, statusCode: 400 });
    }

    res.status(200).json({ data: vehicle , statusCode: 200 });
};

export const getVehicleByVin = async (req, res) => {
    const vehicleVin = req.params.vin;
    let vehicle = null;

    if (!vehicleVin) {
       return res
        .status(400)
        .json({ error: "Please provide vehicle vin", statusCode: 404 });
    }

    try {
      vehicle = await Vehicle.findOne({ vinNumber: vehicleVin }).exec();
    } catch (error) {
       return res.status(400).json({ error: error, statusCode: 400 });
    }

    if (!vehicle) {
       return res
        .status(400)
        .json({ error: "No vehicle found with the vin number: " + vehicleVin, statusCode: 404 });
    }

     res.status(200).json({ data: vehicle, statusCode: 200 });

};

export const updateVehicle = async (req, res) => {
    const vehicleId = req.params.vehicleId;
    let vehicle = null;

    if (!vehicleId) {
      return res
        .status(400)
        .json({ error: "Please provide vehicle id", statusCode: 404 });
    }

    try {
      vehicle = await Vehicle.findOneAndUpdate({ _id: vehicleId }, req.body, {
        new: true,
      }).exec();
    } catch (error) {
      return res
        .status(400)
        .json({ error:  error.keyValue, statusCode: 400 });
    }

    res.status(200).json({ data: vehicle, statusCode: 200 });

};

export const deleteVehicle = async (req, res) => {
    const vehicleId = req.params.vehicleId
    let deleteVehicle = null;

    if(!vehicleId) {
         return res.status(400).json({ error: "Please provide vehicle id", statusCode: 404 });
    }

    try {
        deleteVehicle = await Vehicle.findByIdAndDelete({ _id: vehicleId }).exec();
    } catch (error) {
        return  res.status(404).json({ error: "Vehicle not found: " + vehicleId, statusCode: 404 });
    }

     res.status(200).json({data: "Vehicle delete successfully", statusCode: 200})

};
