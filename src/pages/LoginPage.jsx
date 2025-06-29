import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';
const LoginPage = () => {
  const navegar = useNavigate();
  const [exibirSenha, setExibirSenha] = useState(false);
  const tratarLogin = e => {
    e.preventDefault();
    navegar('/dashboard');
  };
  return <>
      <Helmet>
        <title>Login - Gestão de Escalas</title>
      </Helmet>
      <div className="min-h-screen flex items-center justify-center p-4 bg-transparent">
        <div className="absolute inset-0 w-full h-full bg-cover bg-center" style={{
        backgroundImage: `url('https://storage.googleapis.com/hostinger-horizons-assets-prod/acec149e-3587-41bf-87f0-d137ca8402b4/b0a5e7fd50891554ff91cb07a1742657.png')`
      }}></div>
        <div className="absolute inset-0 w-full h-full bg-black opacity-50"></div>
        <motion.div initial={{
        opacity: 0,
        scale: 0.9
      }} animate={{
        opacity: 1,
        scale: 1
      }} transition={{
        duration: 0.5,
        ease: 'easeOut'
      }} className="relative w-full max-w-4xl flex rounded-2xl shadow-2xl overflow-hidden">
          <div className="w-1/3 bg-barueri-black p-8 flex-col items-center justify-center text-center hidden md:flex">
            <motion.div initial={{
            y: -20,
            opacity: 0
          }} animate={{
            y: 0,
            opacity: 1
          }} transition={{
            delay: 0.2
          }}>
              <img alt="Logo SEMURB" className="w-40 h-40 mx-auto mb-6" src="https://storage.googleapis.com/hostinger-horizons-assets-prod/acec149e-3587-41bf-87f0-d137ca8402b4/32ac977fbe5d38dcda1f0da4ca00be86.png" />
              <h1 className="text-4xl font-bold text-white">Escala
            </h1>
              <p className="text-4xl font-bold text-white">Semurb</p>
            </motion.div>
          </div>
          <div className="w-full md:w-2/3 bg-white p-12 flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-gray-800">Administrador</h2>
            <p className="text-xl font-semibold text-gray-500 mb-8">LOGIN</p>
            <form onSubmit={tratarLogin} className="space-y-6">
              <div>
                <label className="text-sm font-bold text-gray-600 block mb-2">Numero de Matrícula</label>
                <input type="text" className="w-full p-3 border-b-2 border-gray-300 focus:border-barueri-yellow focus:outline-none transition" />
              </div>
              <div className="relative">
                <label className="text-sm font-bold text-gray-600 block mb-2">Senha</label>
                <input type={exibirSenha ? 'text' : 'password'} className="w-full p-3 border-b-2 border-gray-300 focus:border-barueri-yellow focus:outline-none transition" />
                <button type="button" onClick={() => setExibirSenha(!exibirSenha)} className="absolute right-3 top-10 text-gray-500">
                  {exibirSenha ? <EyeOff /> : <Eye />}
                </button>
              </div>
              <motion.button whileHover={{
              scale: 1.02
            }} whileTap={{
              scale: 0.98
            }} type="submit" className="w-full py-3 mt-8 rounded-lg btn-brand-dark flex items-center justify-center gap-2 text-lg">
                ENTRAR <ArrowRight />
              </motion.button>
              <div className="text-center mt-4">
                <Link to="/esqueci-senha" className="text-sm text-gray-500 hover:text-barueri-yellow hover:underline">
                  ESQUECI MINHA SENHA
                </Link>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </>;
};
export default LoginPage;