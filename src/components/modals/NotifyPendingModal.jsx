import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Search } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { dadosFuncionarios } from '@/data/mockData';

const NotifyPendingModal = ({ exibir, aoFechar }) => {
    const { toast } = useToast();
    const [matricula, setMatricula] = useState('');
    const [funcionarioSelecionado, setFuncionarioSelecionado] = useState(null);
    const [tipoNotificacao, setTipoNotificacao] = useState('');

    const sugestoes = useMemo(() => {
        if (!matricula || funcionarioSelecionado) return [];
        return dadosFuncionarios.filter(f =>
            f.matricula.startsWith(matricula)
        );
    }, [matricula, funcionarioSelecionado]);

    const tratarMudancaMatricula = (e) => {
        setMatricula(e.target.value);
        if (funcionarioSelecionado) {
            setFuncionarioSelecionado(null);
        }
    };

    const tratarSelecionarFuncionario = (funcionario) => {
        setMatricula(funcionario.matricula);
        setFuncionarioSelecionado(funcionario);
    };

    const resetarFormulario = () => {
        setMatricula('');
        setFuncionarioSelecionado(null);
        setTipoNotificacao('');
    };

    const tratarFechar = () => {
        resetarFormulario();
        aoFechar();
    };

    const tratarEnvio = (e) => {
        e.preventDefault();
        if (!funcionarioSelecionado || !tipoNotificacao) {
            toast({
                title: "⚠️ Atenção",
                description: "Por favor, selecione um funcionário e o tipo de notificação.",
                variant: "destructive",
            });
            return;
        }

        toast({
            title: "✅ Sucesso!",
            description: `Notificação de "${tipoNotificacao}" enviada para ${funcionarioSelecionado.nome}.`,
        });

        tratarFechar();
    };

    return (
        <AnimatePresence>
            {exibir && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
                    onClick={tratarFechar}
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
                            onClick={tratarFechar}
                            className="absolute -top-4 -right-4 bg-barueri-orange text-white rounded-full p-1"
                        >
                            <X size={20} />
                        </motion.button>
                        
                        <h3 className="text-3xl font-extrabold text-barueri-orange text-center mb-6 uppercase">
                            Notificar Pendência
                        </h3>
                        
                        <form onSubmit={tratarEnvio} className="space-y-4">
                            <div className="relative">
                                <label htmlFor="matricula" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Matrícula do Funcionário</label>
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20}/>
                                    <input
                                        id="matricula"
                                        type="text"
                                        placeholder="Digite a matrícula..."
                                        value={matricula}
                                        onChange={tratarMudancaMatricula}
                                        className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-700 border-2 border-barueri-orange rounded-lg focus:ring-2 focus:ring-barueri-orange focus:outline-none"
                                        autoComplete="off"
                                    />
                                </div>
                                <AnimatePresence>
                                    {sugestoes.length > 0 && (
                                        <motion.ul 
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="absolute top-full mt-1 w-full bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-10 max-h-40 overflow-y-auto"
                                        >
                                            {sugestoes.map(func => (
                                                <li 
                                                    key={func.id} 
                                                    onClick={() => tratarSelecionarFuncionario(func)}
                                                    className="px-4 py-2 hover:bg-orange-100 dark:hover:bg-orange-900/50 cursor-pointer"
                                                >
                                                    {func.nome} - {func.matricula}
                                                </li>
                                            ))}
                                        </motion.ul>
                                    )}
                                </AnimatePresence>
                            </div>

                            <AnimatePresence>
                                {funcionarioSelecionado && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="space-y-4"
                                    >
                                        <div className="p-3 bg-green-100 dark:bg-green-900/50 rounded-lg text-center">
                                            <p className="font-bold text-green-800 dark:text-green-300">Funcionário: {funcionarioSelecionado.nome}</p>
                                        </div>
                                        <div>
                                            <label htmlFor="tipoNotificacao" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Causa da Notificação</label>
                                            <select
                                                id="tipoNotificacao"
                                                value={tipoNotificacao}
                                                onChange={(e) => setTipoNotificacao(e.target.value)}
                                                className="w-full px-4 py-3 bg-white dark:bg-gray-700 border-2 border-barueri-orange rounded-lg focus:ring-2 focus:ring-barueri-orange focus:outline-none appearance-none font-semibold text-gray-500 dark:text-gray-300"
                                            >
                                                <option value="" disabled>Selecione uma causa...</option>
                                                <option value="Mudança de escala">Mudança de escala</option>
                                                <option value="Mudança no dia de folga">Mudança no dia de folga</option>
                                                <option value="Mudança de horário">Mudança de horário</option>
                                            </select>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                            
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                type="submit"
                                className="w-full btn-brand-orange text-lg py-3 rounded-lg font-bold flex items-center justify-center gap-2 shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
                                disabled={!funcionarioSelecionado || !tipoNotificacao}
                            >
                                NOTIFICAR <Check />
                            </motion.button>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default NotifyPendingModal;