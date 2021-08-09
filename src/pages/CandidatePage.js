import React from 'react';
import { WithLogout } from '../hoc/withLogout';
import Candidate from '../components/Candidate/Candidate';

const CandidatePage = () => <WithLogout><Candidate /></WithLogout>;

export default CandidatePage;
