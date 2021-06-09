import React, { useState, useEffect } from 'react';
import Outstaffing from '../Outstaffing/Outstaffing';
import Description from '../Description/Description';
import front from '../../images/front_end.png';
import back from '../../images/back_end.png';
import design from '../../images/design.png';

export const candidatesList = [
  {
    id: 1,
    name: 'Frontend',
    header: 'Фронтенд',
    img: front,
    tags: 'JavaScript · Html · Css · Vue.js · ReactJS · Angular · MobX',
  },

  {
    id: 2,
    name: 'Backend',
    header: 'Бэкенд',
    img: back,
    tags: 'Node.js · Express · Php · Ruby on Rails · Python · Wordpress · Java',
  },
  {
    id: 3,
    name: 'Design',
    header: 'Дизайн',
    img: design,
    tags: 'Figma · Avocode · PhotoShop · Xara · Pinegrow · Macaw · KompoZer',
  },
];

const tabsList = [
  {
    name: 'Frontend',
    img: front,
    text: '# Популярный стек',
    header: 'Фронтенд',
    tags: ['Vue.js', 'ReactJS', 'Angular', 'JavaScript', 'Html', 'Css', 'MobX'],
  },
  {
    name: 'Backend',
    img: back,
    text: '# Популярный стек',
    header: 'Бэкенд',
    tags: ['Node.js', 'Express', 'Php', 'Ruby on Rails', 'Python', 'Wordpress', ' Java'],
  },
  {
    name: 'Design',
    img: design,
    text: '# Популярный стек',
    header: 'Дизайн',
    tags: ['Figma', 'Avocode', 'PhotoShop', 'Xara', 'Pinegrow', 'Macaw', 'KompoZer'],
  },
];

const Home = () => {
  const [tabs, setTabs] = useState([]);
  const [candidates, setCandidates] = useState([]);

  const [selectedTab, setSelectedTab] = useState('');
  // const [active, setActive] = useState(false);

  useEffect(() => {
    setTabs(tabsList);
    setCandidates(candidatesList);
  }, []);

  const handleBlockClick = (name) => {
    setSelectedTab(name);
    // const screenWidth = window.screen.width;

    // if (screenWidth < 576) {
    //   setActive(true);
    // }
  };

  return (
    <>
      <Outstaffing onhandleTabBar={(name) => handleBlockClick(name)} selected={selectedTab} tabs={tabs} />
      <Description
        candidatesListArr={selectedTab ? candidates.filter((item) => item.name === selectedTab) : candidates}
      />
    </>
  );
};

export default Home;
