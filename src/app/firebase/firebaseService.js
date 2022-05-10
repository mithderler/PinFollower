import { async } from '@firebase/util';
import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { getFileExtension } from '../common/util/functions';
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

export async function signInWithEmail({ email, password }) {
  return await signInWithEmailAndPassword(auth, email, password);
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
