import jwt from 'jsonwebtoken';
import crypto from 'crypto';

import User from '../model/userModel.js';
import AppError from '../utils/appError.js';
import catchAsync from '../utils/catchAsync.js';
import email from '../utils/email.js';

const response = (res, statusCode, user, message) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });

  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    message,
    token,
    data: {
      user,
    },
  });
};

export const signup = catchAsync(async (req, res, next) => {
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    photo: req.body.photo,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  user.password = undefined;

  response(res, 201, user, 'Account created!');
});

export const login = catchAsync(async (req, res, next) => {
  if (!req.body.email || !req.body.password)
    return next(new AppError('Please provide us email and password', 400));

  const user = await User.findOne({ email: req.body.email }).select(
    '+password'
  );

  if (!user || !(await user.correctPassword(req.body.password)))
    return next(new AppError('Wrong password or no user with this email', 400));

  response(res, 200, user, 'Login success!');
});

export const forgotPassword = catchAsync(async (req, res, next) => {
  if (!req.body.email)
    return next(new AppError('Please provide us email!', 400));

  const user = await User.findOne({ email: req.body.email });

  if (!user) return next(new AppError('There is no user with this email', 400));

  const resetToken = user.createResetToken();

  await user.save({ validateBeforeSave: false });

  const URLServer = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/users/resetPassword/${resetToken}`;

  const URLClient = `http://localhost:3000/resetPassword/${resetToken}`;

  const message = `Forgot your password? Submit a PATCH request with your new password and password confirm to: ${URLClient}. If you didn't forget your password, please ignore this email.`;
  const subject = 'PASSWORD RESET TOKEN (ONLY VALID ON 10 MINS)';

  await email({ to: user.email, subject, message });

  res.status(200).json({
    status: 'success',
    message: 'Password reset token has been sent to your email!',
  });
});

export const resetPassword = catchAsync(async (req, res, next) => {
  const hashToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  console.log(hashToken);

  const user = await User.findOne({
    passwordResetToken: hashToken,
    passwordResetTokenExpire: { $gte: Date.now() },
  });

  if (!user)
    return next(
      new AppError(
        'There is no user with this token or token expired. Please try again.',
        404
      )
    );

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetTokenExpire = undefined;
  user.passwordChangedAt = Date.now();
  await user.save();

  response(res, 202, user, 'Password reseted!');
});

export const updatePassword = catchAsync(async (req, res, next) => {
  if (
    !req.body.currentPassword ||
    !req.body.password ||
    !req.body.passwordConfirm
  )
    return next(new AppError('Please provide us all of password', 400));

  const user = await User.findById(req.user._id).select('+password');
  if (!(await user.correctPassword(req.body.currentPassword)))
    return next(new AppError('Wrong password!', 400));

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordChangedAt = Date.now();
  await user.save();

  response(res, 202, user, 'Password updated!');
});

export const protect = catchAsync(async (req, res, next) => {
  let token;

  if (req.cookies.jwt) {
    token = req.cookies.jwt;
  } else if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token)
    return next(new AppError('You have to login before accessing it!', 401));

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded.id);
  if (!user) return next(new AppError('There is no user with this token', 401));

  if (user.changePasswordAfterTokenIssued(decoded.iat))
    return next(new AppError('Password changed. Please login again!', 401));

  req.user = user;
  next();
});

export const restrictTo = (...roles) => {
  return catchAsync(async (req, res, next) => {
    if (!roles.includes(req.user.role))
      return next(new AppError('You do not have permission to do this', 400));

    next();
  });
};

export const updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm)
    return next(
      new AppError('Please use /updatePassword to update password', 400)
    );

  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      name: req.body.name,
      email: req.body.email,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(202).json({
    status: 'success',
    message: 'User info updated!',
    data: {
      user,
    },
  });
});

export const me = (req, res, next) => {
  req.params.id = req.user._id;
  next();
};
