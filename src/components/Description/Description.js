import React from 'react';
import style from './Description.module.css';
import dog from '../../images/dog.jpg';
import rectangle from '../../images/rectangle_secondPage.png';
import { Link } from 'react-router-dom';
import { LEVELS, SKILLS } from '../constants/constants';
import { selectProfiles, selectFilteredCandidates } from '../../redux/outstaffingSlice';
import { useSelector } from 'react-redux';

const Description = ({ onLoadMore }) => {
  const candidatesListArr = useSelector(selectProfiles);
  const filteredListArr = useSelector(selectFilteredCandidates);

  // function createMarkup(text) {
  //   return { __html: text.split('</p>').slice(0, 3).join('') };
  // }

  return (
    <section className={style.description}>
      <div className="container">
        <div className={style.description__wrapper}>
          {filteredListArr && filteredListArr.length > 0
            ? filteredListArr.map((el) => (
                <div className="row" key={el.id}>
                  <div className="col-2">
                    <img className={style.description__img} src={dog} alt="" />
                  </div>
                  <div className="col-12 col-xl-6">
                    <h3 className={style.description__title}>
                      {SKILLS[el.position_id]}, {LEVELS[el.level]}
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
                    <div className={style.description__spBox}>
                      {el.skillValues.map((e) => (
                        <span key={e.id} className={style.description__sp}>
                          {e.skill.name}
                        </span>
                      ))}
                    </div>
                    <img className={style.description__rectangle} src={rectangle} alt="" />
                  </div>
                  <div className="col-xl-4"></div>
                </div>
              ))
            : candidatesListArr.map((el) => (
                <div className="row" key={el.id}>
                  <div className="col-2">
                    <img className={style.description__img} src={dog} alt="" />
                  </div>
                  <div className="col-12 col-xl-6">
                    <h3 className={style.description__title}>
                      {SKILLS[el.position_id]}, {LEVELS[el.level]}
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
                    <div className={style.description__spBox}>
                      {el.skillValues.map((e) => (
                        <span key={e.id} className={style.description__sp}>
                          {e.skill.name}
                        </span>
                      ))}
                    </div>
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
                <button onClick={() => onLoadMore(2)}>Загрузить еще</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Description;
