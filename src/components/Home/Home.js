import React from 'react';
import Outstaffing from '../Outstaffing/Outstaffing';
import Description from '../Description/Description';

export const candidatesList = [
  { id: 1, name: 'Frontend' },
  { id: 2, name: 'Backend' },
];

const Home = () => {
  return (
    <>
      <Outstaffing />
      <Description arr={candidatesList} />
    </>
  );
};

export default Home;
