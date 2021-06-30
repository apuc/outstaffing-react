import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Outstaffing from '../Outstaffing/Outstaffing';
import Description from '../Description/Description';
import front from '../../images/front_end.png';
import back from '../../images/back_end.png';
import design from '../../images/design.png';
import { fetchProfile, fetchSkills } from '../../server/server';
import { profiles, selectProfiles, tags, candidates, selectCandidates, selectTab } from '../../redux/outstaffingSlice';

const Home = ({ getCandidate }) => {
  const [count, setCount] = useState(2);

  const dispatch = useDispatch();
  const profilesArr = useSelector(selectProfiles);
  const candidatesArr = useSelector(selectCandidates);
  const selectedTab = useSelector(selectTab);

  useEffect(() => {
    fetchProfile('https://guild.craft-group.xyz/api/profile')
      .then((profileArr) => dispatch(profiles(profileArr)))
      .catch((e) => console.log(e));

    fetchSkills('https://guild.craft-group.xyz/api/skills/skills-on-main-page').then((skills) => {
      const keys = Object.keys(skills);
      const values = Object.values(skills);

      const tempTags = values.map((value, index) =>
        value.map((val) => {
          return { id: val.id, value: val.tags, name: keys[index] };
        })
      );
      dispatch(tags(tempTags));
    });
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      candidates(
        profilesArr.map((profile) => {
          let skillsName = '';
          let img;
          let header;

          if (Number(profile.position_id) === 1) {
            skillsName = 'Frontend';
            img = front;
            header = 'Фронтенд';
          } else if (Number(profile.position_id) === 2) {
            skillsName = 'Backend';
            img = back;
            header = 'Бэкенд';
          } else if (Number(profile.position_id) === 3) {
            skillsName = 'Marketer';
            img = design;
            header = 'Дизайн';
          }

          return {
            id: profile.id,
            profileId: profile.position_id,
            name: profile.fio,
            skills: profile.skillValues,
            skillsName,
            img,
            header,
          };
        })
      )
    );
  }, [profilesArr, dispatch]);

  const shorthandArray = candidatesArr.slice(0, count);

  const loadMore = (count) => {
    setCount((prev) => prev + count);
  };

  return (
    <>
      <Outstaffing selected={selectedTab} candidatesArray={candidatesArr} />
      <Description
        candidatesListArr={
          selectedTab ? candidatesArr.filter((item) => item.skillsName === selectedTab) : shorthandArray
        }
        getCandidate={getCandidate}
        onLoadMore={loadMore}
      />
    </>
  );
};

export default Home;
