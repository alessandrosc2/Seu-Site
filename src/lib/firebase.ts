import { initializeApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";

// Usando as chaves diretas (Firebase Web Config é público por design, protegido por Security Rules)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyCB1o0ELSMY00I5qdquHT1i1UTWZOQOLAg",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "site-unico.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "site-unico",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "site-unico.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "308395582350",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:308395582350:web:1fc1075ced51253e35badf",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-55VZ8HJ0HV"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const requireFirebase = () => {
  return { app, auth, db };
};
