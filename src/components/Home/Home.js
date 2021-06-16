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
  },
  {
    name: 'Backend',
    img: back,
    text: '# Популярный стек',
    header: 'Бэкенд',
  },
  {
    name: 'Design',
    img: design,
    text: '# Популярный стек',
    header: 'Дизайн',
  },
];

const Home = () => {
  const [tabs, setTabs] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [tags, setTags] = useState([]);

  const [selectedTab, setSelectedTab] = useState('');

  useEffect(() => {
    setTabs(tabsList);
    setCandidates(candidatesList);

    fetch('https://guild.craft-group.xyz/api/skills/skills-on-main-page')
      .then((response) => response.json())
      .then((res) => {
        const keys = Object.keys(res);
        const values = Object.values(res);

        const tempTags = values.map((item, index) =>
          item.map((tag) => {
            return { id: tag.id, value: tag.tags, name: keys[index] };
          })
        );

        setTags(tempTags);
      });
  }, []);

  const handleBlockClick = (name) => {
    setSelectedTab(name);
  };

  return (
    <>
      <Outstaffing onhandleTabBar={(name) => handleBlockClick(name)} selected={selectedTab} tabs={tabs} tags={tags} />
      <Description
        candidatesListArr={selectedTab ? candidates.filter((item) => item.name === selectedTab) : candidates}
      />
    </>
  );
};

export default Home;
