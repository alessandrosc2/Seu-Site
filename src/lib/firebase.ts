import { initializeApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";

const isConfigured = !!import.meta.env.VITE_FIREBASE_API_KEY;

if (!isConfigured) {
  console.error(
    " ERRO DE SEGURANÇA: VITE_FIREBASE_API_KEY não está definida nas variáveis de ambiente. " +
    "O Firebase não foi inicializado. O Checkout e a área Logada irão falhar explicitamente."
  );
}

const firebaseConfig = isConfigured ? {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
} : undefined;

export const app = (isConfigured ? initializeApp(firebaseConfig!) : null) as unknown as FirebaseApp;
export const auth = (isConfigured ? getAuth(app) : null) as unknown as Auth;
export const db = (isConfigured ? getFirestore(app) : null) as unknown as Firestore;

export const requireFirebase = () => {
  if (!app || !auth || !db) {
    throw new Error("Erro Crítico: Variáveis de ambiente do Firebase ausentes. Configure a Vercel.");
  }
  return { app, auth, db };
};
