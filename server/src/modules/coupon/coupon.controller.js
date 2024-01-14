import { couponModel } from "./../../../database/models/coupon.model.js";

//*------------
//*1--add coupon
//*------------
const addcoupon = async (req, res, next) => {
  const { code, discount, expiresAt } = req.body;
  let expiresAtUTC = new Date(expiresAt).toUTCString();

  const isExist = await couponModel.findOne({ code });
  if (isExist) {
    return res.status(400).json({ message: "coupon already exist" });
  }

  const newcoupon = new couponModel({
    code,
    discount,
    expiresAt: expiresAtUTC,
  });
  await newcoupon.save();

  res.status(201).json({ message: "coupon add successfully", newcoupon });
};

//*------------
//*2--update coupon
//*------------
const updatecoupon = async (req, res, next) => {
  const { _id } = req.params;
  const { code, discount, expiresAt } = req.body;

  const coupon = await couponModel.findByIdAndUpdate(
    _id,
    { code, discount, expiresAt },
    { new: true }
  );
  if (!coupon) {
    return res.status(400).json({ message: "coupon not found" });
  }
  if (coupon) {
    return res
      .status(201)
      .json({ message: "coupon updated successfully", coupon });
  }
};

//*------------
//*3--delete coupon
//*------------
const deletecoupon = async (req, res, next) => {
  const { _id } = req.params;

  const coupon = await couponModel.findByIdAndDelete(_id);
  if (!coupon) {
    return res.status(400).json({ message: "coupon not found" });
  }
  res.status(201).json({ message: "coupon deleted successfully" });
};

//*------------
//*4--get all coupon
//*------------
const getAllcoupons = async (req, res, next) => {
  const coupons = await couponModel.find();
  res.status(201).json({ message: "success", coupons });
};

//*------------
//*5--get  coupon by id
//*------------
const getcouponById = async (req, res, next) => {
  const { _id } = req.params;

  const coupon = await couponModel.findById(_id);
  res.status(201).json({ message: "success", coupon });
};

export { addcoupon, updatecoupon, deletecoupon, getAllcoupons, getcouponById };
