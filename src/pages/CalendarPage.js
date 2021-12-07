import React from 'react';
import { useHistory } from 'react-router';
import { WithLogout } from '../hoc/withLogout';
import Calendar from '../components/Calendar/Calendar';

const CalendarPage = () => {
  const history = useHistory();
  return <WithLogout><Calendar onSelect={() => { history.push('/report/0') }} /></WithLogout>;
};

export default CalendarPage;
