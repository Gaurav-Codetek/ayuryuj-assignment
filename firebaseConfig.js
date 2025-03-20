import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyB7TE7uGhv8FnruwZ9zZHBNd4ju5OCp4oE",
  authDomain: "ayuryuj-e8b5b.firebaseapp.com",
  projectId: "ayuryuj-e8b5b",
  storageBucket: "ayuryuj-e8b5b.firebasestorage.app",
  messagingSenderId: "867922280298",
  appId: "1:867922280298:web:c12cd94e001e9294ba6f13",
  measurementId: "G-6PXDE65163"
};

const firebaseApp = getApps().length === 0 ?  initializeApp(firebaseConfig) : getApp();
const auth = initializeAuth(firebaseApp, {persistence: getReactNativePersistence(AsyncStorage)});
const db = getFirestore(firebaseApp);
auth.useDeviceLanguage();

export {firebaseApp, auth, db};