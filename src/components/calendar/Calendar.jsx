import React from 'react';
import { motion } from 'framer-motion';

const Calendar = ({ calendarData, onNewScale }) => {
  const { currentMonth, days } = calendarData;

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="flex items-center justify-between mb-6">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="text-gray-400 hover:text-gray-600"
        >
          ←
        </motion.button>
        <h3 className="text-xl font-bold text-green-600">{currentMonth}</h3>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="text-gray-400 hover:text-gray-600"
        >
          →
        </motion.button>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-4">
        {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(day => (
          <div key={day} className="text-center font-semibold text-gray-600 py-2">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {days.map((dayData, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.1 }}
            className={`calendar-day text-center py-3 rounded-lg cursor-pointer font-medium ${
              dayData.type === 'work' ? 'calendar-work' :
              dayData.type === 'holiday' ? 'calendar-holiday' :
              dayData.type === 'highlight' ? 'calendar-highlight' :
              'hover:bg-gray-100'
            }`}
          >
            {dayData.day}
          </motion.div>
        ))}
      </div>

      <div className="mt-6 space-y-3">
        <div className="flex items-center justify-between bg-blue-50 p-3 rounded-lg">
          <span className="font-medium">Folgas</span>
          <span className="text-blue-600 font-semibold">Dias: 5 - 12 - 19 - 26</span>
        </div>
        <div className="bg-yellow-50 p-3 rounded-lg">
          <div className="font-medium mb-1">Feriados</div>
          <div className="text-sm text-gray-600">Dias: 3 (Carnaval) - 4 (Carnaval) - 5 (Cinzas)</div>
        </div>
        <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
          <span className="font-medium">Trabalho</span>
          <span className="text-gray-600">Horário: 8h - 18h</span>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onNewScale}
        className="w-full mt-6 btn-success text-white py-3 rounded-lg font-semibold text-lg"
      >
        Nova Escala
      </motion.button>
    </div>
  );
};

export default Calendar;