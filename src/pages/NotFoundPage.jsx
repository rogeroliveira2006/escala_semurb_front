import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';
import { Helmet } from 'react-helmet';

const NotFoundPage = () => {
    return (
        <>
            <Helmet><title>Página não encontrada</title></Helmet>
            <div className="min-h-screen flex flex-col items-center justify-center text-center p-4 bg-gray-50 dark:bg-barueri-dark-bg">
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, type: 'spring' }}
                >
                    <AlertTriangle className="mx-auto h-24 w-24 text-barueri-yellow" />
                    <h1 className="mt-8 text-5xl font-extrabold tracking-tight">404</h1>
                    <h2 className="mt-4 text-2xl font-semibold">Página Não Encontrada</h2>
                    <p className="mt-2 text-gray-500 dark:text-gray-400">Desculpe, a página que você está procurando não existe ou foi movida.</p>
                    <Link to="/dashboard">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="mt-8 px-8 py-3 rounded-lg btn-brand-yellow"
                        >
                            Voltar para o Início
                        </motion.button>
                    </Link>
                </motion.div>
            </div>
        </>
    );
};

export default NotFoundPage;