import React from 'react';
import style from './Description.module.css';
import dog from '../../images/dog.jpg';
import rectangle from '../../images/rectangle_secondPage.png';
import arrowLeft from '../../images/arrow_left.png';
import arrowRight from '../../images/arrow_right.png';
import { Link } from 'react-router-dom';

const Description = ({ candidatesListArr, getCandidate, onLoadMore }) => {
  return (
    <section className={style.description}>
      <div className="container">
        <div className={style.description__wrapper}>
          {candidatesListArr.map((el) => (
            <div className="row" key={el.id}>
              <div className="col-2">
                <img className={style.description__img} src={dog} alt="" />
              </div>
              <div className="col-12 col-xl-6">
                <h3 className={style.description__title}>
                  {el.name} - {el.skillsName}
                </h3>
                <p className={style.description__text}>
                  - 10 лет пишу приложения под IOS, отлично владею Objective-C и Swift.
                </p>
                <p className={style.description__text}>- 5 лет руковожу командами мобильной разработки.</p>
                <p className={style.description__text}>- 3 года преподаю в IOS-школе Сбера</p>
              </div>
              <div className="col-12 col-xl-4">
                <Link to={`/candidate/${el.id}`} onClick={() => getCandidate(candidatesListArr)}>
                  <button className={style.description__button}>Подробное резюме</button>
                </Link>
              </div>
              <div className="col-xl-2"></div>
              <div className="col-12 col-xl-6">
                {el.skills.map((e) => (
                  <span key={e.id} className={style.description__sp}>
                    {e.skill.name}
                  </span>
                ))}
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
              <div className={style.description__footer__box}>
                <div className={style.arrow__left}>
                  <img src={arrowLeft} alt="" />
                </div>
                <span className={style.description__footer__sp}>1 / 15</span>
                <div className={style.arrow__right}>
                  <img src={arrowRight} alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Description;
