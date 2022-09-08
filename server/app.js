import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';

import tourRouter from './routes/tourRoute.js';
import errorHandler from './controllers/errorController.js';
import userRouter from './routes/userRoute.js';
import reviewRouter from './routes/reviewRoute.js';
import cookieParser from 'cookie-parser';
import mongoSanitize from 'express-mongo-sanitize';
import hpp from 'hpp';
import xss from 'xss-clean';
import rateLimit from 'express-rate-limit';
import cors from 'cors';

const app = express();

// const limiter = rateLimit({
//   windowMs: 60 * 60 * 1000,
//   max: 100,
//   standardHeaders: true,
//   legacyHeaders: false,
//   message: 'Too many requests from this IP. Please try again in an hour!',
// });

dotenv.config({ path: './.env' });
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(cors());
// app.use(express.json({ limit: '30kb' }));
app.use(express.json());
app.use(cookieParser());
// app.use(limiter);
app.use(mongoSanitize());
app.use(xss());
app.use(hpp({ whitelist: ['filter', 'duration'] }));

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);
app.all('*', (req, res) => {
  res.status(404).json({
    status: 'fail',
    message: 'Not found!',
  });
});

app.use(errorHandler);
export default app;
