import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { User } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { employeesData } from '@/data/mockData';
import NotFoundPage from '@/pages/NotFoundPage';
import NewScheduleModal from '@/components/modals/NewScheduleModal';
import UpdateDataModal from '@/components/modals/UpdateDataModal';

const ProfilePage = () => {
    const { id } = useParams();
    const { toast } = useToast();
    const funcionario = employeesData.find(e => e.matricula === id);
    const [showNewScheduleModal, setShowNewScheduleModal] = useState(false);
    const [showUpdateDataModal, setShowUpdateDataModal] = useState(false);

    if (!funcionario) {
        return <NotFoundPage />;
    }
    
    const handleConfirmSchedule = () => {
        toast({
            title: "✅ Sucesso!",
            description: "Nova escala criada com sucesso (simulação).",
        });
    };

    const handleConfirmUpdate = (data) => {
        toast({
            title: "✅ Sucesso!",
            description: "Dados do funcionário atualizados (simulação).",
        });
        console.log("Updating with data:", data);
    };
    
    const diasCalendario = Array.from({ length: 31 }, (_, i) => i + 1);
    const diasTrabalho = [5, 11, 12, 18, 19, 25, 26];
    const feriados = [3, 4];

    return (
        <>
            <Helmet><title>{`Perfil de ${funcionario.nome} - Escala Barueri`}</title></Helmet>
            <AnimatePresence>
                <NewScheduleModal
                    show={showNewScheduleModal}
                    onClose={() => setShowNewScheduleModal(false)}
                    onConfirm={handleConfirmSchedule}
                />
                <UpdateDataModal
                    show={showUpdateDataModal}
                    onClose={() => setShowUpdateDataModal(false)}
                    onConfirm={handleConfirmUpdate}
                    employee={funcionario}
                />
            </AnimatePresence>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
                <div className="lg:col-span-1 card-bg p-8 flex flex-col items-center text-center">
                    <div className="w-40 h-40 border-8 border-gray-200 dark:border-gray-600 rounded-full flex items-center justify-center mb-6">
                        <User size={80} className="text-gray-400" />
                    </div>
                    <h2 className="text-2xl font-bold mb-4">{funcionario.nome}</h2>
                    <div className="text-left space-y-2 text-gray-600 dark:text-gray-300">
                        <p><strong>Nº de Matrícula:</strong> {funcionario.matricula}</p>
                        <p><strong>Telefone:</strong> {funcionario.telefone}</p>
                        <p><strong>Email:</strong> {funcionario.email}</p>
                        <p><strong>Escala:</strong> {funcionario.escala}</p>
                        <p><strong>Horário:</strong> {funcionario.horario}</p>
                    </div>
                    <div className="mt-auto w-full space-y-4 pt-8">
                         <motion.button onClick={() => setShowUpdateDataModal(true)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full py-3 rounded-lg btn-brand-green">
                            ATUALIZAR
                        </motion.button>
                    </div>
                </div>

                <div className="lg:col-span-2 card-bg p-8">
                     <div className="flex items-center justify-between mb-4">
                        <button className="text-2xl font-bold hover:text-barueri-yellow">‹</button>
                        <span className="text-lg font-bold text-barueri-green dark:text-barueri-yellow">Março 2025</span>
                        <button className="text-2xl font-bold hover:text-barueri-yellow">›</button>
                    </div>
                    <div className="grid grid-cols-7 text-center font-semibold text-gray-500 dark:text-gray-400 mb-2">
                        <span>Dom</span><span>Seg</span><span>Ter</span><span>Qua</span><span>Qui</span><span>Sex</span><span>Sáb</span>
                    </div>
                    <div className="grid grid-cols-7 text-center gap-2">
                        {diasCalendario.map(dia => {
                            const isTrabalho = diasTrabalho.includes(dia);
                            const isFeriado = feriados.includes(dia);
                            let bgClass = 'hover:bg-gray-100 dark:hover:bg-gray-700';
                            if (isTrabalho) bgClass = 'bg-barueri-blue text-white';
                            if (isFeriado) bgClass = 'bg-barueri-yellow text-gray-800';

                            return (
                                <div key={dia} className={`p-3 rounded-lg font-semibold cursor-pointer transition-colors ${bgClass}`}>{dia}</div>
                            )
                        })}
                    </div>
                    <div className="mt-6 space-y-3">
                         <div className="flex items-center justify-between bg-blue-100 dark:bg-blue-900/50 p-3 rounded-lg">
                            <span className="font-medium">Folgas</span>
                            <span className="text-blue-600 dark:text-blue-300 font-semibold">Dias: 5 - 12 - 19 - 26</span>
                        </div>
                        <div className="flex items-center justify-between bg-yellow-100 dark:bg-yellow-900/50 p-3 rounded-lg">
                            <span className="font-medium">Feriados</span>
                            <span className="text-yellow-800 dark:text-yellow-300 font-semibold">Dias: 3 (Carnaval) - 4 (Cinzas)</span>
                        </div>
                         <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                            <span className="font-medium">Trabalho</span>
                            <span className="font-semibold">Horário: 8h - 18h</span>
                        </div>
                    </div>
                    <motion.button onClick={() => setShowNewScheduleModal(true)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full mt-6 py-4 rounded-lg btn-brand-green text-lg">
                        Nova Escala
                    </motion.button>
                </div>
            </motion.div>
        </>
    );
};

export default ProfilePage;