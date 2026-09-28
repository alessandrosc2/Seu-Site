import {StrictMode, useEffect, useState} from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import App from './App.tsx';
import Login from './Login.tsx';
import DashboardApp from './dashboard-app/App.tsx';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './lib/firebase';
import './index.css';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div className="min-h-screen bg-[#050814] flex items-center justify-center"><div className="w-8 h-8 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin"></div></div>;
  }

  return user ? <>{children}</> : <Navigate to="/login" replace />;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard/*" element={
          <PrivateRoute>
            <DashboardApp />
          </PrivateRoute>
        } />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
