import React, { useEffect, useState } from 'react';
import style from './Description.module.css';
import male from '../../images/medium_male.png';
import rectangle from '../../images/rectangle_secondPage.png';
import { Link } from 'react-router-dom';
import { LEVELS, SKILLS } from '../constants/constants';
import { selectProfiles, selectFilteredCandidates, selectItems } from '../../redux/outstaffingSlice';
import { useSelector } from 'react-redux';
import { fetchProfile } from '../../server/server';
import { Loader } from '../Loader/Loader';

const Description = ({ onLoadMore, isLoadingMore }) => {
  const candidatesListArr = useSelector(selectProfiles);
  const itemsArr = useSelector(selectItems);
  const filteredListArr = useSelector(selectFilteredCandidates);
  const [allCandidates, getAllCandidates] = useState([]);

  useEffect(() => {
    fetchProfile(`${process.env.REACT_APP_API_URL}/api/profile?limit=`, 1000).then((p) => getAllCandidates(p));
  }, []);

  if(!filteredListArr) {
    return (
      <section className={style.description}>
        <div className="container">
          <div className={style.description__wrapper}>
          {
            candidatesListArr.map((el) => (
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
            ))}
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
          {filteredListArr
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
            : filteredListArr.length && filteredListArr.length === 0 && <></> }
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
