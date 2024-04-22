import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { signUp, logIn, logOut, getProfile, setToken, updateUser } from 'services/authService';

export const loginThunk = createAsyncThunk(
  'auth/login',
  async (body, { rejectWithValue }) => {
    try {
      return await logIn(body);
    } catch (error) {
      toast.error(
        'Oops! Something went wrong! Please try reloading this page!'
      );
      return rejectWithValue(error.message);
    }
  }
);

export const registerThunk = createAsyncThunk(
  'auth/register',
  async (body, { rejectWithValue }) => {
    try {
      return await signUp(body);
    } catch (error) {
      toast.error(
        'Oops! Something went wrong! Please try reloading this page!'
      );
      return rejectWithValue(error.message);
    }
  }
);

export const logoutThunk = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      return await logOut();
    } catch (error) {
      toast.error(
        'Oops! Something went wrong! Please try reloading this page!'
      );
      return rejectWithValue(error.message);
    }
  }
);

export const getProfileThunk = createAsyncThunk(
  'auth/profile',
  async (_, { rejectWithValue }) => {
    try {
      return await getProfile();
    } catch (error) {
      toast.error(
        'Oops! Something went wrong! Please try reloading this page!'
      );
      return rejectWithValue(error.message);
    }
  }
);

export const fetchCurrentUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;
    if (!token) {
      return;
    }
    setToken(`Bearer ${token}`);
    try {
      return await getProfile();
    } catch (error) {
      toast.error(
        'Oops! Something went wrong! Please try reloading this page!'
      );
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


export const updaterUserData = createAsyncThunk(
  'auth/updateUser',
  async (body, { rejectWithValue }) => {
    try {
      const data = await updateUser(body);
      toast.success('Your information successfully updated');
      return data;
    } catch (error) {
      toast.error(
        'Oops! Something went wrong! Please try reloading this page!'
      );
      return rejectWithValue(error.message);
    }
  }
);