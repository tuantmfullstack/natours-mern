import mongoose from 'mongoose';

const reviewSchema = mongoose.Schema({
  review: {
    type: String,
    required: [true, 'Review must have review'],
  },
  rating: {
    type: Number,
    required: [true, 'Review must have raing'],
    min: 1,
    max: 5,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Review must have user'],
  },
  tour: {
    type: mongoose.Schema.ObjectId,
    ref: 'Tour',
    required: [true, 'Review must have tour'],
  },
});

reviewSchema.pre(/^find/, function () {
  this.populate({
    path: 'tour',
    select: 'name',
  }).populate({
    path: 'user',
    select: 'name photo role',
  });
});

const Review = mongoose.model('Review', reviewSchema);

export default Review;
