import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: null,
  initialized: false,
};

const asyncSlice = createSlice({
  name: 'Async',
  initialState,
  reducers: {
    asyncActionStart(state) {
      state.loading = true;
      state.error = null;
    },
    asyncActionFinish(state) {
      state.loading = false;
    },
    asyncActionError(state, { payload }) {
      (state.loading = false), (state.error = payload);
    },
    appLoaded(state) {
      state.initialized = true;
    },
  },
});

export const asyncActions = asyncSlice.actions;
export default asyncSlice.reducer;
