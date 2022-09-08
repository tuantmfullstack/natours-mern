import mongoose from 'mongoose';
import AppError from '../utils/appError.js';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import validator from 'validator';

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'User must have name'],
  },
  email: {
    type: String,
    required: [true, 'User must have email'],
    unique: true,
    validate: [validator.isEmail, 'You have type exactly email!'],
  },
  role: {
    type: String,
    default: 'user',
  },
  active: {
    type: Boolean,
    default: true,
  },
  photo: String,
  password: {
    type: String,
    required: [true, 'User must have password'],
    select: false,
    minLength: [8, 'User password must have more than 8 characters'],
  },
  passwordConfirm: {
    type: String,
    required: [true, 'User must have password confirm'],
  },
  passwordResetToken: String,
  passwordResetTokenExpire: Date,
  passwordChangedAt: Date,
});

userSchema.pre('save', function (next) {
  if (this.password !== this.passwordConfirm) {
    return next(
      new AppError('Password and passwordConfirm must be equals!', 400)
    );
  }
  next();
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;

  next();
});

userSchema.methods.correctPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.createResetToken = function () {
  const randomString = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(randomString)
    .digest('hex');

  console.log(this.passwordResetToken);

  this.passwordResetTokenExpire = Date.now() + 10 * 60 * 1000;

  return randomString;
};

userSchema.methods.changePasswordAfterTokenIssued = function (timestamp) {
  const time = new Date(this.passwordChangedAt).getTime();
  return time >= timestamp * 1000;
};

const User = mongoose.model('User', userSchema);

export default User;
