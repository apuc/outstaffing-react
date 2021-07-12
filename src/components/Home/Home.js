import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Outstaffing from '../Outstaffing/Outstaffing';
import Description from '../Description/Description';
import { fetchProfile, fetchSkills } from '../../server/server';
import { profiles, tags } from '../../redux/outstaffingSlice';

const Home = () => {
  const [index, setIndex] = useState(4);

  const dispatch = useDispatch();

  useEffect(() => {
    fetchProfile('https://guild.craft-group.xyz/api/profile?limit=', index)
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

  const loadMore = (count) => {
    setIndex((prev) => prev + count);
  };

  return (
    <>
      <Outstaffing />
      <Description onLoadMore={loadMore} />
    </>
  );
};

export default Home;
