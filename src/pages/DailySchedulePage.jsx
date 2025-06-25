import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { dadosFuncionarios } from '@/data/mockData';
import EmployeeTable from '@/components/employee/EmployeeTable';

const DailySchedulePage = () => {
    const { data } = useParams();
    const navegar = useNavigate();

    const dataFormatada = new Date(data).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        timeZone: 'UTC'
    });

    // Simulação: filtra funcionários que trabalham neste dia
    const funcionariosDoDia = dadosFuncionarios.filter(f => f.id % 2 !== 0 && f.status === 'ativo');

    const tratarCliqueFuncionario = (funcionario) => {
        navegar(`/funcionario/${funcionario.id}`);
    };

    return (
        <>
            <Helmet><title>Escala do Dia {dataFormatada}</title></Helmet>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="mb-6">
                    <h1 className="text-3xl font-bold">Escala do Dia</h1>
                    <p className="text-xl text-barueri-yellow font-semibold">{dataFormatada}</p>
                </div>

                <EmployeeTable 
                    funcionarios={funcionariosDoDia} 
                    aoClicarFuncionario={tratarCliqueFuncionario} 
                />
            </motion.div>
        </>
    );
};

export default DailySchedulePage;