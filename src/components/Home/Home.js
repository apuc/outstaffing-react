import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Outstaffing from '../Outstaffing/Outstaffing';
import Description from '../Description/Description';
import { fetchProfile, fetchSkills } from '../../server/server';
import { profiles, tags } from '../../redux/outstaffingSlice';
import { Footer } from '../Footer/Footer';

const Home = () => {
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [index, setIndex] = useState(4);

  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoadingMore(true);
    fetchProfile(`${process.env.REACT_APP_API_URL}/api/profile?limit=`, index).then((profileArr) => {
      dispatch(profiles(profileArr));
      setIsLoadingMore(false);
    });

    fetchSkills(`${process.env.REACT_APP_API_URL}/api/skills/skills-on-main-page`).then((skills) => {
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
      <Description onLoadMore={loadMore} isLoadingMore={isLoadingMore} />
      <Footer />
    </>
  );
};

export default Home;
