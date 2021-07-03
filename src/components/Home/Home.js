import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Outstaffing from '../Outstaffing/Outstaffing';
import Description from '../Description/Description';
import { fetchProfile, fetchSkills } from '../../server/server';
import front from '../../images/front_end.png';
import back from '../../images/back_end.png';
import design from '../../images/design.png';
// import { profiles, selectProfiles, tags, candidates, selectCandidates, selectTab } from '../../redux/outstaffingSlice';
import { profiles, selectProfiles, tags, candidates } from '../../redux/outstaffingSlice';

const Home = () => {
  const [index, setIndex] = useState(2);

  const dispatch = useDispatch();
  const profilesArr = useSelector(selectProfiles);

  // const candidatesArr = useSelector(selectCandidates);

  // const selectedTab = useSelector(selectTab);

  useEffect(() => {
    fetchProfile(`https://guild.craft-group.xyz/api/profile?limit=`, index)
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
  }, [dispatch, index]);

  useEffect(() => {
    dispatch(
      candidates(
        profilesArr.map((profile) => {
          let skillsName = '';
          let header;
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
            level: profile.level,
            text: profile.vc_text,
            skillsName,
            header,
            img,
          };
        })
      )
    );
  }, [profilesArr, dispatch]);

  const loadMore = (count) => {
    setIndex((prev) => prev + count);
  };

  return (
    <>
      <Outstaffing />
      {/* <Description
        candidatesListArr={
          selectedTab ? candidatesArr.filter((item) => item.skillsName === selectedTab) : candidatesArr
        }
        onLoadMore={loadMore}
      /> */}
      <Description onLoadMore={loadMore} />
    </>
  );
};

export default Home;
