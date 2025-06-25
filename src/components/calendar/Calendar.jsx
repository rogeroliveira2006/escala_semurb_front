import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Calendar = ({ dadosCalendario, emNovaEscala, dataAtual, tratarMesAnterior, tratarProximoMes }) => {
  const navegar = useNavigate();
  const { dias, primeiroDiaDoMes, ano, mes } = dadosCalendario;

  const tratarCliqueDia = (dia) => {
    const dataSelecionada = new Date(ano, mes, dia);
    const dataFormatada = dataSelecionada.toISOString().split('T')[0];
    navegar(`/escala-diaria/${dataFormatada}`);
  };

  return (
    <div className="bg-white dark:bg-barueri-dark-gray rounded-xl shadow-lg p-8">
      <div className="flex items-center justify-between mb-6">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={tratarMesAnterior}
          className="text-gray-400 hover:text-gray-600 dark:hover:text-barueri-yellow"
        >
          ←
        </motion.button>
        <h3 className="text-xl font-bold text-green-600 dark:text-barueri-yellow capitalize">{dataAtual.toLocaleString('pt-BR', { month: 'long', year: 'numeric' })}</h3>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={tratarProximoMes}
          className="text-gray-400 hover:text-gray-600 dark:hover:text-barueri-yellow"
        >
          →
        </motion.button>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-4">
        {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(dia => (
          <div key={dia} className="text-center font-semibold text-gray-600 dark:text-gray-400 py-2">
            {dia}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {Array.from({ length: primeiroDiaDoMes }).map((_, i) => <div key={`empty-${i}`}></div>)}
        {dias.map((dadosDia, indice) => (
          <motion.div
            key={indice}
            whileHover={{ scale: 1.1 }}
            onClick={() => tratarCliqueDia(dadosDia.dia)}
            className={`calendar-day text-center py-3 rounded-lg cursor-pointer font-medium transition-colors ${
              dadosDia.tipo === 'trabalho' ? 'bg-barueri-blue text-white' :
              dadosDia.tipo === 'feriado' ? 'bg-barueri-yellow text-barueri-black' :
              'hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            {dadosDia.dia}
          </motion.div>
        ))}
      </div>

      <div className="mt-6 space-y-3">
        <div className="flex items-center justify-between bg-blue-50 dark:bg-blue-900/50 p-3 rounded-lg">
          <span className="font-medium">Folgas</span>
          <span className="text-blue-600 dark:text-blue-300 font-semibold">Dias: 5 - 12 - 19 - 26</span>
        </div>
        <div className="bg-yellow-50 dark:bg-yellow-900/50 p-3 rounded-lg">
          <div className="font-medium mb-1">Feriados</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Dias: 3 (Carnaval) - 4 (Carnaval) - 5 (Cinzas)</div>
        </div>
        <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
          <span className="font-medium">Trabalho</span>
          <span className="text-gray-600 dark:text-gray-300">Horário: 8h - 18h</span>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={emNovaEscala}
        className="w-full mt-6 btn-brand-green py-3 rounded-lg font-semibold text-lg"
      >
        Nova Escala
      </motion.button>
    </div>
  );
};

export default Calendar;