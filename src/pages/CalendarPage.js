import React from 'react';
import { useNavigate } from 'react-router-dom';
import { WithLogout } from '../hoc/withLogout';
import Calendar from '../components/Calendar/Calendar';

const CalendarPage = () => {
  const navigate = useNavigate();
  return <WithLogout><Calendar onSelect={() => { navigate('/report/0') }} /></WithLogout>;
};

export default CalendarPage;
