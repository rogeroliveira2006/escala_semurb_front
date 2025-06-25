import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Home, Bell, Menu, User, Power, Settings } from 'lucide-react';
import DeactivateEmployeeModal from '@/components/modals/DeactivateEmployeeModal';
import NotificationsModal from '@/components/modals/NotificationsModal';

const obterTitulo = (pathname) => {
  if (pathname.startsWith('/funcionario')) return 'Perfil do Funcionário';
  if (pathname.startsWith('/configuracoes')) return 'Configurações';
  if (pathname.startsWith('/administracao')) return 'Administração';
  if (pathname.startsWith('/escala-diaria')) return 'Escala do Dia';
  if (pathname.startsWith('/dashboard')) return 'Painel Principal';
  return 'Secretaria de MOBILIDADE URBANA';
};

const Header = () => {
  const localizacao = useLocation();
  const navegar = useNavigate();
  const [menuAberto, setMenuAberto] = useState(false);
  const [exibirModalDesativar, setExibirModalDesativar] = useState(false);
  const [exibirModalNotificacoes, setExibirModalNotificacoes] = useState(false);

  const tratarVoltar = () => {
    if (localizacao.pathname === '/dashboard') {
      navegar('/login');
    } else if (localizacao.pathname !== '/login') {
       navegar(-1)
    }
  };

  const tratarCliqueDesativar = () => {
    setExibirModalDesativar(true);
    setMenuAberto(false);
  };

  const itensMenu = [
    { rotulo: 'Meu Perfil', icone: User, caminho: '/funcionario/4' },
    { rotulo: 'Desligar Funcionário', icone: Power, acao: tratarCliqueDesativar },
    { rotulo: 'Configurações', icone: Settings, caminho: '/configuracoes' },
  ];

  const tituloPagina = obterTitulo(localizacao.pathname);

  return (
    <>
      <DeactivateEmployeeModal exibir={exibirModalDesativar} aoFechar={() => setExibirModalDesativar(false)} />
      <NotificationsModal exibir={exibirModalNotificacoes} aoFechar={() => setExibirModalNotificacoes(false)} />
      <header className="main-header shadow-lg sticky top-0 z-40">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={tratarVoltar}
                className="hover:text-white transition-colors"
              >
                <ArrowLeft size={24} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => navegar('/dashboard')}
                className="hover:text-white transition-colors"
              >
                <Home size={24} />
              </motion.button>
              <div>
                <h1 className="text-lg md:text-xl font-bold uppercase tracking-wider">{tituloPagina}</h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 md:space-x-4">
              <div className="hidden md:block">
                <img  alt="Logo SEMURB" className="h-12 w-auto" src="https://storage.googleapis.com/hostinger-horizons-assets-prod/acec149e-3587-41bf-87f0-d137ca8402b4/3dba7a1c66148621c0c69c9add880646.png" />
              </div>
              <motion.button
                whileHover={{ scale: 1.1, rotate: [0, 15, -15, 15, 0] }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setExibirModalNotificacoes(true)}
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
                {itensMenu.map((item, index) => (
                  <li key={index}>
                    <Link
                      to={item.caminho || '#'}
                      onClick={(e) => {
                        if (item.acao) {
                          e.preventDefault();
                          item.acao();
                        } else {
                          setMenuAberto(false);
                        }
                      }}
                      className="flex items-center space-x-3 p-3 rounded-md hover:bg-barueri-yellow hover:text-barueri-black transition-colors"
                    >
                      <item.icone size={20} />
                      <span>{item.rotulo}</span>
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