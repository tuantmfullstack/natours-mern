import fs from 'fs';
import path from 'path';
import Tour from '../../model/tourModel.js';
import User from '../../model/userModel.js';
import Review from '../../model/reviewModel.js';

const __dirname = path.resolve();

export const importData = async () => {
  const tours = fs.readFileSync(
    path.join(__dirname, '/dev-data/data/tours.json'),
    {
      encoding: 'utf-8',
    }
  );

  const users = fs.readFileSync(
    path.join(__dirname, '/dev-data/data/users.json'),
    {
      encoding: 'utf-8',
    }
  );

  const reviews = fs.readFileSync(
    path.join(__dirname, '/dev-data/data/reviews.json'),
    {
      encoding: 'utf-8',
    }
  );

  await Tour.insertMany(JSON.parse(tours));
  await User.insertMany(JSON.parse(users));
  await Review.insertMany(JSON.parse(reviews));

  console.log('Import successfully!');
};

export const deleteData = async () => {
  await Tour.deleteMany();
  await User.deleteMany();
  await Review.deleteMany();

  console.log('Delete successfully!');
};
