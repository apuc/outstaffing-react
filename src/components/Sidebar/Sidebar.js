import React from 'react';
import { Link } from 'react-router-dom';
import maleBig from '../../images/medium_male_big.png';
import style from './Sidebar.module.css';

const getYearsString = (years) => {
  let yearsString;
  if (years%10 === 1) {
    yearsString = 'год';
  } else if (years === 11 || years === 12 || years === 13 || years === 14) {
    yearsString = 'лет';
  } else if (years%10 === 2 || years%10 === 3 || years%10 === 4) {
    yearsString = 'года';
  } else {
    yearsString = 'лет';
  }
  return `${years} ${yearsString}`;
}

const Sidebar = ({ candidate }) => {
  return (
    <div className={style.candidateSidebar}>
      <div className={style.candidateSidebar__info}>
        <img src={candidate.photo} alt="" />
        { candidate && candidate.years_of_exp && <>
          <p className={style.candidateSidebar__info__e}>Опыт работы</p>
          <p className={style.candidateSidebar__info__y}>{getYearsString(candidate.years_of_exp)}</p>
        </> }
            <Link to={`/candidate/${candidate.id}/form`}>
          <button className={style.candidateSidebar__info__btn}>Выбрать к собеседованию</button>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
