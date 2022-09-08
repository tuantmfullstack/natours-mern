import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice.js';
import tourSlice from './tourSlice.js';

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    tours: tourSlice.reducer,
  },
});

export default store;
