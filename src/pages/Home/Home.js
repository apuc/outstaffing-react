import React, {useState, useEffect} from 'react'
import {useDispatch} from 'react-redux'

import Outstaffing from '../../components/Outstaffing/Outstaffing'
import Description from '../../components/Description/Description'
import {Footer} from '../../components/Footer/Footer'

import {profiles, tags} from '../../redux/outstaffingSlice'

import {useRequest} from "../../HOOks/useRequest";
import {LogoutButton} from "../../components/LogoutButton/LogoutButton";
import {Header} from "../../components/Header/Header";
import {apiRequest} from "../../api/request";


const Home = () => {

  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [index, setIndex] = useState(4);

  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoadingMore(true);
    apiRequest('/profile', {
      params: {limit: 1000},
    }).then((profileArr) => {

      dispatch(profiles(profileArr));
      setIsLoadingMore(false)
    });

    apiRequest('/skills/skills-on-main-page', {}).then((skills) => {
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

  }, [index]);

  const loadMore = (count) => {
    setIndex((prev) => prev + count)
  };

  return (
      <>
        <Header/>
        <div className='container'>
          <Outstaffing/>
          <Description onLoadMore={loadMore} isLoadingMore={isLoadingMore}/>
          <Footer/>
        </div>
      </>
  )
};

export default Home
