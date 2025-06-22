import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Home, Bell, Menu, User, Power, Settings } from 'lucide-react';
import DeactivateEmployeeModal from '@/components/modals/DeactivateEmployeeModal';
import NotificationsModal from '@/components/modals/NotificationsModal';

const getTitle = (pathname) => {
  if (pathname.startsWith('/funcionario')) return 'Perfil do Funcionário';
  if (pathname.startsWith('/configuracoes')) return 'Configurações';
  if (pathname.startsWith('/administracao')) return 'Administração';
  if (pathname.startsWith('/dashboard')) return 'Bem Vindo(a), Rogério!';
  return 'Secretaria de MOBILIDADE URBANA';
};

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuAberto, setMenuAberto] = useState(false);
  const [showDeactivateModal, setShowDeactivateModal] = useState(false);
  const [showNotificationsModal, setShowNotificationsModal] = useState(false);

  const handleBack = () => {
    if (location.pathname === '/dashboard') {
      navigate('/login');
    } else if (location.pathname !== '/login') {
       navigate(-1)
    }
  };

  const handleDeactivateClick = () => {
    setShowDeactivateModal(true);
    setMenuAberto(false);
  };

  const menuItems = [
    { label: 'Meu Perfil', icon: User, path: '/funcionario/23167' },
    { label: 'Desligar Funcionário', icon: Power, action: handleDeactivateClick },
    { label: 'Configurações', icon: Settings, path: '/configuracoes' },
  ];

  const pageTitle = getTitle(location.pathname);

  return (
    <>
      <DeactivateEmployeeModal show={showDeactivateModal} onClose={() => setShowDeactivateModal(false)} />
      <NotificationsModal show={showNotificationsModal} onClose={() => setShowNotificationsModal(false)} />
      <header className="main-header shadow-lg sticky top-0 z-40">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleBack}
                className="hover:text-white transition-colors"
              >
                <ArrowLeft size={24} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => navigate('/dashboard')}
                className="hover:text-white transition-colors"
              >
                <Home size={24} />
              </motion.button>
              <div>
                <h1 className="text-lg md:text-xl font-bold uppercase tracking-wider">{pageTitle}</h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 md:space-x-4">
              <div className="hidden md:block">
                <img  alt="Logo Prefeitura de Barueri" className="h-12 w-auto" src="https://storage.googleapis.com/hostinger-horizons-assets-prod/acec149e-3587-41bf-87f0-d137ca8402b4/a3783b95683b963d785727eb0b68e7b8.png" />
              </div>
              <motion.button
                whileHover={{ scale: 1.1, rotate: [0, 15, -15, 15, 0] }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowNotificationsModal(true)}
                className="hover:text-white transition-colors"
              >
                <Bell size={24} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setMenuAberto(!menuAberto)}
                className="hover:text-white transition-colors"
              >
                <Menu size={24} />
              </motion.button>
            </div>
          </div>
        </div>
        <AnimatePresence>
          {menuAberto && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute right-4 mt-2 w-64 bg-gray-900 text-white rounded-lg shadow-2xl p-4 z-50 border border-yellow-500/20"
            >
              <ul className="space-y-2">
                {menuItems.map((item, index) => (
                  <li key={index}>
                    <Link
                      to={item.path || '#'}
                      onClick={(e) => {
                        if (item.action) {
                          e.preventDefault();
                          item.action();
                        } else {
                          setMenuAberto(false);
                        }
                      }}
                      className="flex items-center space-x-3 p-3 rounded-md hover:bg-barueri-yellow hover:text-barueri-black transition-colors"
                    >
                      <item.icon size={20} />
                      <span>{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Header;