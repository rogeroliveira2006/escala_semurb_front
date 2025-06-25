import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ProfileCard from '@/components/employee/ProfileCard';
import Calendar from '@/components/calendar/Calendar';

const EmployeeProfileView = ({
  funcionario,
  emAtualizar,
  emNovaEscala
}) => {
  const [dataAtual, setDataAtual] = useState(new Date(2025, 2, 1)); // Março 2025

  const tratarMesAnterior = () => {
      setDataAtual(anterior => new Date(anterior.getFullYear(), anterior.getMonth() - 1, 1));
  };

  const tratarProximoMes = () => {
      setDataAtual(anterior => new Date(anterior.getFullYear(), anterior.getMonth() + 1, 1));
  };

  const gerarDadosCalendario = () => {
    const ano = dataAtual.getFullYear();
    const mes = dataAtual.getMonth();
    const diasNoMes = new Date(ano, mes + 1, 0).getDate();
    const primeiroDiaDoMes = new Date(ano, mes, 1).getDay();
    
    const dias = Array.from({ length: diasNoMes }, (_, i) => {
        const dia = i + 1;
        // Lógica de exemplo para tipo de dia
        if (dia % 7 === 3 || dia % 7 === 4) return { dia, tipo: 'feriado' };
        if (dia % 5 === 0) return { dia, tipo: 'trabalho' };
        return { dia, tipo: 'normal' };
    });

    return { dias, primeiroDiaDoMes, ano, mes };
  };

  return (
    <motion.div
      key="employee-profile"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 lg:grid-cols-3 gap-8"
    >
      <ProfileCard
        funcionario={funcionario}
        emAtualizar={emAtualizar}
      />
      <div className="lg:col-span-2">
        <Calendar
          dadosCalendario={gerarDadosCalendario()}
          emNovaEscala={emNovaEscala}
          dataAtual={dataAtual}
          tratarMesAnterior={tratarMesAnterior}
          tratarProximoMes={tratarProximoMes}
        />
      </div>
    </motion.div>
  );
};

export default EmployeeProfileView;