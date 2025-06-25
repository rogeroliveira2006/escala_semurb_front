import React from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

const EmployeeRow = ({ funcionario, aoClicarFuncionario, indice }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: indice * 0.1 }}
      onClick={() => aoClicarFuncionario(funcionario)}
      className="table-row-hover cursor-pointer border-b border-gray-100 dark:border-gray-800 last:border-b-0 transition-colors duration-200"
    >
      <div className="grid grid-cols-5 gap-4 items-center p-4">
        <div className="font-semibold text-barueri-blue dark:text-barueri-yellow">{funcionario.matricula}</div>
        <div className="font-medium text-gray-800 dark:text-gray-200">{funcionario.nome}</div>
        <div className="text-gray-600 dark:text-gray-400">{funcionario.escala}</div>
        <div className="text-gray-600 dark:text-gray-400">{funcionario.horario}</div>
        <div>
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium text-white ${
            funcionario.status === 'ativo' ? 'status-active' : 'status-inactive'
          }`}>
            {funcionario.status === 'ativo' ? <Check size={16} className="mr-1" /> : <X size={16} className="mr-1" />}
            {funcionario.status === 'ativo' ? 'Ativo' : 'Inativo'}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default EmployeeRow;