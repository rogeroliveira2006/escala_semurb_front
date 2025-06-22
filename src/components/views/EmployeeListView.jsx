import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Search } from 'lucide-react';
import EmployeeTable from '@/components/employee/EmployeeTable';

const EmployeeListView = ({
  employees,
  searchTerm,
  onSearchChange,
  onAddEmployeeClick,
  onNotifyPendency,
  onEmployeeClick
}) => {
  return (
    <motion.div
      key="employee-list"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Administração</h1>
        
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onAddEmployeeClick}
            className="btn-success text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2"
          >
            <Plus size={20} />
            Adicionar Funcionário
          </motion.button>
          
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Buscar funcionário..."
              value={searchTerm}
              onChange={onSearchChange}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onNotifyPendency}
            className="btn-warning text-white px-6 py-3 rounded-lg font-semibold"
          >
            Notificar Pendência
          </motion.button>
        </div>

        <EmployeeTable employees={employees} onEmployeeClick={onEmployeeClick} />
      </div>
    </motion.div>
  );
};

export default EmployeeListView;