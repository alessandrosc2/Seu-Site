import { StrictMode, Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';

// 1. Static Import only for the main Landing Page (Critical Path)
import App from './App.tsx';

// 2. Lazy load secondary pages to drastically reduce Unused JavaScript (Lighthouse Fix)
const Login = lazy(() => import('./Login.tsx'));
const DashboardApp = lazy(() => import('./dashboard-app/App.tsx'));
const TermosDeUso = lazy(() => import('./pages/TermosDeUso.tsx'));
const PoliticaDePrivacidade = lazy(() => import('./pages/PoliticaDePrivacidade.tsx'));
const PoliticaDeReembolso = lazy(() => import('./pages/PoliticaDeReembolso.tsx'));
const Success = lazy(() => import('./pages/Success.tsx'));
const PrivateRoute = lazy(() => import('./components/auth/PrivateRoute.tsx'));

// 3. Landing Page V2 (experiência alternativa de venda) — rota isolada e lazy.
//    A landing original em "/" continua exatamente como está.
const LandingV2 = lazy(() => import('./components/v2/LandingV2.tsx'));

const PageLoader = () => (
  <div className="min-h-screen bg-[#070d1e] flex items-center justify-center">
    <div className="w-8 h-8 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin"></div>
  </div>
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/v2" element={<LandingV2 />} />
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
      </Suspense>
    </BrowserRouter>
  </StrictMode>,
);
