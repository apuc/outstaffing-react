import React, { useState, useEffect } from 'react';
import Outstaffing from '../Outstaffing/Outstaffing';
import Description from '../Description/Description';
import front from '../../images/front_end.png';
import back from '../../images/back_end.png';
import design from '../../images/design.png';
import { fetchProfile, fetchSkills } from '../../server/server';

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

const Home = ({ getCandidate }) => {
  const [tabs, setTabs] = useState([]);
  const [tags, setTags] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [selectedTab, setSelectedTab] = useState('');
  const [countArr, setCountArr] = useState(2);
  const [candidatesArray, setCandidatesArray] = useState([]);

  useEffect(() => {
    setTabs(tabsList);

    fetchProfile('https://guild.craft-group.xyz/api/profile')
      .then((profileArr) => setProfiles(profileArr))
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    if (profiles.length) {
      setCandidatesArray(
        profiles.map((profile) => {
          let skillsName = '';
          let img;

          if (Number(profile.position_id) === 1) {
            skillsName = 'Frontend';
            img = front;
          } else if (Number(profile.position_id) === 2) {
            skillsName = 'Backend';
            img = back;
          } else if (Number(profile.position_id) === 3) {
            skillsName = 'Marketer';
            img = design;
          }

          return {
            id: profile.id,
            profileId: profile.position_id,
            name: profile.fio,
            skills: profile.skillValues,
            skillsName: skillsName,
            img: img,
          };
        })
      );
    }
  }, [profiles]);

  useEffect(() => {
    fetchSkills('https://guild.craft-group.xyz/api/skills/skills-on-main-page').then((skills) => {
      const keys = Object.keys(skills);
      const values = Object.values(skills);

      const tempTags = values.map((value, index) =>
        value.map((val) => {
          return { id: val.id, value: val.tags, name: keys[index] };
        })
      );
      setTags(tempTags);
    });
  }, []);

  const shorthandArray = candidatesArray.slice(0, countArr);

  const loadMore = (count) => {
    setCountArr((prev) => prev + count);
  };

  const handleBlockClick = (name) => {
    setSelectedTab(name);
  };

  return (
    <>
      <Outstaffing onhandleTabBar={(name) => handleBlockClick(name)} selected={selectedTab} tabs={tabs} tags={tags} />
      <Description
        candidatesListArr={
          selectedTab ? candidatesArray.filter((item) => item.skillsName === selectedTab) : shorthandArray
        }
        getCandidate={getCandidate}
        onLoadMore={loadMore}
      />
    </>
  );
};

export default Home;
