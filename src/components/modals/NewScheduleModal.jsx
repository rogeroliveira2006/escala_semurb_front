import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Check } from 'lucide-react';
import ConfirmationModal from '@/components/modals/ConfirmationModal';

const NewScheduleModal = ({ exibir, aoFechar, aoConfirmar }) => {
  const [exibirConfirmacao, setExibirConfirmacao] = useState(false);

  const tratarCriacao = (e) => {
    e.preventDefault();
    setExibirConfirmacao(true);
  };

  const tratarAcaoConfirmada = () => {
    setExibirConfirmacao(false);
    aoConfirmar();
    aoFechar();
  };

  return (
    <>
      <ConfirmationModal
        exibir={exibirConfirmacao}
        aoFechar={() => setExibirConfirmacao(false)}
        aoConfirmar={tratarAcaoConfirmada}
        titulo="Confirmar Nova Escala"
        descricao="Por favor, insira a senha de administrador para confirmar a criação da nova escala."
      />
      <AnimatePresence>
        {exibir && !exibirConfirmacao && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
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
              
              <h3 className="text-3xl font-extrabold text-barueri-yellow text-center mb-6 uppercase">
                Nova Escala
              </h3>
              
              <form onSubmit={tratarCriacao} className="space-y-6">
                 <div className="relative">
                    <select className="w-full px-4 py-3 bg-white dark:bg-gray-700 border-2 border-barueri-yellow rounded-lg focus:ring-2 focus:ring-barueri-yellow focus:outline-none appearance-none font-semibold text-gray-500 dark:text-gray-300">
                        <option>TIPO DE ALTERAÇÃO</option>
                        <option>Mudança de escala</option>
                        <option>Mudança no dia de folga</option>
                        <option>Mudança de horário</option>
                        <option>Mudança de setor</option>
                    </select>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Data de Início"
                    onFocus={(e) => e.target.type='date'}
                    onBlur={(e) => e.target.type='text'}
                    className="w-full px-4 py-3 bg-white dark:bg-gray-700 border-2 border-barueri-yellow rounded-lg focus:ring-2 focus:ring-barueri-yellow focus:outline-none placeholder:text-gray-500 placeholder:font-semibold"
                  />
                   <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
                 <div className="relative">
                    <select className="w-full px-4 py-3 bg-white dark:bg-gray-700 border-2 border-barueri-yellow rounded-lg focus:ring-2 focus:ring-barueri-yellow focus:outline-none appearance-none font-semibold text-gray-500 dark:text-gray-300">
                        <option>ESCALA</option>
                        <option>5X1</option>
                        <option>5X2</option>
                        <option>6X1</option>
                        <option>12X36</option>
                    </select>
                </div>
                 <div className="relative">
                    <p className="font-semibold mb-2 text-center text-gray-600 dark:text-gray-300">Horário</p>
                    <div className="flex gap-4">
                        <input
                          type="time"
                          className="w-full px-4 py-3 bg-white dark:bg-gray-700 border-2 border-barueri-yellow rounded-lg focus:ring-2 focus:ring-barueri-yellow focus:outline-none font-semibold"
                        />
                        <input
                          type="time"
                          className="w-full px-4 py-3 bg-white dark:bg-gray-700 border-2 border-barueri-yellow rounded-lg focus:ring-2 focus:ring-barueri-yellow focus:outline-none font-semibold"
                        />
                    </div>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="w-full btn-brand-yellow text-lg py-3 rounded-lg font-bold flex items-center justify-center gap-2 shadow-lg"
                >
                  CONFIRMAR <Check />
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NewScheduleModal;