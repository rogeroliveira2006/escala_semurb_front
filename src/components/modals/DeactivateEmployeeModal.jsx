import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Power } from 'lucide-react';
import ConfirmationModal from '@/components/modals/ConfirmationModal';
import { useToast } from '@/components/ui/use-toast';

const DeactivateEmployeeModal = ({ show, onClose }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const { toast } = useToast();

  const handleDeactivate = (e) => {
    e.preventDefault();
    setShowConfirm(true);
  };

  const handleConfirmAction = () => {
    setShowConfirm(false);
    toast({
      title: "✅ Sucesso!",
      description: "Funcionário será desligado (funcionalidade em desenvolvimento).",
    });
    onClose();
  };

  return (
    <>
      <ConfirmationModal
        show={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleConfirmAction}
        title="Confirmar Desligamento"
        description="Por favor, insira a senha de administrador para confirmar o desligamento do funcionário."
      />
      <AnimatePresence>
        {show && !showConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
            onClick={onClose}
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
                onClick={onClose}
                className="absolute -top-4 -right-4 bg-barueri-orange text-white rounded-full p-1"
              >
                <X size={20} />
              </motion.button>
              
              <h3 className="text-3xl font-extrabold text-barueri-orange text-center mb-6 uppercase">
                Desligar Funcionário
              </h3>
              
              <form onSubmit={handleDeactivate} className="space-y-5">
                <input
                  type="text"
                  placeholder="N° DE MATRÍCULA DO FUNCIONÁRIO"
                  className="w-full px-4 py-3 bg-white dark:bg-gray-700 border-2 border-barueri-orange rounded-lg focus:ring-2 focus:ring-barueri-orange focus:outline-none placeholder:text-gray-500 placeholder:font-semibold"
                />
                
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