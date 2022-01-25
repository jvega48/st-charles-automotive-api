import mongoose from "mongoose";
import { UserSchema } from "../models/user";
const User = mongoose.model("User", UserSchema);

const jwt = require("jsonwebtoken");

export const signUp = async (req, res) => {
  let savedUser =  null;
  let searchUser = null;

  const { firstName, lastName, email, password, permissionLevel } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Please provide an email to sign up for the api", statusCode: 400 });
  }

  try {
    searchUser = await User.findOne({ email: email }).exec();
  } catch (error) {
    return res.status(409).json({ error: error, statusCode: 409 });
  }

  if (searchUser != null) {
    return  res.status(409).json({ error: "SignUp: User already present", statusCode: 409 });
  }

  const newUser = new User({
    firstName,
    lastName,
    permissionLevel,
    email,
    password: await User.encryptPassword(password),
  });

  try {
    savedUser = await newUser.save();
  } catch (error) {
    return res.status(400).json({ error: "SignUp: cant save user: " + error, statusCode: 400 });
  }


  const newToken = jwt.sign({ id: savedUser._id }, "secretKey", {
    expiresIn: 86400,
  });

  res.status(200).json({ data: {"authToken": newToken} });
};

export const logIn = async (req, res) => {
    const { email } = req.body;

    if(!email) {
        return res.status(404).json({ error: "Email not provided", statusCode: 404 });
    }

    let userExist = null;

    try {
      userExist = await User.findOne({ email: email });
    } catch (error) {
      return  res.status(400).json({ error: error, statusCode: 404 });
    }


    if (!userExist) {
       return  res.status(400).json({ error: "User does not exists", statusCode: 404 });
    }
    const matchPassword = await User.comparePassword(
        req.body.password,
        userExist.password
    );

    if (!matchPassword) {
       return  res.status(401).json({ error: "Invalid password", statusCode: 401 });
    }

    const token = jwt.sign({ id: userExist._id }, "secretKey", {
        expiresIn: 2400,
    });

     res.status(200).json({
        data: {
        _id: userExist._id,
        firstName: userExist.firstName,
        lastName: userExist.lastName,
        message: "Authentication Successful",
        token: token,
        },
        statusCode: 200,
    });
};
