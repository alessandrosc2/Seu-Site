import {StrictMode, useEffect, useState} from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import App from './App.tsx';
import Login from './Login.tsx';
import DashboardApp from './dashboard-app/App.tsx';
import TermosDeUso from './pages/TermosDeUso.tsx';
import PoliticaDePrivacidade from './pages/PoliticaDePrivacidade.tsx';
import PoliticaDeReembolso from './pages/PoliticaDeReembolso.tsx';
import Success from './pages/Success.tsx';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './lib/firebase';
import './index.css';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!auth) {
      setError(true);
      setLoading(false);
      return;
    }
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div className="min-h-screen bg-[#050814] flex items-center justify-center"><div className="w-8 h-8 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin"></div></div>;
  }
  
  if (error) {
    return (
      <div className="min-h-screen bg-[#050814] flex items-center justify-center p-4">
        <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-lg text-center max-w-lg">
          <h2 className="text-red-400 font-bold mb-2">Erro de Configuração</h2>
          <p className="text-slate-300">As chaves do Firebase não estão configuradas na Vercel. Acesso bloqueado por segurança.</p>
        </div>
      </div>
    );
  }

  return user ? <>{children}</> : <Navigate to="/login" replace />;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/success" element={<Success />} />
        <Route path="/termos-de-uso" element={<TermosDeUso />} />
        <Route path="/politica-de-privacidade" element={<PoliticaDePrivacidade />} />
        <Route path="/politica-de-reembolso" element={<PoliticaDeReembolso />} />
        <Route path="/dashboard/*" element={
          <PrivateRoute>
            <DashboardApp />
          </PrivateRoute>
        } />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
