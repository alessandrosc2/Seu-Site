import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const isConfigured = !!import.meta.env.VITE_FIREBASE_API_KEY;

if (!isConfigured) {
  console.error(
    " ERRO DE SEGURANA: VITE_FIREBASE_API_KEY no est definida nas variveis de ambiente. " +
    "O Firebase no foi inicializado. O Checkout e a rea Logada iro falhar explicitamente."
  );
}

// Inicializa apenas se tiver as chaves (evita crash fatal no import)
const firebaseConfig = isConfigured ? {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
} : undefined;

export const app = isConfigured ? initializeApp(firebaseConfig) : null;
export const auth = isConfigured ? getAuth(app) : null;
export const db = isConfigured ? getFirestore(app) : null;

// Helper para validar antes do uso e falhar explicitamente onde for chamado
export const requireFirebase = () => {
  if (!app || !auth || !db) {
    throw new Error("Erro Crtico: Variveis de ambiente do Firebase ausentes. Configure a Vercel.");
  }
  return { app, auth, db };
};
