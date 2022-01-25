import mongoose from 'mongoose';
import { UserSchema } from '../models/user';
const User = mongoose.model('User', UserSchema)

export const addNewUser = async (req, res) => {
    let savedUser = null;
    let duplicateUser = null;
    const { firstName, lastName, email, address, phoneNumber, password } =
      req.body;

    try {
      duplicateUser = await User.findOne({ email: email }).exec()
    } catch (error) {
      return res.status(400).json({
        error: error.keyValue,
        statusCode: 400,
      });
    }

    if (duplicateUser != null) {
      return res
        .status(409)
        .json({ error: "User already present", statusCode: 409 });
    }

    let newUser = new User({
      firstName,
      lastName,
      address,
      phoneNumber,
      email,
      password: await User.encryptPassword(password),
    });

    try {
      savedUser = await newUser.save();
    } catch (error) {
       return res
        .status(400)
        .json({
          error: error,
          statusCode: 400,
        });
    }

     res.status(200).json({data: savedUser, statusCode: 200})

};

export const getUserById = async (req, res) => {
    const userId = req.params.userId;
    let user = null;

    if (!userId || userId === "") {
       return res
        .status(400)
        .json({ error: "Please provide user id", statusCode: 404 });
    }

    try {
      user = await User.findOne({ _id: userId }).select("-password").exec();
    } catch (error) {
      return res
        .status(404)
        .json({ error: "User not found: " + userId, statusCode: 404 });
    }

     res.status(200).json({ data: user, statusCode: 200 });
};

export const getUserByEmail = async (req, res) => {
    const userEmail = req.params.email;

    let user = null;

    if (!userEmail) {
       return res
        .status(400)
        .json({ error: "Please provide email", statusCode: 404 });
    }

    try {
      user = await User.findOne({ email: userEmail })
        .select("-password")
        .exec();
    } catch (error) {
      return  res
        .status(500)
        .json({
          error: error.keyValue,
          statusCode: 500,
        });
    }

    if(!user){
      return res
        .status(404)
        .json({
          error: "User was not found with email: " + userEmail,
          statusCode: 404,
        });
    }

     res.status(200).json({ data: user, statusCode: 200 });

};

export const getAllUsers = async (req, res) => {
    let user = null;

    try {
      user = await User.find({}).select("-password").exec();
    } catch (error) {
       return res
        .status(400)
        .json({ error: error.keyValue, user, statusCode: 400 });
    }

     res.status(200).json({ data: user, statusCode: 200 });
};

export const updateUser = async (req, res) => {
    const userId = req.params.userId;
    let user = null;

    if (!userId) {
       return res
        .status(400)
        .json({ error: "Please provide user id", statusCode: 404 });
    }

    try {
      user = await User.findOneAndUpdate({ _id: userId }, req.body , {new: true}).select(
        "-password"
      ).exec();
    } catch (error) {
       return res
        .status(404)
        .json({ error: "Unable to update user: ", error, statusCode: 404 });
    }

     res.status(200).json({ data: user, statusCode: 200 });

};

export const deleteUser = async (req, res) => {
    const userId = req.params.userId;

    let user = null;
    if (!userId) {
       return res
        .status(400)
        .json({ error: "Please provide user id", statusCode: 404 });
    }

    try {
      user = await User.findByIdAndDelete({ _id: userId }).exec();
    } catch (error) {
       return res
        .status(404)
        .json({
          error: "Unable to delete user: " + error,
          statusCode: 404,
        });
    }

     res
      .status(200)
      .json({ data: "User delete successfully", statusCode: 200 });

};
