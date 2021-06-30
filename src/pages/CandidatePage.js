import React from 'react';

import Candidate from '../components/Candidate/Candidate';

const CandidatePage = ({ candidatesArr, getCandidateForCalendar }) => (
  <Candidate candidatesArr={candidatesArr} getCandidateForCalendar={getCandidateForCalendar} />
);

export default CandidatePage;
