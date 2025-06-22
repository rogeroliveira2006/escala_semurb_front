import React from 'react';
import { motion } from 'framer-motion';
import { Users } from 'lucide-react';

const ProfileCard = ({ employee, onUpdate, onDeactivate }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="text-center mb-8">
        <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
          <Users size={48} className="text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{employee.nome}</h2>
        <div className="space-y-2 text-gray-600">
          <p><strong>Nº de Matrícula:</strong> {employee.matricula}</p>
          <p><strong>Telefone:</strong> {employee.telefone}</p>
          <p><strong>Email:</strong> {employee.email}</p>
          <p><strong>Escala:</strong> {employee.escala}</p>
          <p><strong>Horário:</strong> {employee.horario}</p>
        </div>
      </div>
      
      <div className="space-y-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onUpdate}
          className="w-full btn-success text-white py-3 rounded-lg font-semibold"
        >
          ATUALIZAR
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onDeactivate}
          className="w-full btn-warning text-white py-3 rounded-lg font-semibold"
        >
          DESLIGAR FUNCIONÁRIO
        </motion.button>
      </div>
    </div>
  );
};

export default ProfileCard;