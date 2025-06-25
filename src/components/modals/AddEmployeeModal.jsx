import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';
import ConfirmationModal from '@/components/modals/ConfirmationModal';

const AddEmployeeModal = ({ exibir, aoFechar, aoConfirmar }) => {
  const [exibirConfirmacao, setExibirConfirmacao] = useState(false);

  const tratarAdicao = (e) => {
    e.preventDefault();
    setExibirConfirmacao(true);
  };

  const tratarAcaoConfirmada = () => {
    setExibirConfirmacao(false);
    aoConfirmar(); 
    aoFechar();
  };

  const setores = ['ADMINISTRAÇÃO', 'TRÂNSITO', 'RH', 'ACESSIBILIDADE'];
  const escalas = ['5X1', '5X2', '6X1', '12X36', '24X48'];

  return (
    <>
      <ConfirmationModal
        exibir={exibirConfirmacao}
        aoFechar={() => setExibirConfirmacao(false)}
        aoConfirmar={tratarAcaoConfirmada}
        titulo="Confirmar Adição"
        descricao="Por favor, insira a senha de administrador para confirmar a adição do novo funcionário."
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
                Adicionar Funcionário
              </h3>
              
              <form onSubmit={tratarAdicao} className="space-y-5">
                <input
                  type="text"
                  placeholder="NOME COMPLETO"
                  className="w-full px-4 py-3 bg-white dark:bg-gray-700 border-2 border-barueri-yellow rounded-lg focus:ring-2 focus:ring-barueri-yellow focus:outline-none placeholder:text-gray-500 placeholder:font-semibold"
                />
                <input
                  type="text"
                  placeholder="N° DE MATRÍCULA"
                  className="w-full px-4 py-3 bg-white dark:bg-gray-700 border-2 border-barueri-yellow rounded-lg focus:ring-2 focus:ring-barueri-yellow focus:outline-none placeholder:text-gray-500 placeholder:font-semibold"
                />
                <select className="w-full px-4 py-3 bg-white dark:bg-gray-700 border-2 border-barueri-yellow rounded-lg focus:ring-2 focus:ring-barueri-yellow focus:outline-none font-semibold text-gray-500">
                    <option value="">SELECIONE O SETOR</option>
                    {setores.map(setor => <option key={setor} value={setor}>{setor}</option>)}
                </select>
                <select className="w-full px-4 py-3 bg-white dark:bg-gray-700 border-2 border-barueri-yellow rounded-lg focus:ring-2 focus:ring-barueri-yellow focus:outline-none font-semibold text-gray-500">
                    <option value="">SELECIONE A ESCALA</option>
                    {escalas.map(escala => <option key={escala} value={escala}>{escala}</option>)}
                </select>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="w-full btn-brand-yellow text-lg py-3 rounded-lg font-bold flex items-center justify-center gap-2 shadow-lg"
                >
                  CONTINUAR <ArrowRight />
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AddEmployeeModal;