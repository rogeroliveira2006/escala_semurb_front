import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';

const VerificationPage = () => {
  const navigate = useNavigate();

  const handleVerification = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <>
      <Helmet>
        <title>Código de Verificação - Escala Barueri</title>
      </Helmet>
      <div className="min-h-screen flex items-center justify-center p-4 bg-gray-200">
        <div className="absolute inset-0 w-full h-full bg-cover bg-center" >
          <img  className="w-full h-full object-cover" alt="Blurred calendar background" src="https://images.unsplash.com/photo-1698847783664-1062207df8ae" />
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="relative w-full max-w-4xl flex rounded-2xl shadow-2xl overflow-hidden"
        >
          <div className="w-1/3 bg-barueri-black p-8 flex-col items-center justify-center text-center hidden md:flex">
             <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
              <img  alt="Logo SEMURB" className="w-40 h-40 mx-auto mb-6" src="https://storage.googleapis.com/hostinger-horizons-assets-prod/acec149e-3587-41bf-87f0-d137ca8402b4/32ac977fbe5d38dcda1f0da4ca00be86.png" />
              <h1 className="text-4xl font-bold text-white">Escala</h1>
              <p className="text-4xl font-bold text-white">Semurb</p>
            </motion.div>
          </div>
          <div className="w-full md:w-2/3 bg-white p-12 flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-gray-800">Administrador</h2>
            <p className="text-xl font-semibold text-gray-500 mb-8">CÓDIGO DE VERIFICAÇÃO</p>
            <form onSubmit={handleVerification} className="space-y-6">
              <div className="flex justify-center space-x-2 md:space-x-4">
                {[...Array(4)].map((_, i) => (
                  <input
                    key={i}
                    type="text"
                    maxLength="1"
                    className="w-16 h-16 text-center text-3xl font-semibold border-b-4 border-gray-300 focus:border-barueri-yellow outline-none transition"
                  />
                ))}
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-3 mt-8 rounded-lg btn-brand-dark text-lg shadow-lg"
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