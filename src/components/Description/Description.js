import React, { useEffect, useState } from 'react';
import style from './Description.module.css';
import male from '../../images/medium_male.png';
import rectangle from '../../images/rectangle_secondPage.png';
import { Link, useHistory } from 'react-router-dom';
import { LEVELS, SKILLS } from '../constants/constants';
import { selectProfiles, selectFilteredCandidates, selectItems, auth } from '../../redux/outstaffingSlice';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProfile } from '../../server/server';
import { Loader } from '../Loader/Loader';
import { getRole } from '../../redux/roleSlice';

const Description = ({ onLoadMore, isLoadingMore }) => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const history = useHistory();
  const role = useSelector(getRole)
  const candidatesListArr = useSelector(selectProfiles);
  const itemsArr = useSelector(selectItems);
  const filteredListArr = useSelector(selectFilteredCandidates);
  const [allCandidates, getAllCandidates] = useState([]);

  useEffect(() => {
    fetchProfile({ link: `${process.env.REACT_APP_API_URL}/api/profile?limit=`, index: 1000, history, role, logout: dispatch(auth(false)) }).then((p) => {
      getAllCandidates(p);
      setIsLoaded(true);
    });
  }, []);

  if(!filteredListArr) {
    return (
      <section className={style.description}>
        <div className="container">
          <div className={style.description__wrapper}>
          {
            candidatesListArr && candidatesListArr.length > 0 ? candidatesListArr.map((el) => (
              <div className="row" key={el.id}>
                <div className="col-2">
                  <img className={style.description__img} src={el.photo} alt="" />
                </div>
                <div className="col-12 col-xl-6">
                  <h3 className={style.description__title}>
                    <Link to={`/candidate/${el.id}`}>{el.specification} {SKILLS[el.position_id]}, {LEVELS[el.level]} </Link>
                  </h3>

                  {el.vc_text_short ? (
                    <div className={style.description__text}>{el.vc_text_short}</div>
                  ) : (
                    <p className={style.description__textSecondary}>Описание отсутствует...</p>
                  )}
                </div>
                <div className="col-12 col-xl-4">
                  <Link to={`/candidate/${el.id}`}>
                    <button className={style.description__button}>Подробное резюме</button>
                  </Link>
                </div>
                <div className="col-xl-2"></div>
                <div className="col-12 col-xl-6">
                  <ul className={style.description__list}>
                    {el.skillValues.map((e) => (
                      <li key={e.id} className={style.description__list__item}>
                        {e.skill.name}
                      </li>
                    ))}
                  </ul>
                  <img className={style.description__rectangle} src={rectangle} alt="" />
                </div>
                <div className="col-xl-4"></div>
              </div>
            )) : <div className={style.description__empty}>{
              isLoaded ? 'В данный момент в категории нет свободных специалистов' : 'Загрузка...'
            }</div>}
          </div>
  
          <div className="row">
          <div className="col-12">
            <div className={style.description__footer}>
              <div className={style.description__footer__btn}>
                  <button onClick={() => onLoadMore(2)}>
                  {
                  isLoadingMore ? <Loader width={40} height={40} /> : 'Загрузить еще'
                  } </button>
              </div>
            </div>
          </div>
        </div>

        </div>
      </section>
    );
  }

  return (
    <section className={style.description}>
      <div className="container">
        <div className={style.description__wrapper}>
          {filteredListArr && filteredListArr.length > 0
            ? filteredListArr.map((el) => (
                <div className="row" key={el.id}>
                  <div className="col-2">
                    <img className={style.description__img} src={el.photo} alt="" />
                  </div>
                  <div className="col-12 col-xl-6">
                    <h3 className={style.description__title}>
                      <Link to={`/candidate/${el.id}`}> {el.specification} {SKILLS[el.position_id]}, {LEVELS[el.level]} </Link>
                    </h3>

                    {el.vc_text_short ? (
                      <div className={style.description__text}>{el.vc_text_short}</div>
                    ) : (
                      <p className={style.description__textSecondary}>Описание отсутствует...</p>
                    )}
                  </div>
                  <div className="col-12 col-xl-4">
                    <Link to={`/candidate/${el.id}`}>
                      <button className={style.description__button}>Подробное резюме</button>
                    </Link>
                  </div>
                  <div className="col-xl-2"></div>
                  <div className="col-12 col-xl-6">
                    <ul className={style.description__list}>
                      {el.skillValues.map((e) => (
                        <li key={e.id} className={style.description__list__item}>
                          {e.skill.name}
                        </li>
                      ))}
                    </ul>
                    <img className={style.description__rectangle} src={rectangle} alt="" />
                  </div>
                  <div className="col-xl-4"></div>
                </div>
              ))
            : <div className={style.description__empty}>В данный момент в категории нет свободных специалистов</div> }
        </div>

        <div className="row">
          <div className="col-12">
            <div className={style.description__footer}>
              <div className={style.description__footer__btn}>
                {(candidatesListArr.length !== allCandidates.length && filteredListArr.length > 0) || filteredListArr===null ? (
                  <button onClick={() => onLoadMore(2)}>Загрузить еще</button>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Description;
