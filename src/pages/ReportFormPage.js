import React from 'react';
import { WithLogout } from '../hoc/withLogout';
import ReportForm from '../components/ReportForm/ReportForm';

const ReportFormPage = () => <WithLogout><ReportForm /></WithLogout>;

export default ReportFormPage;
