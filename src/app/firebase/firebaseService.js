import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { toast } from 'react-toastify';

import { auth } from './config';
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

    console.log(userCredential.user);
    return await setUserProfileData(userCredential.user);
  } catch (error) {
    toast.error(error.message);
    throw error;
  }
}
