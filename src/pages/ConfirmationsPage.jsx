import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';

const ConfirmationsPage = () => {
    const [filtrosAbertos, setFiltrosAbertos] = useState(true);
    const [filtros, setFiltros] = useState({ lidas: true, naoLidas: true });

    const confirmacoes = [
        { id: 1, nome: 'Roger da Silva Oliveira', data: '24/05/2007', lida: true },
        { id: 2, nome: 'Vinícius Araujo de Jesus', data: '28/05/2007', lida: false },
        { id: 3, nome: 'Luan Gustavo da Silva', data: '15/06/2007', lida: true },
        { id: 4, nome: 'Vanderleia Silva de Oliveira', data: '18/06/2007', lida: false },
    ];

    const toggleFiltro = (filtro) => {
        setFiltros(prev => ({ ...prev, [filtro]: !prev[filtro] }));
    };

    const confirmacoesFiltradas = confirmacoes.filter(c => {
        if (filtros.lidas && c.lida) return true;
        if (filtros.naoLidas && !c.lida) return true;
        return false;
    });

    return (
        <>
            <Helmet><title>Confirmações - Escala Barueri</title></Helmet>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
                <div className="md:col-span-1">
                    <div className="card-bg p-4 sticky top-24">
                        <button
                            onClick={() => setFiltrosAbertos(!filtrosAbertos)}
                            className="w-full flex justify-between items-center font-bold text-lg p-2"
                        >
                            Filtros
                            {filtrosAbertos ? <ChevronUp /> : <ChevronDown />}
                        </button>
                        <AnimatePresence>
                        {filtrosAbertos && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                            >
                                <div className="p-2 space-y-3 mt-2">
                                    <label className="flex items-center space-x-3 cursor-pointer">
                                        <input type="checkbox" checked={filtros.lidas} onChange={() => toggleFiltro('lidas')} className="h-5 w-5 rounded bg-gray-200 dark:bg-gray-600 border-none text-barueri-blue focus:ring-barueri-blue" />
                                        <span>Lidas</span>
                                    </label>
                                     <label className="flex items-center space-x-3 cursor-pointer">
                                        <input type="checkbox" checked={filtros.naoLidas} onChange={() => toggleFiltro('naoLidas')} className="h-5 w-5 rounded bg-gray-200 dark:bg-gray-600 border-none text-barueri-blue focus:ring-barueri-blue" />
                                        <span>Não Lidas</span>
                                    </label>
                                </div>
                            </motion.div>
                        )}
                        </AnimatePresence>
                    </div>
                </div>

                <div className="md:col-span-2 space-y-4">
                    {confirmacoesFiltradas.map((conf, index) => (
                        <motion.div
                            key={conf.id}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="card-bg p-6"
                        >
                            <div className="flex justify-between items-start">
                                <h3 className="font-bold text-lg text-barueri-green dark:text-barueri-yellow mb-2">Confirmação</h3>
                                {conf.lida && <Check className="text-green-500" />}
                            </div>
                            <p className="font-semibold">{conf.nome}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Declaro que estou ciente da minha escala de trabalho que foi criada em {conf.data}, tendo início em {conf.data}.
                            </p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </>
    );
};

export default ConfirmationsPage;