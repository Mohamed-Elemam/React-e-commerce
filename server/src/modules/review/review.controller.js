import { productModel } from '../../../database/models/product.model.js';
import { reviewModel } from "../../../database/models/review.model.js";

//*------------
//*1--add review on product
//*------------
const addReview = async (req, res, next) => {
  let userId = req.user._id;
  const {review , productId  , rating } = req.body;

  let product = await productModel.findById( productId );
  if (!product) {
    return res.status(404).json({ message: "product not found" });
  }
  let isReview = await reviewModel.findOne({userId , productId})
  if(isReview){
    return next(new Error('you created review on this product before',409))
  }
  let newReview = new reviewModel(
    {  review , productId  , rating , userId } 
  );
    await newReview.save()

  res.status(201).json({ message: "review added successfully ",newReview });
};

//*------------
//*2--  delete review
//*------------

const deleteReview = async (req, res, next) => {
  const { reviewId } = req.params;

  const review = await reviewModel.findByIdAndDelete( reviewId );
  if (!review) {
    return res.status(404).json({ message: "review not found" });
  }
  
  res.status(201).json({ message: "review removed successfully " });
};

//* 3 update review

const updateReview = async (req, res, next) => {
  const {review , productId  , rating } = req.body;
  const { reviewId } = req.params;


  const isReviewExist = await reviewModel.findById(
    reviewId 
  );
    if(!isReviewExist){
      return res.status(404).json({ message: "review not found" });
    }

    isReviewExist.review = review;
    isReviewExist.productId = productId;
    isReviewExist.rating = rating;

    await isReviewExist.save();

  res.status(201).json({ message: "review updated successfully ", isReviewExist });
};

//* 4 get user reviews
const getAllUserReviews = async (req, res, next) => {
  
  const reviews = await reviewModel.find({userId:req.user._id})
  res.status(200).json({ message: 'done' , reviews});
};

//* 5 get user review by review id
const getReviewById = async (req, res, next) => {

const {reviewId} = req.params
  const review = await reviewModel.findById(reviewId)
  res.status(200).json({ message: 'done' , review });
};
 
export { addReview, deleteReview,updateReview, getAllUserReviews  , getReviewById};
