import { createSlice } from '@reduxjs/toolkit';
import { onAuthStateChanged } from 'firebase/auth';
import { onSnapshot } from 'firebase/firestore';
import { auth } from '../../app/firebase/firebase';
import { asyncActions } from '../../app/async/asyncReducer';

import {
  getUserProfileRef,
  organizeSnapshotDoc,
} from '../../app/firebase/firestoreService';
import { profileActions } from '../profiles/profileReducer';

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
        const profileRef = getUserProfileRef(user.uid);
        onSnapshot(profileRef, (snapshot) => {
          dispatch(
            profileActions.getCurrentUserProfile(organizeSnapshotDoc(snapshot))
          );
          dispatch(asyncActions.appLoaded());
        });
      } else {
        dispatch(authActions.signOutUser());
        dispatch(asyncActions.appLoaded());
        console.log('no verified user');
      }
    });
  };
}
