import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useToast } from '@/components/ui/use-toast';
import { dadosFuncionarios as todosFuncionarios } from '@/data/mockData';

import EmployeeListView from '@/components/views/EmployeeListView';
import AddEmployeeModal from '@/components/modals/AddEmployeeModal';
import NotifyPendingModal from '@/components/modals/NotifyPendingModal';

const AdminPage = () => {
    const navegar = useNavigate();
    const { toast } = useToast();
    const [termoBusca, setTermoBusca] = useState('');
    const [exibirModalAdicionar, setExibirModalAdicionar] = useState(false);
    const [exibirModalNotificar, setExibirModalNotificar] = useState(false);

    const funcionariosFiltrados = useMemo(() => {
        if (!termoBusca) {
            return todosFuncionarios;
        }
        return todosFuncionarios.filter(f =>
            f.nome.toLowerCase().includes(termoBusca.toLowerCase()) ||
            f.matricula.includes(termoBusca)
        );
    }, [termoBusca]);

    const tratarAdicionarFuncionario = () => {
        setExibirModalAdicionar(false);
        toast({
            title: "✅ Sucesso!",
            description: "Novo funcionário adicionado.",
        });
    };

    const tratarNotificarPendencia = () => {
        setExibirModalNotificar(true);
    };

    const tratarCliqueFuncionario = (funcionario) => {
        navegar(`/funcionario/${funcionario.id}`);
    };

    return (
        <>
            <Helmet>
                <title>Administração - Gestão de Escalas</title>
                <meta name="description" content="Gerencie funcionários e setores da SEMURB." />
            </Helmet>

            <AddEmployeeModal
                exibir={exibirModalAdicionar}
                aoFechar={() => setExibirModalAdicionar(false)}
                aoConfirmar={tratarAdicionarFuncionario}
            />

            <NotifyPendingModal
                exibir={exibirModalNotificar}
                aoFechar={() => setExibirModalNotificar(false)}
            />

            <EmployeeListView
                funcionarios={funcionariosFiltrados}
                termoBusca={termoBusca}
                aoMudarBusca={(e) => setTermoBusca(e.target.value)}
                aoClicarAdicionarFuncionario={() => setExibirModalAdicionar(true)}
                aoNotificarPendencia={tratarNotificarPendencia}
                aoClicarFuncionario={tratarCliqueFuncionario}
            />
        </>
    );
};

export default AdminPage;