import React from 'react';
import { WithLogout } from '../hoc/withLogout';
import Home from '../components/Home/Home';

const HomePage = () => <WithLogout><Home /></WithLogout>;

export default HomePage;
