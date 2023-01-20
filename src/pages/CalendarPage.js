import React from 'react';
import { useNavigate } from 'react-router-dom';
import { WithLogout } from '../HOC/withLogout';
import Calendar from '../components/Calendar/Calendar';

const CalendarPage = () => {

  return <WithLogout><Calendar onSelect={} /></WithLogout>;
};

export default CalendarPage;
