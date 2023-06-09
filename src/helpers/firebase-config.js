import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDGbRh9KmZPXPtbkm7lKbRNJ9CqPod2p_Y",
  authDomain: "pass-transport.firebaseapp.com",
  projectId: "pass-transport",
  storageBucket: "pass-transport.appspot.com",
  messagingSenderId: "988494787590",
  appId: "1:988494787590:web:a3c45df17887b242c27f87",
  measurementId: "G-HCCTM0WBBV"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
const providerGoogle = new GoogleAuthProvider();
providerGoogle.addScope("https://www.googleapis.com/auth/contacts.readonly");
const providerFacebook = new FacebookAuthProvider();
providerFacebook.addScope("user_birthday");

export const providers = {
  google: providerGoogle,
  facebook: providerFacebook
};
