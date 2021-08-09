import React from 'react';
import { WithLogout } from '../hoc/withLogout';
import Calendar from '../components/Calendar/Calendar';

const CalendarPage = () => {
  return <WithLogout><Calendar /></WithLogout>;
};

export default CalendarPage;
