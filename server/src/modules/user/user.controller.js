import bcrypt from "bcrypt";
import { userModel } from "../../../database/models/user.model.js";
import jwt from "jsonwebtoken";

//*------------
//*1--addUser
//*------------
const addUser = async (req, res, next) => {
  const { userName, email, password, age, phoneNumber, address, gender } =
    req.body;

  const isEmailExist = await userModel.findOne({ email });
  if (isEmailExist) {
    return res.status(404).json({ message: "Email already exist" });
  }
  const newUser = new userModel({
    userName,
    email,
    password,
    age,
    phoneNumber,
    address,
    gender,
  });
  await newUser.save();
  res.status(201).json({ message: "success", newUser });
};

//*------------
//*2--update user
//*------------
const updateUser = async (req, res, next) => {
  const { _id } = req.params;
  const user = await userModel.findByIdAndUpdate(_id, { new: true });

  if (!user) {
    return res.status(404).json({ message: "user not found" });
  }
  res.status(201).json({ message: "user updated successfully", user });
};

//*------------
//*3--delete user
//*------------
const deleteAccount = async (req, res, next) => {
  const { _id } = req.params;

  const user = await userModel.findByIdAndDelete(_id);
  if (!user) {
    return res.status(404).json({ message: "Account not found" });
  }

  user.isDeleted = true;
  return res.status(201).json({ message: "Account deleted successfully" });
};

//*------------
//*3--get all users
//*------------
const getAllUsers = async (req, res, next) => {
  const { _id } = req.params;

  const allUsers = await userModel.find();
  return res.status(201).json({ message: "success", allUsers });
};

export { addUser, updateUser, deleteAccount, getAllUsers };
