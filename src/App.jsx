import React from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { AnimatePresence } from 'framer-motion';

import { Toaster } from '@/components/ui/toaster';
import LoginPage from '@/pages/LoginPage';
import ForgotPasswordPage from '@/pages/ForgotPasswordPage';
import VerificationPage from '@/pages/VerificationPage';
import DashboardPage from '@/pages/DashboardPage';
import AdminPage from '@/pages/AdminPage';
import ProfilePage from '@/pages/ProfilePage';
import SettingsPage from '@/pages/SettingsPage';
import DailySchedulePage from '@/pages/DailySchedulePage';
import NotFoundPage from '@/pages/NotFoundPage';
import Layout from '@/components/layout/Layout';

function App() {
  const localizacao = useLocation();

  return (
    <>
      <Helmet>
        <title>Gestão de Escalas - SEMURB</title>
        <meta name="description" content="Sistema de gestão de escalas e funcionários da Secretaria de Mobilidade Urbana." />
      </Helmet>

      <AnimatePresence mode="wait">
        <Routes location={localizacao} key={localizacao.pathname}>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/esqueci-senha" element={<ForgotPasswordPage />} />
          <Route path="/verificacao" element={<VerificationPage />} />
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/administracao" element={<AdminPage />} />
            <Route path="/funcionario/:id" element={<ProfilePage />} />
            <Route path="/configuracoes" element={<SettingsPage />} />
            <Route path="/escala-diaria/:data" element={<DailySchedulePage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AnimatePresence>

      <Toaster />
    </>
  );
}

export default App;