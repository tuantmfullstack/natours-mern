import multer from 'multer';
import path from 'path';

import User from '../model/userModel.js';
import AppError from '../utils/appError.js';
import catchAsync from '../utils/catchAsync.js';

const __dirname = path.resolve();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../client/src/img/users/'));
  },
  filename: function (req, file, cb) {
    const suffix = req.user._id;
    cb(null, suffix + '.' + file.mimetype.split('/')[1]);
  },
});

const fileFilter = (req, file, cb) => {
  if (!file.mimetype.startsWith('image')) {
    cb(new AppError('Not image! Please upload image', 400), false);
  }
  cb(null, true);
};

const upload = multer({ storage, fileFilter });

export const uploadUserPhoto = upload.single('photo');

export const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: 'success',
    length: users.length,
    data: {
      users,
    },
  });
});

export const getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) return next(new AppError('There is no user with this ID', 400));

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

export const createUser = catchAsync(async (req, res, next) => {
  res.status(400).json({
    status: 'fail',
    message: 'Please use /signup to create user',
  });
});

export const updateUser = catchAsync(async (req, res, next) => {
  res.status(400).json({
    status: 'fail',
    message: 'Please use /updateMe to update infomation',
  });
});

export const deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) return next(new AppError('There is no user with this ID', 400));

  res.status(200).json({
    status: 'success',
    message: 'User deleted!',
  });
});

export const deleteSoftUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, { active: false });

  if (!user) return next(new AppError('There is no user with this ID', 400));

  res.status(200).json({
    status: 'success',
    message: 'Delete soft user successfully!',
  });
});
