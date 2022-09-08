import Review from '../model/reviewModel.js';
import AppError from '../utils/appError.js';
import catchAsync from '../utils/catchAsync.js';

export const getAllReviews = catchAsync(async (req, res, next) => {
  let query = {};
  if (req.params.tourId) query = { tour: req.params.tourId };

  const reviews = await Review.find(query);

  res.status(200).json({
    status: 'success',
    length: reviews.length,
    data: {
      reviews,
    },
  });
});

export const getReview = catchAsync(async (req, res, next) => {
  const review = await Review.findById(req.params.id);

  if (!review)
    return next(new AppError('There is no review with this id', 400));

  res.status(200).json({
    status: 'success',
    data: {
      review,
    },
  });
});

export const createReview = catchAsync(async (req, res, next) => {
  const user = req.body.user || req.user._id;
  const tour = req.body.tour || req.params.tourId;

  const review = await Review.create({
    review: req.body.review,
    rating: req.body.rating,
    user,
    tour,
  });

  res.status(201).json({
    status: 'success',
    message: 'Review created!',
    data: {
      review,
    },
  });
});

export const updateReview = catchAsync(async (req, res, next) => {
  const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!review)
    return next(new AppError('There is no review with this id', 400));

  res.status(202).json({
    status: 'success',
    message: 'Review updated!',
    data: {
      review,
    },
  });
});

export const deleteReview = catchAsync(async (req, res, next) => {
  const review = await Review.findByIdAndDelete(req.params.id);

  if (!review)
    return next(new AppError('There is no review with this id', 400));

  res.status(200).json({
    status: 'success',
    message: 'Review deleted!',
  });
});
