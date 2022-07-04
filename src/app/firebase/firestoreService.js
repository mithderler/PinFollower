import {
  doc,
  addDoc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  collection,
  query,
  where,
  orderBy,
  writeBatch,
  serverTimestamp,
  Timestamp,
  arrayUnion,
  increment,
  arrayRemove,
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
    uid: snapshot.id,
  };
}

export async function setUserProfileData(user) {
  try {
    let currentUser = null;
    // do not change user profile in firestore if user logged in before
    const crrUserDoc = await getDoc(doc(firestore, 'users', user.uid));
    if (crrUserDoc.exists()) {
      currentUser = crrUserDoc.data();
    }
    return await setDoc(doc(firestore, 'users', user.uid), {
      displayName: currentUser?.displayName || user.displayName,
      email: currentUser?.email || user.email,
      photoURL: currentUser?.photoURL || user.photoURL || null,
      createdAt: currentUser?.createdAt || serverTimestamp(),
    });
  } catch (error) {
    throw error;
  }
}

export async function updateUserProfileData(currentProfile, { photoURL, bio }) {
  const batch = writeBatch(firestore);
  try {
    const currentProfileRef = doc(firestore, 'users', currentProfile.uid);

    batch.update(currentProfileRef, {
      photoURL: photoURL || currentProfile.photoURL,
      bio,
    });

    if (photoURL) {
      const pinsRef = query(
        collection(firestore, 'pins'),
        where('ownerUid', '==', currentProfile.uid)
      );
      const pinsSnapshot = await getDocs(pinsRef);
      pinsSnapshot.forEach((pin) => {
        batch.update(pin.ref, {
          ownerPhotoURL: photoURL,
        });
      });
    }

    await batch.commit();
  } catch (error) {
    throw error;
  }
}
// export async function updateUserProfileData(currentProfile, { photoURL, bio }) {
//   try {
//     return await updateDoc(doc(firestore, 'users', currentProfile.uid), {
//       photoURL: photoURL || currentProfile.photoURL,
//       bio,
//     });
//   } catch (error) {
//     throw error;
//   }
// }

export function getUserProfileRef(userId) {
  return doc(firestore, 'users', userId);
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
    likeIds: arrayUnion(user.uid),
    likeCount: 1,
    createdAt: serverTimestamp(),
  });
}

export async function updatePinInFirestore(pin, pinId) {
  const { pinName, description, tags, location, photoDescription } = pin;
  try {
    return await updateDoc(doc(firestore, 'pins', pinId), {
      pinName,
      description,
      tags,
      location,
      photoDescription,
      imgURL: pin.coverPhoto.croppedImgURL,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    throw error;
  }
}

export async function deletePinInFirestore(pinId) {
  return await deleteDoc(doc(firestore, 'pins', pinId));
}

export async function fetchPinsFromFirestore() {
  const docsRef = collection(firestore, 'pins');
  const q = query(docsRef, orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
}

export function addUserLike(pinId) {
  const user = auth.currentUser;
  try {
    return updateDoc(doc(firestore, 'pins', pinId), {
      likeIds: arrayUnion(user.uid),
      likeCount: increment(1),
    });
  } catch (error) {
    throw error;
  }
}

export function cancelUserLike(pinId) {
  const user = auth.currentUser;
  try {
    return updateDoc(doc(firestore, 'pins', pinId), {
      likeIds: arrayRemove(user.uid),
      likeCount: increment(-1),
    });
  } catch (error) {
    throw error;
  }
}
