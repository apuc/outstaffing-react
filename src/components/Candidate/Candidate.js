import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { candidatesList } from '../Home/sections/Description';

import classes from './Candidate.module.scss';

const Candidate = () => {
  const history = useHistory();

  const { id: candidateId } = useParams();

  const currentCandidate = candidatesList.find((el) => el.id === Number(candidateId));

  return (
    <div className={classes.wrapper}>
      <button style={{ margin: '60px' }} onClick={() => history.push('/')}>
        Home
      </button>
      <h1>
        Candidate name: <span>{currentCandidate.name}</span>
      </h1>
    </div>
  );
};

export default Candidate;
