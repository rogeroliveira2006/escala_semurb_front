import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Power } from 'lucide-react';
import ConfirmationModal from '@/components/modals/ConfirmationModal';
import { useToast } from '@/components/ui/use-toast';
import { dadosFuncionarios } from '@/data/mockData';

const DeactivateEmployeeModal = ({ exibir, aoFechar }) => {
  const [exibirConfirmacao, setExibirConfirmacao] = useState(false);
  const [termoBusca, setTermoBusca] = useState('');
  const { toast } = useToast();

  const tratarDesativacao = (e) => {
    e.preventDefault();
    setExibirConfirmacao(true);
  };

  const tratarAcaoConfirmada = () => {
    setExibirConfirmacao(false);
    toast({
      title: "✅ Sucesso!",
      description: "Funcionário será desligado (funcionalidade em desenvolvimento).",
    });
    aoFechar();
  };

  const resultadosBusca = useMemo(() => {
    if (!termoBusca) return [];
    return dadosFuncionarios.filter(emp => emp.matricula.includes(termoBusca));
  }, [termoBusca]);

  return (
    <>
      <ConfirmationModal
        exibir={exibirConfirmacao}
        aoFechar={() => setExibirConfirmacao(false)}
        aoConfirmar={tratarAcaoConfirmada}
        titulo="Confirmar Desligamento"
        descricao="Por favor, insira a senha de administrador para confirmar o desligamento do funcionário."
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
              className="bg-white dark:bg-barueri-dark-gray rounded-2xl p-8 max-w-md w-full shadow-2xl border-4 border-barueri-orange relative"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.button
                whileHover={{ scale: 1.2, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={aoFechar}
                className="absolute -top-4 -right-4 bg-barueri-orange text-white rounded-full p-1"
              >
                <X size={20} />
              </motion.button>
              
              <h3 className="text-3xl font-extrabold text-barueri-orange text-center mb-6 uppercase">
                Desligar Funcionário
              </h3>
              
              <form onSubmit={tratarDesativacao} className="space-y-5">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="N° DE MATRÍCULA DO FUNCIONÁRIO"
                    value={termoBusca}
                    onChange={(e) => setTermoBusca(e.target.value)}
                    className="w-full px-4 py-3 bg-white dark:bg-gray-700 border-2 border-barueri-orange rounded-lg focus:ring-2 focus:ring-barueri-orange focus:outline-none placeholder:text-gray-500 placeholder:font-semibold"
                  />
                  <AnimatePresence>
                    {resultadosBusca.length > 0 && (
                      <motion.ul
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full mt-2 w-full bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-10 max-h-40 overflow-y-auto"
                      >
                        {resultadosBusca.map(emp => (
                          <li
                            key={emp.id}
                            onClick={() => {
                              setTermoBusca(emp.matricula);
                            }}
                            className="px-4 py-3 hover:bg-yellow-100 dark:hover:bg-yellow-900/50 cursor-pointer border-b border-gray-100 dark:border-gray-700 last:border-b-0"
                          >
                            <p className="font-semibold">{emp.nome}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Matrícula: {emp.matricula}</p>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="w-full btn-brand-orange text-lg py-3 rounded-lg font-bold flex items-center justify-center gap-2 shadow-lg"
                >
                  DESLIGAR <Power />
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default DeactivateEmployeeModal;