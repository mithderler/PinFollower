import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  authenticated: false,
};

const authSlice = createSlice({
  name: 'Auth',
  initialState,
  reducers: {
    login(state) {
      state.authenticated = true;
    },
    logout(state) {
      state.authenticated = false;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
