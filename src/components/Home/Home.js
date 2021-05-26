import React from 'react';
import Outstaffing from './sections/Outstaffing';
import Description from './sections/Description';
import Search from './sections/Search';

const Home = () => {
  return (
    <>
      <Outstaffing />
      <Search />
      <Description />
    </>
  );
};

export default Home;
