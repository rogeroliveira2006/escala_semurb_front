import React from 'react';
import EmployeeRow from '@/components/employee/EmployeeRow';

const EmployeeTable = ({ funcionarios, aoClicarFuncionario }) => {
  return (
    <div className="card-bg overflow-hidden">
      <div className="bg-gray-50 dark:bg-gray-900/50 p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-5 gap-4 font-bold text-gray-700 dark:text-gray-300">
          <div>Nº de Matrícula</div>
          <div>Nome</div>
          <div>Escala</div>
          <div>Horário</div>
          <div>Status</div>
        </div>
      </div>
      
      <div className="divide-y divide-gray-100 dark:divide-gray-800">
        {funcionarios.map((funcionario, indice) => (
          <EmployeeRow
            key={funcionario.id}
            funcionario={funcionario}
            aoClicarFuncionario={aoClicarFuncionario}
            indice={indice}
          />
        ))}
      </div>
    </div>
  );
};

export default EmployeeTable;