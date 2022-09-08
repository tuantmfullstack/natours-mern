import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const URL = 'http://localhost:5000/api/v1/';

let headers = {};

if (document.cookie)
  headers = { Authorization: `Bearer ${document.cookie?.split('=')[1]}` };

const instance = axios.create({
  headers,
});

export const getAllTours = createAsyncThunk(
  'tours/getAllTours',
  async (user, { rejectWithValue }) => {
    try {
      const { data } = await instance.get(`${URL}tours`);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getTour = createAsyncThunk(
  'tours/getTour',
  async (tourSlug, { rejectWithValue }) => {
    try {
      const { data } = await instance.get(`${URL}tours/${tourSlug}`);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const tourSlice = createSlice({
  name: 'tours',
  initialState: {
    isLoading: true,
    tours: [],
    tour: {},
    err: null,
  },
  reducers: {},
  extraReducers: {
    [getAllTours.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllTours.fulfilled]: (state, action) => {
      state.tours = action.payload.data.tours;
      state.err = false;
      state.isLoading = false;
    },
    [getAllTours.rejected]: (state, action) => {
      state.err = action.payload;
      state.isLoading = false;
    },
    [getTour.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getTour.fulfilled]: (state, action) => {
      state.tour = action.payload.data.tour;
      state.err = false;
      state.isLoading = false;
    },
    [getTour.rejected]: (state, action) => {
      state.err = true;
      state.tour = null;
      state.isLoading = false;
    },
  },
});

export default tourSlice;
