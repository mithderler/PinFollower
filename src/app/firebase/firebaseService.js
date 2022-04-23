import { async } from '@firebase/util';
import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

import { auth } from './firebase';
import { setUserProfileData } from './firestoreService';

export async function registerInFirebase({ email, username, password }) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    await updateProfile(auth.currentUser, {
      displayName: username,
    });

    await setUserProfileData(userCredential.user);
    return await sendEmailVerification(userCredential.user);
  } catch (error) {
    throw error;
  }
}

export async function signInWithEmail({ email, password }) {
  return await signInWithEmailAndPassword(auth, email, password);
}

export async function signOutFirebase() {
  return await signOut(auth);
}
