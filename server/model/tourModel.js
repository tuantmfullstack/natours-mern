import mongoose from 'mongoose';
import slugify from 'slugify';

const tourSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A tour must have a name'],
      unique: true,
    },
    duration: {
      type: Number,
      required: [true, 'A tour must have duration'],
    },
    difficulty: {
      type: String,
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message:
          '{VALUE} is invalid. Difficulty of tour must be either easy, medium or difficult',
      },
      required: [true, 'A tour must have difficulty'],
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'A tour must have a duration'],
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'A tour must have a price'],
    },
    summary: {
      type: String,
      required: [true, 'A tour must have a summary'],
    },
    description: {
      type: String,
      required: [true, 'A tour must have a description'],
    },
    imagesCover: String,
    images: [String],
    startDates: [Date],
    slug: String,
    startLocation: {
      type: {
        type: String,
        enum: ['Point'],
      },
      description: String,
      coordinates: [Number],
      address: String,
    },
    guides: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      },
    ],
    locations: [
      {
        type: {
          type: String,
          enum: ['Point'],
        },
        description: String,
        coordinates: [Number],
        day: Number,
      },
    ],
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

tourSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'tour',
  localField: '_id',
});

tourSchema.pre('save', function (next) {
  this.slug = slugify(this.name, {
    lower: true,
    trim: true,
  });

  next();
});

const Tour = mongoose.model('Tour', tourSchema);

export default Tour;
