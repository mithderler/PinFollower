import { createSlice } from '@reduxjs/toolkit';
import { onAuthStateChanged } from 'firebase/auth';

import { auth } from '../../app/firebase/config';

const initialState = {
  authenticated: false,
  currentUser: null,
};

const authSlice = createSlice({
  name: 'Auth',
  initialState,
  reducers: {
    signInUser(state, { payload }) {
      state.authenticated = true;
      state.currentUser = {
        email: payload.email,
        photoURL: payload.photoURL,
        uid: payload.uid,
        displayName: payload.displayName,
      };
    },
    signOutUser(state) {
      state.authenticated = false;
      state.currentUser = null;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;

export function verifyAuth() {
  return function (dispatch) {
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('verify user: ', user);
        dispatch(authActions.signInUser(user));
        // const profileRef = getUserProfile(user.uid);
        // profileRef.onSnapshot((snapshot) => {
        //   dispatch(listenToCurrentUserProfile(dataFromSnapshot(snapshot)));
        //   dispatch({ type: APP_LOADED });
        return;
      } else {
        dispatch(authActions.signOutUser());
        // dispatch({ type: APP_LOADED });
        console.log('no verify user');
      }
    });
  };
}
