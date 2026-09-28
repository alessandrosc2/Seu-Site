import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCB1o0ELSMY00I5qdquHT1i1UTWZOQOLAg",
  authDomain: "site-unico.firebaseapp.com",
  projectId: "site-unico",
  storageBucket: "site-unico.firebasestorage.app",
  messagingSenderId: "308395582350",
  appId: "1:308395582350:web:1fc1075ced51253e35badf",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

async function createTestUser() {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, "teste@seusite.com", "123456");
    console.log("✅ Usuário criado com sucesso:", userCredential.user.email);
    process.exit(0);
  } catch (error: any) {
    if (error.code === 'auth/email-already-in-use') {
      console.log("✅ O usuário teste@seusite.com já existe. Pode usá-lo para testes!");
      process.exit(0);
    } else {
      console.error("❌ Erro ao criar usuário:", error.message);
      process.exit(1);
    }
  }
}

createTestUser();
