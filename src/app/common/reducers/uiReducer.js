import { createSlice } from '@reduxjs/toolkit';
import jsCookie from 'js-cookie';

const initialState = {
  appLanguage: jsCookie.get('i18next') || 'en',
};

const uiSlice = createSlice({
  name: 'Ui',
  initialState,
  reducers: {
    changeLanguage(state, { payload }) {
      state.appLanguage = payload;
    },
    getLanguage(state) {
      return state.appLanguage;
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;
