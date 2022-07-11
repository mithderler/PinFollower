import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  pins: [],
};

const pinSlice = createSlice({
  name: 'Pin',
  initialState,
  reducers: {
    storePins(state, { payload }) {
      state.pins = payload;
    },
    deletePin(state, { payload }) {
      console.log('payloadd:', payload);
      state.pins = [...state.pins.filter((pin) => pin.id !== payload)];
    },
  },
});

export const pinActions = pinSlice.actions;
export default pinSlice.reducer;
