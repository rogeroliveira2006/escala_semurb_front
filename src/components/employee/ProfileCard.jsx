import React from 'react';
import { motion } from 'framer-motion';
import { Users } from 'lucide-react';

const ProfileCard = ({ funcionario, emAtualizar }) => {
  return (
    <div className="card-bg p-8 flex flex-col items-center text-center">
      <div className="w-40 h-40 border-8 border-gray-200 dark:border-gray-600 rounded-full flex items-center justify-center mb-6">
        <Users size={80} className="text-gray-400" />
      </div>
      <h2 className="text-2xl font-bold mb-4">{funcionario.nome}</h2>
      <div className="text-left space-y-2 text-gray-600 dark:text-gray-300">
        <p><strong>Nº de Matrícula:</strong> {funcionario.matricula}</p>
        <p><strong>Telefone:</strong> {funcionario.telefone}</p>
        <p><strong>Email:</strong> {funcionario.email}</p>
        <p><strong>Escala:</strong> {funcionario.escala}</p>
        <p><strong>Horário:</strong> {funcionario.horario}</p>
      </div>
      <div className="mt-auto w-full space-y-4 pt-8">
         <motion.button onClick={emAtualizar} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full py-3 rounded-lg btn-brand-green">
            ATUALIZAR
        </motion.button>
      </div>
    </div>
  );
};

export default ProfileCard;