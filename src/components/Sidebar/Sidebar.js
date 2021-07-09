import React from 'react';
import { Link } from 'react-router-dom';
import dogBig from '../../images/dog.jpg';
import style from './Sidebar.module.css';
import { useHistory } from 'react-router-dom';
import { path } from '../../redux/outstaffingSlice';
import { useDispatch } from 'react-redux';

const Sidebar = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  return (
    <div className={style.candidateSidebar}>
      <div className={style.candidateSidebar__info}>
        <img src={dogBig} alt="" />
        <p className={style.candidateSidebar__info__e}>Опыт работы</p>
        <p className={style.candidateSidebar__info__y}>4+ лет</p>
        <Link to={`/form`} onClick={() => dispatch(path(history.location.pathname))}>
          <button className={style.candidateSidebar__info__btn}>Выбрать к собеседованию</button>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
