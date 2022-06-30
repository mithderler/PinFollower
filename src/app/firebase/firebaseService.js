import { async } from '@firebase/util';
import {
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { getFileExtension } from '../common/utils/helpers';
import { auth, firebaseStorage } from './firebase';
import { setUserProfileData } from './firestoreService';
import { v4 as uuidv4 } from 'uuid';

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
    await sendEmailVerification(userCredential.user);
    return await signOutFirebase();
  } catch (error) {
    throw error;
  }
}

export async function signInWithEmailAndRemember({ email, password }) {
  return await signInWithEmailAndPassword(auth, email, password);
}

export async function signInWithEmailForOneSession({ email, password }) {
  return await setPersistence(auth, browserSessionPersistence).then(
    async () => {
      return await signInWithEmailAndPassword(auth, email, password);
    }
  );
}

export async function signInWithProvider(providerSelected) {
  try {
    await signOutFirebase();
    const provider = new providerSelected();
    const authResult = await signInWithPopup(auth, provider);
    const { user } = authResult;
    await setUserProfileData(user);
    return authResult;
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log('Error: ', errorCode, errorMessage);
    // The email of the user's account used.
    const email = error.customData.email;
    console.log('Error account: ', email);
  }
}

export async function sendPassResetEmail({ email }) {
  return await sendPasswordResetEmail(auth, email).then(() => {
    console.log('Password has been sent');
  });
}

export async function signOutFirebase() {
  return await signOut(auth);
}

export function uploadPhotoToFirebaseStorage(file, setValue, setError) {
  const userUid = auth.currentUser.uid;
  const filename = uuidv4() + '.' + getFileExtension(file.name);
  const photoRef = ref(firebaseStorage, `${userUid}/pin_photos/${filename}`);
  let progress;
  const uploadTask = uploadBytesResumable(photoRef, file);

  uploadTask.on(
    'state_changed',
    (snapshot) => {
      progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
    },
    (error) => {
      setError(error);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log('File available at', downloadURL);
        setValue(downloadURL);
      });
    }
  );
}
