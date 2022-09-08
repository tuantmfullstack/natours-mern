import axios from 'axios';
import Cookies from 'universal-cookie';
import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';

const URL = 'http://localhost:5000/api/v1/';

let headers = {};

if (document.cookie)
  headers = { Authorization: `Bearer ${document.cookie?.split('=')[1]}` };

const instance = axios.create({
  headers,
});

export const login = createAsyncThunk(
  'auth/login',
  async (user, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await instance.post(`${URL}users/login`, user);
      dispatch(authSlice.actions.saveToLocalstorage(data));
      dispatch(authSlice.actions.sendCookie(data));
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const signup = createAsyncThunk(
  'auth/signup',
  async (user, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await instance.post(`${URL}users/signup`, user);
      dispatch(authSlice.actions.saveToLocalstorage(data));
      dispatch(authSlice.actions.sendCookie(data));
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateUser = createAsyncThunk(
  'auth/updateUser',
  async (user, { dispatch, rejectWithValue }) => {
    try {
      let headers = {};

      if (document.cookie)
        headers = { Authorization: `Bearer ${document.cookie?.split('=')[1]}` };

      const { data } = await instance.patch(`${URL}users/updateMe`, user, {
        headers,
      });
      dispatch(authSlice.actions.saveToLocalstorage(data));
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async (email, { rejectWithValue }) => {
    try {
      const { data } = await instance.post(`${URL}users/forgotPassword`, {
        email,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (user, { rejectWithValue }) => {
    try {
      const { data } = await instance.patch(
        `${URL}users/resetPassword/${user.token}`,
        user
      );
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updatePassword = createAsyncThunk(
  'auth/updatePassword',
  async (info, { dispatch, rejectWithValue }) => {
    try {
      let headers = {};

      if (document.cookie)
        headers = { Authorization: `Bearer ${document.cookie?.split('=')[1]}` };
      const { data } = await instance.patch(
        `${URL}users/updatePassword`,
        info,
        {
          headers,
        }
      );
      dispatch(authSlice.actions.sendCookie(data));
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLogin: !!document.cookie?.split('=')[1],
    isLoading: null,
    err: null,
  },
  reducers: {
    logout: (state, action) => {
      state.isLogin = false;
      const cookies = new Cookies();
      cookies.set('token', '', {
        expires: new Date(Date.now() + 1000),
      });

      localStorage.removeItem('email');
      localStorage.removeItem('name');
      localStorage.removeItem('photo');
      localStorage.removeItem('id');
    },
    saveToLocalstorage: (state, action) => {
      localStorage.setItem('email', action.payload.data.user.email);
      localStorage.setItem('name', action.payload.data.user.name);
      localStorage.setItem('photo', `${action.payload.data.user._id}.jpeg`);
      localStorage.setItem('id', action.payload.data.user._id);
    },
    sendCookie: (state, action) => {
      const cookies = new Cookies();
      cookies.set('token', action.payload.token, {
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      });
    },
  },
  extraReducers: {
    [login.pending]: (state, action) => {
      state.isLoading = true;
    },
    [login.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isLogin = true;
      state.err = false;
    },
    [login.rejected]: (state, action) => {
      state.isLoading = false;
      state.isLogin = false;
      state.err = true;
    },
    [signup.pending]: (state, action) => {
      state.isLoading = true;
    },
    [signup.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isLogin = true;
      state.err = false;
    },
    [signup.rejected]: (state, action) => {
      state.isLoading = false;
      state.isLogin = false;
      state.err = true;
    },
    [updateUser.pending]: (state, action) => {
      state.isLoading = true;
    },
    [updateUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.err = false;
      state.isLogin = true;
    },
    [forgotPassword.pending]: (state, action) => {
      state.isLoading = true;
    },
    [forgotPassword.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isLogin = false;
      state.err = false;
    },
    [forgotPassword.rejected]: (state, action) => {
      state.isLoading = false;
      state.isLogin = false;
      state.err = true;
    },
    [updatePassword.pending]: (state, action) => {
      state.isLoading = true;
    },
    [updatePassword.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.err = false;
      state.isLogin = true;
    },
  },
});

export default authSlice;
