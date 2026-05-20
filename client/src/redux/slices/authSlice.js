import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token') || null,
  loading: false,
  initialized: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      localStorage.setItem('token', action.payload.token);
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
    updateUserProfile: (state, action) => {
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    setOnBoarding: (state) => {
      if (state.user) {
        if (!state.user.profile) state.user.profile = {};
        state.user.profile.isOnboarded = true;
        localStorage.setItem('user', JSON.stringify(state.user));
      }
    },
    setInitialized: (state) => {
      state.initialized = true;
    }
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, updateUserProfile, setInitialized, setOnBoarding } = authSlice.actions;
export default authSlice.reducer;
