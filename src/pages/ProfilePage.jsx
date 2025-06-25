import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { useToast } from '@/components/ui/use-toast';
import { dadosFuncionarios } from '@/data/mockData';
import NotFoundPage from '@/pages/NotFoundPage';
import NewScheduleModal from '@/components/modals/NewScheduleModal';
import UpdateDataModal from '@/components/modals/UpdateDataModal';
import EmployeeProfileView from '@/components/views/EmployeeProfileView';

const ProfilePage = () => {
    const { id } = useParams();
    const navegar = useNavigate();
    const { toast } = useToast();
    const funcionario = dadosFuncionarios.find(e => e.id.toString() === id);
    const [exibirModalNovaEscala, setExibirModalNovaEscala] = useState(false);
    const [exibirModalAtualizarDados, setExibirModalAtualizarDados] = useState(false);

    if (!funcionario) {
        return <NotFoundPage />;
    }
    
    const tratarConfirmacaoEscala = () => {
        toast({
            title: "✅ Sucesso!",
            description: "Nova escala criada com sucesso (simulação).",
        });
    };

    const tratarConfirmacaoAtualizacao = (dados) => {
        toast({
            title: "✅ Sucesso!",
            description: "Dados do funcionário atualizados (simulação).",
        });
        console.log("Atualizando com os dados:", dados);
    };

    return (
        <>
            <Helmet><title>{`Perfil de ${funcionario.nome} - Escala Barueri`}</title></Helmet>
            <AnimatePresence>
                <NewScheduleModal
                    exibir={exibirModalNovaEscala}
                    aoFechar={() => setExibirModalNovaEscala(false)}
                    aoConfirmar={tratarConfirmacaoEscala}
                />
                <UpdateDataModal
                    exibir={exibirModalAtualizarDados}
                    aoFechar={() => setExibirModalAtualizarDados(false)}
                    aoConfirmar={tratarConfirmacaoAtualizacao}
                    funcionario={funcionario}
                />
            </AnimatePresence>

            <EmployeeProfileView 
              funcionario={funcionario}
              emAtualizar={() => setExibirModalAtualizarDados(true)}
              emNovaEscala={() => setExibirModalNovaEscala(true)}
            />
        </>
    );
};

export default ProfilePage;