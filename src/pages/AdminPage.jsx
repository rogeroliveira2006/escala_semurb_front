import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Plus, Search, Bell, Check, X } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { employeesData } from '@/data/mockData';
import AddEmployeeModal from '@/components/modals/AddEmployeeModal';

const AdminPage = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [searchTerm, setSearchTerm] = useState('');
    const [funcionarios] = useState(employeesData);
    const [showAddModal, setShowAddModal] = useState(false);

    const filteredFuncionarios = funcionarios.filter(func =>
        func.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        func.matricula.includes(searchTerm)
    );

    const showNotifyToast = () => {
        toast({
            title: "🚧 Funcionalidade em desenvolvimento!",
            description: "Logo mais estará disponível para você. 🚀",
        });
    };

    const handleConfirmAdd = () => {
        toast({
            title: "✅ Sucesso!",
            description: "Funcionário adicionado com sucesso (simulação).",
        });
    };
    
    return (
        <>
            <Helmet><title>Administração - Escala Barueri</title></Helmet>
            <AnimatePresence>
              <AddEmployeeModal 
                show={showAddModal} 
                onClose={() => setShowAddModal(false)}
                onConfirm={handleConfirmAdd}
              />
            </AnimatePresence>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setShowAddModal(true)} className="btn-brand-green px-6 py-3 rounded-lg flex items-center gap-2 font-semibold">
                        <Plus size={20} /> Adicionar Funcionário
                    </motion.button>
                    
                    <div className="relative flex-1 max-w-lg">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Buscar funcionário..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 rounded-lg bg-white dark:bg-barueri-dark-gray border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-barueri-yellow transition"
                        />
                    </div>
                    
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={showNotifyToast} className="btn-brand-orange px-6 py-3 rounded-lg flex items-center gap-2 font-semibold">
                        <Bell size={20} /> Notificar Pendência
                    </motion.button>
                </div>

                <div className="card-bg overflow-x-auto rounded-xl">
                    <table className="w-full text-left">
                        <thead className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
                            <tr>
                                <th className="p-4 font-bold">Nº de Matrícula</th>
                                <th className="p-4 font-bold">Nome</th>
                                <th className="p-4 font-bold">Escala</th>
                                <th className="p-4 font-bold">Horário</th>
                                <th className="p-4 font-bold">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredFuncionarios.map((func) => (
                                <tr key={func.id} onClick={() => navigate(`/funcionario/${func.id}`)} className="table-row-hover cursor-pointer border-b border-gray-100 dark:border-gray-800 last:border-b-0 transition-colors duration-200">
                                    <td className="p-4 font-semibold text-barueri-blue dark:text-barueri-yellow">{func.matricula}</td>
                                    <td className="p-4">{func.nome}</td>
                                    <td className="p-4">{func.escala}</td>
                                    <td className="p-4">{func.horario}</td>
                                    <td className="p-4">
                                        <span className={`inline-flex items-center justify-center h-8 w-8 rounded-full text-white ${func.status === 'ativo' ? 'status-active' : 'status-inactive'}`}>
                                            {func.status === 'ativo' ? <Check size={16} /> : <X size={16} />}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </>
    );
};

export default AdminPage;