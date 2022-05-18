import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUserProfile: null,
  selectedUserProfile: null,
  photos: [],
  followers: [],
  followings: [],
};

const profileSlice = createSlice({
  name: 'Profile',
  initialState,
  reducers: {
    getCurrentUserProfile(state, { payload }) {
      state.currentUserProfile = payload;
    },
  },
});

export const profileActions = profileSlice.actions;
export default profileSlice.reducer;
