import React from 'react';
import male from '../../../images/medium_male.png';
import arrowLeft from '../../../images/arrow_left.png';
import arrowRight from '../../../images/arrow_right.png';
import style from './Sidebar.module.css';

const Sidebar = () => {
  return (
    <div className={style.candidateSidebar}>
      <div className={style.candidateSidebar__info}>
        <img src={male} alt="" />
        <p className={style.candidateSidebar__info__e}>Опыт работы</p>
        <p className={style.candidateSidebar__info__y}>4+ лет</p>
        <button className={style.candidateSidebar__info__btn}>Выбрать к собеседованию</button>
        <p className={style.candidateSidebar__info__l}>Посмотреть ещё</p>
      </div>

      <div className={style.candidateSidebar__arrows}>
        <div className={style.arrow__left}>
          <img src={arrowLeft} alt="" />
        </div>
        <span className={style.arrows__sp}>1/15</span>
        <div className={style.arrow__right}>
          <img src={arrowRight} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
