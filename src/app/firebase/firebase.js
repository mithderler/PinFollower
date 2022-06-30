import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import {
  getFirestore,
  connectFirestoreEmulator,
  enableMultiTabIndexedDbPersistence,
} from 'firebase/firestore';
import { getStorage, connectStorageEmulator } from 'firebase/storage';
import { connectFunctionsEmulator, getFunctions } from 'firebase/functions';

import { firebaseConfig, isEmulatorsOn } from './config';

function initializeServices() {
  const isConfigured = getApps().length > 0;
  const firebaseApp = initializeApp(firebaseConfig);
  const firestore = getFirestore(firebaseApp);
  const firebaseStorage = getStorage();
  const functions = getFunctions(firebaseApp);
  const auth = getAuth(firebaseApp);
  return {
    firebaseApp,
    firestore,
    firebaseStorage,
    auth,
    functions,
    isConfigured,
  };
}

function connectToEmulators({ auth, firestore, firebaseStorage, functions }) {
  if (window.location.hostname === 'localhost') {
    connectFirestoreEmulator(firestore, 'localhost', 8080);
    connectAuthEmulator(auth, 'http://localhost:9099', {
      disableWarnings: true,
    });
    connectStorageEmulator(firebaseStorage, 'localhost', 9199);
    connectFunctionsEmulator(functions, 'localhost', 5001);
  }
}

export function getFirebase() {
  const services = initializeServices();
  if (!services.isConfigured && isEmulatorsOn) {
    connectToEmulators(services);
    enableMultiTabIndexedDbPersistence(services.firestore);
  }
  return services;
}

export const { auth, firestore, firebaseApp, firebaseStorage, functions } =
  getFirebase();
