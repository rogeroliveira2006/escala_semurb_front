import React from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

const EmployeeRow = ({ employee, onEmployeeClick, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      onClick={() => onEmployeeClick(employee)}
      className="employee-row px-6 py-4 cursor-pointer"
    >
      <div className="grid grid-cols-5 gap-4 items-center">
        <div className="font-semibold text-blue-600">{employee.matricula}</div>
        <div className="font-medium text-gray-800">{employee.nome}</div>
        <div className="text-gray-600">{employee.escala}</div>
        <div className="text-gray-600">{employee.horario}</div>
        <div>
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium text-white ${
            employee.status === 'ativo' ? 'status-active' : 'status-inactive'
          }`}>
            {employee.status === 'ativo' ? <Check size={16} className="mr-1" /> : <X size={16} className="mr-1" />}
            {employee.status === 'ativo' ? 'Ativo' : 'Inativo'}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default EmployeeRow;