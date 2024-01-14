import bcrypt from "bcrypt";
import { userModel } from "../../../database/models/user.model.js";
import jwt from "jsonwebtoken";

//*------------
//*1--signUp
//*------------
const signUp = async (req, res, next) => {
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

  //*token
  const token = jwt.sign(
    { _id: newUser._id, userName: newUser.userName, email: newUser.email },
    process.env.TOKEN_SECRET
  );
  // const token = jwt.sign(newUser , '__Ecomm')

  //*confirm mail
  //   const link = `${req.headers}://${req.host}.com/user/confirm/${token}`
  //   sendConfirmationEmail(email , 'Email confimation mail' ,
  //  `<a href=${link}>Click here to confirm mail</a>`
  //    )

  await newUser.save();

  res.status(201).json({ message: "success", newUser, token });
};

//*------------
//*2--logIn
//*------------
const logIn = async (req, res, next) => {
  const { email, password } = req.body;

  const isEmailExist = await userModel.findOne({ email });
  if (!isEmailExist) {
    return res.status(404).json({ message: "Email not found please sign up" });
  }
  // const isEmailConfirmed = await userModel.findOne({email});
  // if (!isEmailConfirmed) {
  //   return res.status(404).json({ message: "Email not found please sign up" })
  // }
  const user = await userModel.findOne({ email });

  if (!user) {
    res.status(404).json({ message: "Invalid login credentials" });
  }
  const passwordMatch = bcrypt.compareSync(password, user.password);
  if (!passwordMatch) {
    return res.status(400).json({ message: "Invalid login credentials" });
  }
  const token = jwt.sign(
    { _id: user._id, userName: user.userName, email },
    process.env.TOKEN_SECRET
  );

  // const decodedPassword = bcrypt.compareSync(password  , 8)

  res.status(201).json({ message: "success", user, token });
};
//*------------
//*3--update user
//*------------
const updateUser = async (req, res, next) => {
  const { _id } = req.params;
  const { userName, email, age, phoneNumber, address, gender } = req.body;

  const user = await userModel.findByIdAndUpdate(
    _id,
    { userName, email, age, phoneNumber, address, gender },
    { new: true }
  );

  if (!user) {
    return res.status(404).json({ message: "user not found" });
  }

  return res.status(201).json({ message: "user updated successfully", user });
};

//*------------
//*4--delete user
//*------------
const deleteUser = async (req, res, next) => {
  const { _id } = req.params;

  const user = await userModel.findByIdAndDelete(_id);
  if (!user) {
    return res.status(404).json({ message: "user not found" });
  }

  user.isDeleted = true;
  return res.status(201).json({ message: "user deleted successfully" });
};

//*------------
//*5--forget Password
//*------------
const forgetPassword = async (req, res, next) => {
  const { _id } = req.params;

  const user = await userModel.findByIdAndDelete(_id);
  if (!user) {
    return res.status(404).json({ message: "user not found" });
  }

  return res.status(201).json({ message: "user deleted successfully" });
};

// auth middleware
const handleAuth = async (req, res, next) => {
  const token = req?.headers?.authorization?.split(" ")[1];

  try {
    if (!token) {
      return res.status(403).json({ message: "please sign up" });
    }

    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);

    if (!decodedToken || !decodedToken._id) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const isUserExist = await userModel.findById(decodedToken._id);
    if (!isUserExist) {
      return res.status(404).json({ message: "Invalid login credentials" });
    }
    req.user = decodedToken;
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }

  next();
};

export { signUp, logIn, updateUser, deleteUser, forgetPassword, handleAuth };
/*
1-sign up
token
confirm acc
auth
login
forget password
soft delete

*/

// userName
// email
// password
// age
// phoneNumber:
// address
// gender
//*-----------
// public_id
// secure_url
// status:
// token
// forgetCode
// role
