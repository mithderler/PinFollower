import {
  doc,
  addDoc,
  getDoc,
  getDocs,
  setDoc,
  collection,
  query,
  where,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import { auth, firestore } from './firebase';

export function organizeSnapshotDoc(snapshot) {
  if (!snapshot.exists()) return undefined;
  const data = snapshot.data();

  for (const prop in data) {
    if (Object.prototype.hasOwnProperty.call(data, prop)) {
      if (data[prop] instanceof Timestamp) {
        data[prop] = data[prop].toDate();
      }
    }
  }

  return {
    ...data,
    id: snapshot.id,
  };
}

export async function setUserProfileData(user) {
  try {
    return await setDoc(doc(firestore, 'users', user.uid), {
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL || null,
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    throw error;
  }
}

export function getUserProfileRef(userUid) {
  return doc(firestore, 'users', userUid);
}

export async function addPinToFirestore(pin) {
  const user = auth.currentUser;
  const { pinName, description, tags, location, photoDescription } = pin;
  return await addDoc(collection(firestore, 'pins'), {
    ownerUid: user.uid,
    ownerUsername: user.displayName,
    ownerPhotoURL: user.photoURL || null,
    pinName,
    description,
    tags,
    location,
    photoDescription,
    imgURL: pin.coverPhoto.croppedImgURL,
    createdAt: serverTimestamp(),
  });
}

export async function fetchPinsFromFirestore() {
  const docsRef = collection(firestore, 'pins');

  const snapshot = await getDocs(docsRef);
  return snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
}
