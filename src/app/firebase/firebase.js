import { initializeApp, getApps } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import {
  getFirestore,
  connectFirestoreEmulator,
  enableMultiTabIndexedDbPersistence,
} from 'firebase/firestore';
import { firebaseConfig } from './config';

function initializeServices() {
  const isConfigured = getApps().length > 0;
  const firebaseApp = initializeApp(firebaseConfig);
  const firestore = getFirestore(firebaseApp);
  const auth = getAuth(firebaseApp);
  return { firebaseApp, firestore, auth, isConfigured };
}

function connectToEmulators({ auth, firestore }) {
  // if (window.location.hostname === 'localhost') {
  //   connectFirestoreEmulator(firestore, 'localhost', 8080);
  //   connectAuthEmulator(auth, 'http://localhost:9099', {
  //     disableWarnings: true,
  //   });
  // }
}

export function getFirebase() {
  const services = initializeServices();
  // if (!services.isConfigured) {
  // connectToEmulators(services);
  // enableMultiTabIndexedDbPersistence(services.firestore);
  // }
  return services;
}

export const { auth, firestore, firebaseApp } = getFirebase();
