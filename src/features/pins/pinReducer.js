import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  pins: [],
};

const pinSlice = createSlice({
  name: 'Pin',
  initialState,
  reducers: {
    fetchPins(state, { payload }) {
      state.pins = payload;
    },
  },
});

export const pinActions = pinSlice.actions;
export default pinSlice.reducer;
