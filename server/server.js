import mongoose from 'mongoose';
import app from './app.js';
// import { deleteData, importData } from './dev-data/data/importData.js';

const port = process.env.PORT || 5000;

console.log(process.env.NODE_ENV);

const URL = process.env.MONGODB_URL.replace(
  '<password>',
  process.env.MONGODB_PW
);

// if (process.env.STATUS === 'import') {
//   importData();
// } else if (process.env.STATUS === 'delete') {
//   deleteData();
// }

mongoose
  .connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log('DB connected!'));

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
