import React from 'react';
import { WithLogout } from '../hoc/withLogout';
import { ProfileCalendar } from '../../src/components/ProfileCalendar/ProfileCalendar';

const ProfileCalendarPage = () => {
    return <WithLogout><ProfileCalendar/></WithLogout>;
};

export default ProfileCalendarPage;
