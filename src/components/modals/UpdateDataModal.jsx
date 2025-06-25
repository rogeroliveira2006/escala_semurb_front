import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, KeyRound, ArrowRight } from 'lucide-react';
import ConfirmationModal from '@/components/modals/ConfirmationModal';
import EmailVerificationModal from '@/components/modals/EmailVerificationModal';

const UpdateDataModal = ({ exibir, aoFechar, aoConfirmar, funcionario }) => {
  const [exibirConfirmacao, setExibirConfirmacao] = useState(false);
  const [exibirVerificacaoEmail, setExibirVerificacaoEmail] = useState(false);
  const [dadosFormulario, setDadosFormulario] = useState({
    email: funcionario?.email || '',
    senha: '',
  });

  const tratarMudanca = (e) => {
    const { name, value } = e.target;
    setDadosFormulario(prev => ({ ...prev, [name]: value }));
  };

  const tratarAtualizacao = (e) => {
    e.preventDefault();
    setExibirConfirmacao(true);
  };
  
  const tratarConfirmacaoAtualizacao = () => {
    setExibirConfirmacao(false);
    if(dadosFormulario.email !== funcionario.email) {
      setExibirVerificacaoEmail(true);
    } else {
      aoConfirmar(dadosFormulario);
      aoFechar();
    }
  };

  const tratarConfirmacaoEmail = () => {
    setExibirVerificacaoEmail(false);
    aoConfirmar(dadosFormulario);
    aoFechar();
  };

  return (
    <>
      <ConfirmationModal
        exibir={exibirConfirmacao}
        aoFechar={() => setExibirConfirmacao(false)}
        aoConfirmar={tratarConfirmacaoAtualizacao}
        titulo="Confirmar Alterações"
        descricao="Por favor, insira a senha de administrador para confirmar as alterações nos dados do funcionário."
      />
      <EmailVerificationModal
        exibir={exibirVerificacaoEmail}
        aoFechar={() => setExibirVerificacaoEmail(false)}
        aoConfirmar={tratarConfirmacaoEmail}
      />
      <AnimatePresence>
        {exibir && !exibirConfirmacao && !exibirVerificacaoEmail && (
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
              
              <h3 className="text-3xl font-extrabold text-barueri-yellow text-center mb-2 uppercase">
                Redefinir
              </h3>
               <p className="text-center text-gray-500 dark:text-gray-300 mb-6 font-semibold">Atualize os dados do funcionário</p>
              
              <form onSubmit={tratarAtualizacao} className="space-y-5">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={dadosFormulario.email}
                    onChange={tratarMudanca}
                    placeholder="EMAIL"
                    className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-700 border-2 border-barueri-yellow rounded-lg focus:ring-2 focus:ring-barueri-yellow focus:outline-none placeholder:text-gray-500 placeholder:font-semibold"
                  />
                </div>
                <div className="relative">
                  <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="password"
                    name="senha"
                    value={dadosFormulario.senha}
                    onChange={tratarMudanca}
                    placeholder="NOVA SENHA (OPCIONAL)"
                    className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-700 border-2 border-barueri-yellow rounded-lg focus:ring-2 focus:ring-barueri-yellow focus:outline-none placeholder:text-gray-500 placeholder:font-semibold"
                  />
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="w-full btn-brand-yellow text-lg py-3 rounded-lg font-bold flex items-center justify-center gap-2 shadow-lg"
                >
                  ENVIAR <ArrowRight />
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default UpdateDataModal;