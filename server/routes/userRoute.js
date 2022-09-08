import express from 'express';
import {
  forgotPassword,
  login,
  me,
  protect,
  resetPassword,
  restrictTo,
  signup,
  updateMe,
  updatePassword,
} from '../controllers/authController.js';
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
  uploadUserPhoto,
} from '../controllers/userController.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/forgotPassword', forgotPassword);
router.patch('/resetPassword/:token', resetPassword);
router.patch('/updatePassword', protect, updatePassword);
router.patch('/updateMe', protect, uploadUserPhoto, updateMe);
router.get('/me', protect, me, getUser);

router.route('/').get(protect, getAllUsers).post(createUser);
router
  .route('/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(protect, restrictTo('admin'), deleteUser);

export default router;
