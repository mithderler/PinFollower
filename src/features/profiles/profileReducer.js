import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUserProfile: null,
  selectedUserProfile: null,
  photos: [],
  followers: [],
  followings: [],
  followingUser: false,
};

const profileSlice = createSlice({
  name: 'Profile',
  initialState,
  reducers: {
    setCurrentUserProfile(state, { payload }) {
      state.currentUserProfile = payload;
    },
    setSelectedUserProfile(state, { payload }) {
      state.selectedUserProfile = payload;
    },
  },
});

export const profileActions = profileSlice.actions;
export default profileSlice.reducer;
