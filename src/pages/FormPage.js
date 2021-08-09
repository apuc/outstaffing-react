import React from 'react';
import { WithLogout } from '../hoc/withLogout';
import Form from '../components/Form/Form';

const FormPage = () => <WithLogout><Form /></WithLogout>;

export default FormPage;
