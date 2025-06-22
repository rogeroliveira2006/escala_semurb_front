import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { BarChart, Search, Plus, ArrowLeft, ArrowRight } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { employeesData } from '@/data/mockData';
import CreateSectorModal from '@/components/modals/CreateSectorModal';

const DashboardPage = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [currentDate, setCurrentDate] = useState(new Date(2025, 5, 1)); // June 2025
    const [searchTerm, setSearchTerm] = useState('');
    const [showCreateSectorModal, setShowCreateSectorModal] = useState(false);

    const handlePrevMonth = () => {
        setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
    };

    const monthName = currentDate.toLocaleString('pt-BR', { month: 'long' });
    const year = currentDate.getFullYear();
    const daysInMonth = new Date(year, currentDate.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, currentDate.getMonth(), 1).getDay();
    const diasCalendario = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    const setores = [
        { nome: 'ADMINISTRAÇÃO', cor: 'bg-green-500 dark:bg-green-600', path: '/administracao'},
        { nome: 'TRÂNSITO', cor: 'bg-blue-500 dark:bg-blue-600', path: '/confirmacoes'},
        { nome: 'RH', cor: 'bg-red-500 dark:bg-red-600', path: '/administracao' },
        { nome: 'ACESSIBILIDADE', cor: 'bg-orange-500 dark:bg-orange-600', path: '/administracao' },
    ];
    
    const dadosGrafico = [
        { escala: '5X1', funcionarios: 25 }, { escala: '5X2', funcionarios: 60 },
        { escala: '4X2', funcionarios: 45 }, { escala: '6X1', funcionarios: 20 },
        { escala: '12X36', funcionarios: 15 }, { escala: '24X48', funcionarios: 70 },
    ];

    const maxFuncionarios = Math.max(...dadosGrafico.map(d => d.funcionarios));

    const searchResults = useMemo(() => {
        if (!searchTerm) return [];
        return employeesData.filter(emp => emp.nome.toLowerCase().includes(searchTerm.toLowerCase()));
    }, [searchTerm]);

    const handleConfirmCreateSector = () => {
        toast({
            title: "✅ Sucesso!",
            description: "Novo setor criado com sucesso (simulação).",
        });
    };

    return (
        <>
            <Helmet><title>Dashboard - Escala Barueri</title></Helmet>
            <CreateSectorModal 
                show={showCreateSectorModal}
                onClose={() => setShowCreateSectorModal(false)}
                onConfirm={handleConfirmCreateSector}
            />
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
            >
                <div className="relative max-w-lg mx-auto">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input 
                        type="text" 
                        placeholder="Buscar funcionário..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-barueri-yellow transition"
                    />
                    <AnimatePresence>
                        {searchResults.length > 0 && (
                            <motion.ul 
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="absolute top-full mt-2 w-full bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-10 max-h-60 overflow-y-auto"
                            >
                                {searchResults.map(emp => (
                                    <li 
                                        key={emp.id} 
                                        onClick={() => navigate(`/funcionario/${emp.matricula}`)}
                                        className="px-4 py-3 hover:bg-yellow-100 dark:hover:bg-yellow-900/50 cursor-pointer border-b border-gray-100 dark:border-gray-700 last:border-b-0"
                                    >
                                        <p className="font-semibold">{emp.nome}</p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Setor: {setores[0].nome}</p>
                                    </li>
                                ))}
                            </motion.ul>
                        )}
                    </AnimatePresence>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 card-bg p-6">
                        <h2 className="text-xl font-bold mb-4 flex items-center"><BarChart className="mr-2 text-barueri-yellow" /> Funcionários por Escala</h2>
                        <div className="flex justify-around items-end h-64 pt-4 border-t border-gray-200 dark:border-gray-700">
                            {dadosGrafico.map(dado => (
                                <div key={dado.escala} className="flex flex-col items-center h-full justify-end">
                                    <motion.div
                                        className="w-10 bg-barueri-yellow rounded-t-lg"
                                        initial={{ height: 0 }}
                                        animate={{ height: `${(dado.funcionarios / maxFuncionarios) * 80}%` }}
                                        transition={{ duration: 0.8, ease: 'easeOut' }}
                                    >
                                      <span className="text-xs text-barueri-black font-bold relative -top-5 left-1/2 -translate-x-1/2">{dado.funcionarios}</span>
                                    </motion.div>
                                    <span className="mt-2 text-sm font-semibold">{dado.escala}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="card-bg p-6">
                        <h2 className="text-xl font-bold mb-4">Setores</h2>
                        <div className="grid grid-cols-2 gap-4">
                            {setores.map(setor => (
                                <motion.button
                                    key={setor.nome}
                                    onClick={() => navigate(setor.path)}
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`py-4 rounded-lg text-sm font-bold text-white shadow-md ${setor.cor}`}
                                >
                                    {setor.nome}
                                </motion.button>
                            ))}
                            <motion.button onClick={() => setShowCreateSectorModal(true)} whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }} className="py-4 rounded-lg btn-brand-yellow flex items-center justify-center shadow-md">
                                <Plus size={24} />
                            </motion.button>
                        </div>
                    </div>
                </div>

                <div className="card-bg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <motion.button onClick={handlePrevMonth} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"><ArrowLeft className="text-barueri-yellow" /></motion.button>
                      <h2 className="text-xl font-bold text-center capitalize">Consultar Datas: <span className="text-barueri-yellow">{monthName} {year}</span></h2>
                      <motion.button onClick={handleNextMonth} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"><ArrowRight className="text-barueri-yellow" /></motion.button>
                    </div>
                    <div className="grid grid-cols-7 text-center font-semibold text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700 pb-2">
                        <span>Dom</span><span>Seg</span><span>Ter</span><span>Qua</span><span>Qui</span><span>Sex</span><span>Sáb</span>
                    </div>
                    <div className="grid grid-cols-7 text-center mt-2 gap-1">
                        {Array.from({ length: firstDayOfMonth }, (_, i) => <div key={`empty-${i}`}></div>)}
                        {diasCalendario.map(dia => (
                            <div key={dia} className="p-2 rounded-full hover:bg-yellow-100 dark:hover:bg-yellow-900/50 cursor-pointer">{dia}</div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </>
    );
};

export default DashboardPage;