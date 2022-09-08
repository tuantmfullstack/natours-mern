import Tour from '../model/tourModel.js';
import ApiFeature from '../utils/apiFeatures.js';
import AppError from '../utils/appError.js';

import catchAsync from '../utils/catchAsync.js';

export const getAllTours = catchAsync(async (req, res, next) => {
  const tours = await new ApiFeature(Tour, req.query)
    .filter()
    .sort()
    .fields()
    .page().query;

  res.status(200).json({
    status: 'success',
    length: tours.length,
    data: {
      tours,
    },
  });
});

export const getTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findOne({ slug: req.params.slug })
    .populate({
      path: 'guides',
      select: 'name photo role',
    })
    .populate('reviews');

  if (!tour) return next(new AppError('There is no tour with this ID', 400));

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
});

export const createTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.create(req.body);

  res.status(201).json({
    status: 'success',
    message: 'Tour created!',
    data: {
      tour,
    },
  });
});

export const updateTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!tour) return next(new AppError('There is no tour with this ID', 400));

  res.status(202).json({
    status: 'success',
    message: 'Tour updated!',
    data: {
      tour,
    },
  });
});

export const deleteTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findByIdAndDelete(req.params.id);

  if (!tour) return next(new AppError('There is no tour with this ID', 400));

  res.status(200).json({
    status: 'success',
    message: 'Tour deleted!',
  });
});
