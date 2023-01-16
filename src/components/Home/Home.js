import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import Outstaffing from '../Outstaffing/Outstaffing'
import Description from '../Description/Description'
import {Footer} from '../Footer/Footer'


import {profiles, tags, auth} from '../../redux/outstaffingSlice'
import {getRole} from '../../redux/roleSlice'

import {useRequest} from "../../hooks/useRequest";



const Home = () => {

  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [index, setIndex] = useState(4);

  const dispatch = useDispatch();

  const {apiRequest} = useRequest();

  useEffect(() => {
    setIsLoadingMore(true);
    apiRequest('/profile', {
      params: {limit: 1000},
    }).then((profileArr) => {

      dispatch(profiles(profileArr));
      setIsLoadingMore(false)
    });

    apiRequest('/skills/skills-on-main-page', {
    }).then((skills) => {
      if (!skills) {
        return []
      }

      const keys = Object.keys(skills);
      const values = Object.values(skills);

      const tempTags = values.map((value, index) =>
          value.map((val) => {
            return {id: val.id, value: val.tags, name: keys[index]}
          })
      );
      dispatch(tags(tempTags))
    })
  }, [dispatch, index]);

  const loadMore = (count) => {
    setIndex((prev) => prev + count)
  };

  return (
      <>
        <Outstaffing/>
        <Description onLoadMore={loadMore} isLoadingMore={isLoadingMore}/>
        <Footer/>
      </>
  )
};

export default Home
