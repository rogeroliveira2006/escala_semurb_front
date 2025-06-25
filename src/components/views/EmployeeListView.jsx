import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Bell } from 'lucide-react';
import EmployeeTable from '@/components/employee/EmployeeTable';

const EmployeeListView = ({
  funcionarios,
  termoBusca,
  aoMudarBusca,
  aoClicarAdicionarFuncionario,
  aoNotificarPendencia,
  aoClicarFuncionario
}) => {
  return (
    <motion.div
      key="employee-list"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={aoClicarAdicionarFuncionario}
          className="btn-brand-green px-6 py-3 rounded-lg flex items-center gap-2 font-semibold"
        >
          <Plus size={20} />
          Adicionar Funcionário
        </motion.button>
        
        <div className="relative flex-1 max-w-lg">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Buscar funcionário..."
            value={termoBusca}
            onChange={aoMudarBusca}
            className="w-full pl-12 pr-4 py-3 rounded-lg bg-white dark:bg-barueri-dark-gray border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-barueri-yellow transition"
          />
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={aoNotificarPendencia}
          className="btn-brand-orange px-6 py-3 rounded-lg flex items-center gap-2 font-semibold"
        >
          <Bell size={20} />
          Notificar Pendência
        </motion.button>
      </div>

      <EmployeeTable funcionarios={funcionarios} aoClicarFuncionario={aoClicarFuncionario} />
    </motion.div>
  );
};

export default EmployeeListView;