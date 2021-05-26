import React from 'react';
import { NavLink } from 'react-router-dom';

// import PhotoBlock from './PhotoBlock';

// import { candidatesList } from '../Home/Home'

import classes from './Candidate.module.scss';

const Candidate = () => {
  //   const { id: candidateId } = useParams();
  //   const currentCandidate = candidatesList.find((el) => el.id === Number(candidateId));

  return (
    <div className={classes.wrapper}>
      <NavLink to="/">Home</NavLink>
      {/* <h1>
        Candidate name: <span>{currentCandidate.name}</span>
      </h1>
      <PhotoBlock /> */}
    </div>
  );
};

export default Candidate;
