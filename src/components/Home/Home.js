import React from 'react';
import Outstaffing from './sections/Outstaffing';
import Description from './sections/Description';
import TagSelect from '../Select/Select';

export const candidatesList = [
  { id: 1, name: 'Frontend' },
  { id: 2, name: 'Backend' },
];

const Home = () => {
  return (
    <>
      <Outstaffing />
      <TagSelect />
      <Description arr={candidatesList} />
    </>
  );
};

export default Home;
