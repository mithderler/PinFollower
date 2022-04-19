import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

import { db } from './config';

export async function setUserProfileData(user) {
  try {
    return await setDoc(doc(db, 'users', user.uid), {
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL || null,
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    throw error;
  }
}
