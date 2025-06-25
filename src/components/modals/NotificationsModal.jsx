import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckSquare, Square } from 'lucide-react';

const notificacoesIniciais = [
  { id: 1, nome: 'Roger da Silva Oliveira', data: '24/05/2025', status: 'lida', tipo: 'Mudança de escala' },
  { id: 2, nome: 'Vinícius Araujo de Jesus', data: '28/05/2025', status: 'a confirmar', tipo: 'Mudança de horário' },
  { id: 3, nome: 'Luan Gustavo da Silva', data: '15/06/2025', status: 'lida', tipo: 'Mudança de setor' },
  { id: 4, nome: 'Vanderleia Silva de Oliveira', data: '18/06/2025', status: 'a confirmar', tipo: 'Mudança no dia de folga' },
  { id: 5, nome: 'Mariana Costa', data: '20/06/2025', status: 'a confirmar', tipo: 'Mudança de escala' },
];

const NotificationsModal = ({ exibir, aoFechar }) => {
  const [notificacoes, setNotificacoes] = useState(notificacoesIniciais);

  const alternarStatus = (id) => {
    setNotificacoes(
      notificacoes.map((notif) =>
        notif.id === id ? { ...notif, status: notif.status === 'lida' ? 'a confirmar' : 'lida' } : notif
      )
    );
  };

  return (
    <AnimatePresence>
      {exibir && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-end z-50 p-4"
          onClick={aoFechar}
        >
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="bg-white dark:bg-barueri-dark-bg h-full w-full max-w-md shadow-2xl rounded-l-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 flex items-center justify-between border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-bold text-barueri-black dark:text-barueri-yellow">Notificações</h3>
              <motion.button
                whileHover={{ scale: 1.2, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={aoFechar}
                className="text-gray-500 hover:text-barueri-red"
              >
                <X size={24} />
              </motion.button>
            </div>
            
            <div className="flex-grow overflow-y-auto p-4 space-y-4">
              {notificacoes.map((notif, indice) => (
                <motion.div
                  key={notif.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: indice * 0.05 }}
                  className={`p-4 rounded-lg shadow-md border-l-4 ${
                    notif.status === 'lida'
                      ? 'bg-green-50 dark:bg-green-900/30 border-green-500'
                      : 'bg-yellow-50 dark:bg-yellow-900/30 border-barueri-yellow'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-bold text-gray-800 dark:text-white">{notif.nome}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Confirmou ciência: <span className="font-semibold">{notif.tipo}</span> em {notif.data}.
                      </p>
                       <p className={`mt-2 text-xs font-bold uppercase ${
                        notif.status === 'lida' ? 'text-green-600 dark:text-green-400' : 'text-yellow-600 dark:text-yellow-400'
                       }`}>
                        {notif.status}
                       </p>
                    </div>
                    <button onClick={() => alternarStatus(notif.id)} className="ml-4 flex-shrink-0">
                      {notif.status === 'lida' ? (
                        <CheckSquare size={20} className="text-green-500" />
                      ) : (
                        <Square size={20} className="text-gray-400 dark:text-gray-500" />
                      )}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NotificationsModal;