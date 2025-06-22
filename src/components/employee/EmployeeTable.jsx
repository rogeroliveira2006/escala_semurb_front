import React from 'react';
import EmployeeRow from '@/components/employee/EmployeeRow';

const EmployeeTable = ({ employees, onEmployeeClick }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-gray-50 px-6 py-4 border-b">
        <div className="grid grid-cols-5 gap-4 font-semibold text-gray-700">
          <div>Nº de Matrícula</div>
          <div>Nome</div>
          <div>Escala</div>
          <div>Horário</div>
          <div>Status</div>
        </div>
      </div>
      
      <div className="divide-y divide-gray-100">
        {employees.map((employee, index) => (
          <EmployeeRow
            key={employee.id}
            employee={employee}
            onEmployeeClick={onEmployeeClick}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default EmployeeTable;