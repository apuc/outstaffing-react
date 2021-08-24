import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Outstaffing from '../Outstaffing/Outstaffing';
import Description from '../Description/Description';
import { fetchProfile, fetchSkills } from '../../server/server';
import { profiles, tags, auth } from '../../redux/outstaffingSlice';
import { getRole } from '../../redux/roleSlice';
import { Footer } from '../Footer/Footer';
import { useHistory } from 'react-router-dom';

const Home = () => {
  const history = useHistory()
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [index, setIndex] = useState(4);

  const dispatch = useDispatch();
  const role = useSelector(getRole)

  useEffect(() => {
    setIsLoadingMore(true);
    fetchProfile({ link:`${process.env.REACT_APP_API_URL}/api/profile?limit=`, index, history, role, logout: dispatch(auth(false)) }).then((profileArr) => {
      dispatch(profiles(profileArr));
      setIsLoadingMore(false);
    });

    fetchSkills({ link: `${process.env.REACT_APP_API_URL}/api/skills/skills-on-main-page`, history, role, logout: dispatch(auth(false)) }).then((skills) => {
      if(!skills) { return [] }
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
