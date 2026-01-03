// Import Firebase core
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyB6F-A2T33-gNVoUWv1NukzmlxmUa0cTuo",
  authDomain: "student-teacher-appointm-8a5e0.firebaseapp.com",
  databaseURL: "https://student-teacher-appointm-8a5e0-default-rtdb.firebaseio.com",
  projectId: "student-teacher-appointm-8a5e0",
  storageBucket: "student-teacher-appointm-8a5e0.firebasestorage.app",
  messagingSenderId: "765976583466",
  appId: "1:765976583466:web:c9f4ec60ad1e19b3d5d253",
  measurementId: "G-C75916ZMR6"
};

// Prevent re-initializing Firebase multiple times
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

// Firestore
export const db = getFirestore(app);

// Realtime Database
export const realtimeDB = getDatabase(app);

export const auth = getAuth(app);

export default app;
