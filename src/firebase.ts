import { initializeApp } from "@firebase/app";
import { getFirestore } from "@firebase/firestore";
import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  getAuth,
} from "@firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};
export const firebaseApp = initializeApp(firebaseConfig);

// Setup and export used firebase apps
export const auth = getAuth();

// Setup auth providers
export const googleAuthProvider = new GoogleAuthProvider();
export const facebookAuthProvider = new FacebookAuthProvider();

export default firebaseApp;
