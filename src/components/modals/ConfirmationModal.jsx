import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck } from 'lucide-react';

const ConfirmationModal = ({ exibir, aoFechar, aoConfirmar, titulo, descricao }) => {
  const tratarConfirmacao = (e) => {
    e.preventDefault();
    aoConfirmar();
  };

  return (
    <AnimatePresence>
      {exibir && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
          onClick={aoFechar}
        >
          <motion.div
            initial={{ scale: 0.9, y: -50, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 50, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="bg-white dark:bg-barueri-dark-gray rounded-2xl p-8 max-w-md w-full shadow-2xl border-4 border-barueri-red relative"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.button
              whileHover={{ scale: 1.2, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={aoFechar}
              className="absolute -top-4 -right-4 bg-barueri-red text-white rounded-full p-1"
            >
              <X size={20} />
            </motion.button>
            
            <h3 className="text-3xl font-extrabold text-barueri-red text-center mb-4 uppercase">
              {titulo || 'Confirmação Necessária'}
            </h3>
            <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
              {descricao || 'Por favor, insira a senha para confirmar esta ação.'}
            </p>
            
            <form onSubmit={tratarConfirmacao} className="space-y-5">
              <input
                type="password"
                placeholder="SENHA DO ADMINISTRADOR"
                className="w-full px-4 py-3 bg-white dark:bg-gray-700 border-2 border-barueri-red rounded-lg focus:ring-2 focus:ring-barueri-red focus:outline-none placeholder:text-gray-500 placeholder:font-semibold"
              />
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full btn-brand-red text-lg py-3 rounded-lg font-bold flex items-center justify-center gap-2 shadow-lg"
              >
                CONFIRMAR <ShieldCheck />
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmationModal;