// slices/userSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const URL = "http://localhost:8080/api";

export const loginUser = createAsyncThunk(
  'user/login',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${URL}/users/login`, {
        username,
        password,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const registerUser = createAsyncThunk(
  'user/register',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${URL}/users/register`, {
        username,
        password,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateUserPassword = createAsyncThunk(
  'user/updatePassword',
  async ({ userId, password }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${URL}/users/${userId}/password`, {
        password,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateUserUsername = createAsyncThunk(
  'user/updateUsername',
  async ({ userId, newUsername }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${URL}/users/${userId}/username`, {
        username: newUsername,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(updateUserPassword.fulfilled, (state, action) => {
      state.user.password = action.payload.password;
    });
    builder.addCase(updateUserUsername.fulfilled, (state, action) => {
      state.user.username = action.payload.username;
    });
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;