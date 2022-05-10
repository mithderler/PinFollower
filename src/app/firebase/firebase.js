import { initializeApp, getApps } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import {
  getFirestore,
  connectFirestoreEmulator,
  enableMultiTabIndexedDbPersistence,
} from 'firebase/firestore';
import { getStorage, connectStorageEmulator } from 'firebase/storage';
import { firebaseConfig } from './config';

function initializeServices() {
  const isConfigured = getApps().length > 0;
  const firebaseApp = initializeApp(firebaseConfig);
  const firestore = getFirestore(firebaseApp);
  const firebaseStorage = getStorage();
  const auth = getAuth(firebaseApp);
  return { firebaseApp, firestore, firebaseStorage, auth, isConfigured };
}

function connectToEmulators({ auth, firestore, firebaseStorage }) {
  if (window.location.hostname === 'localhost') {
    connectFirestoreEmulator(firestore, 'localhost', 8080);
    connectAuthEmulator(auth, 'http://localhost:9099', {
      disableWarnings: true,
    });
    connectStorageEmulator(firebaseStorage, 'localhost', 9199);
  }
}

export function getFirebase() {
  const services = initializeServices();
  if (!services.isConfigured) {
    connectToEmulators(services);
    enableMultiTabIndexedDbPersistence(services.firestore);
  }
  return services;
}

export const { auth, firestore, firebaseApp, firebaseStorage } = getFirebase();
