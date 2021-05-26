import React from 'react';
import Outstaffing from './sections/Outstaffing';
import Description from './sections/Description';

const Home = () => {
  return (
    <div>
      {/* <h1>HomePage</h1>
      <ul>{renderCandidatesList}</ul> */}

      <Outstaffing />
      <Description />
    </div>
  );
};

export default Home;
