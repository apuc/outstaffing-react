import React from 'react';
import { Link } from 'react-router-dom';
import dogBig from '../../images/dog.jpg';
import style from './Sidebar.module.css';

const Sidebar = () => {
  return (
    <div className={style.candidateSidebar}>
      <div className={style.candidateSidebar__info}>
        <img src={dogBig} alt="" />
        <p className={style.candidateSidebar__info__e}>Опыт работы</p>
        <p className={style.candidateSidebar__info__y}>4+ лет</p>
        <Link to={`/form`}>
          <button className={style.candidateSidebar__info__btn}>Выбрать к собеседованию</button>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
