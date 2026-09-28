import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

if (!import.meta.env.VITE_FIREBASE_API_KEY) {
  // Mostra um erro explicito na tela para nao ficar apenas uma tela azul
  if (typeof document !== "undefined") {
    document.body.innerHTML = `
      <div style="background-color: #070d1e; color: #fff; height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; font-family: sans-serif; padding: 20px; text-align: center;">
        <div style="background-color: rgba(239, 68, 68, 0.1); border: 1px solid rgb(239, 68, 68); padding: 30px; border-radius: 8px; max-width: 600px;">
          <h1 style="color: rgb(239, 68, 68); margin-top: 0;">Erro: Configuração do Firebase Ausente</h1>
          <p style="color: #ccc; line-height: 1.6;">As chaves de ambiente do Firebase não foram encontradas.</p>
          <p style="color: #ccc; line-height: 1.6;">Conforme exigido na política de segurança, as chaves "fallback" (ex: AIzaSy...) foram removidas do código-fonte.</p>
          <div style="background: #000; padding: 15px; border-radius: 4px; margin-top: 20px; font-family: monospace; color: #10b981; text-align: left; overflow-x: auto;">
            VITE_FIREBASE_API_KEY<br/>
            VITE_FIREBASE_AUTH_DOMAIN<br/>
            VITE_FIREBASE_PROJECT_ID
          </div>
          <p style="color: #ccc; margin-top: 20px;">Por favor, adicione essas variáveis no painel da Vercel (Project Settings > Environment Variables) e faça um novo Deploy.</p>
        </div>
      </div>
    `;
  }
  throw new Error("Missing Firebase configuration. Please set VITE_FIREBASE_API_KEY in your .env file.");
}

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
