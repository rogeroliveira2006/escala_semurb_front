import React from 'react';
import { motion } from 'framer-motion';
import ProfileCard from '@/components/employee/ProfileCard';
import Calendar from '@/components/calendar/Calendar';

const EmployeeProfileView = ({
  employee,
  calendarData,
  onUpdate,
  onDeactivate,
  onNewScale
}) => {
  return (
    <motion.div
      key="employee-profile"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-8"
    >
      <ProfileCard
        employee={employee}
        onUpdate={onUpdate}
        onDeactivate={onDeactivate}
      />
      <Calendar
        calendarData={calendarData}
        onNewScale={onNewScale}
      />
    </motion.div>
  );
};

export default EmployeeProfileView;