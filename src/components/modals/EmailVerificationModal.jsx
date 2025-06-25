import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MailCheck } from 'lucide-react';

const EmailVerificationModal = ({ exibir, aoFechar, aoConfirmar }) => {
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
            className="bg-white dark:bg-barueri-dark-gray rounded-2xl p-8 max-w-md w-full shadow-2xl border-4 border-barueri-yellow relative"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.button
              whileHover={{ scale: 1.2, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={aoFechar}
              className="absolute -top-4 -right-4 bg-barueri-yellow text-barueri-black rounded-full p-1"
            >
              <X size={20} />
            </motion.button>
            
            <h3 className="text-3xl font-extrabold text-barueri-yellow text-center mb-4 uppercase">
              Verificar Email
            </h3>
            <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
              Enviamos um código de 4 dígitos para o seu novo email. Insira-o abaixo para confirmar a alteração.
            </p>
            
            <form onSubmit={tratarConfirmacao} className="space-y-5">
              <div className="flex justify-center space-x-2 md:space-x-4">
                {[...Array(4)].map((_, i) => (
                  <input
                    key={i}
                    type="text"
                    maxLength="1"
                    className="w-16 h-16 text-center text-3xl font-semibold border-b-4 border-gray-300 dark:border-gray-600 focus:border-barueri-yellow bg-transparent outline-none transition"
                  />
                ))}
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full btn-brand-yellow text-lg py-3 rounded-lg font-bold flex items-center justify-center gap-2 shadow-lg"
              >
                VERIFICAR <MailCheck />
              </motion.button>
              
               <div className="text-center mt-4">
                <button type="button" className="text-sm text-gray-500 hover:text-barueri-yellow hover:underline">
                  Reenviar código
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EmailVerificationModal;