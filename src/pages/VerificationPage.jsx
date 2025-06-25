import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { useToast } from '@/components/ui/use-toast';

const VerificationPage = () => {
  const navegar = useNavigate();
  const { toast } = useToast();

  const tratarVerificacao = (e) => {
    e.preventDefault();
    toast({
      title: "✅ Verificado!",
      description: "Sua senha foi redefinida. Por favor, faça o login novamente.",
    });
    navegar('/login');
  };

  return (
    <>
      <Helmet>
        <title>Código de Verificação - Gestão de Escalas</title>
      </Helmet>
      <div className="min-h-screen flex items-center justify-center p-4 bg-transparent">
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center" 
          style={{ backgroundImage: `url('https://storage.googleapis.com/hostinger-horizons-assets-prod/acec149e-3587-41bf-87f0-d137ca8402b4/b0a5e7fd50891554ff91cb07a1742657.png')` }}
        ></div>
        <div className="absolute inset-0 w-full h-full bg-black opacity-50"></div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="relative w-full max-w-md flex flex-col rounded-2xl shadow-2xl overflow-hidden bg-barueri-dark-gray text-white p-12"
        >
          <div className="text-center">
              <img  alt="Logo SEMURB" className="w-32 h-32 mx-auto mb-6" src="https://storage.googleapis.com/hostinger-horizons-assets-prod/acec149e-3587-41bf-87f0-d137ca8402b4/32ac977fbe5d38dcda1f0da4ca00be86.png" />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-center">CÓDIGO DE VERIFICAÇÃO</h2>
            <p className="text-gray-400 mb-8 text-center">Insira o código de 4 dígitos enviado.</p>
            <form onSubmit={tratarVerificacao} className="space-y-6">
              <div className="flex justify-center space-x-2 md:space-x-4">
                {[...Array(4)].map((_, i) => (
                  <input
                    key={i}
                    type="text"
                    maxLength="1"
                    className="w-16 h-16 text-center text-3xl font-semibold border-b-4 border-gray-600 focus:border-barueri-yellow bg-transparent outline-none transition"
                  />
                ))}
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-3 mt-8 rounded-lg btn-brand-yellow text-lg shadow-lg"
              >
                VERIFICAR
              </motion.button>
              <div className="text-center mt-4">
                <button type="button" className="text-sm text-gray-500 hover:text-barueri-yellow hover:underline">
                  Reenviar código
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default VerificationPage;