import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  currentCandidate,
  selectCurrentCandidate,
  selectProfiles,
  selectFilteredCandidates,
} from '../../redux/outstaffingSlice';
import style from './Candidate.module.css';
import arrow from '../../images/right-arrow.png';
import rectangle from '../../images/rectangle_secondPage.png';
import Sidebar from '../Sidebar/Sidebar';
import SectionSkills from './SectionSkills';
import front from '../../images/front_end.png';
import back from '../../images/back_end.png';
import design from '../../images/design.png';

const Candidate = () => {
  const history = useHistory();
  const { id: candidateId } = useParams();

  const dispatch = useDispatch();

  const candidatesArr = useSelector(selectProfiles);
  const filteredCandidates = useSelector(selectFilteredCandidates);

  dispatch(
    currentCandidate(
      filteredCandidates.length > 0
        ? filteredCandidates.find((el) => Number(el.id) === Number(candidateId))
        : candidatesArr.find((el) => Number(el.id) === Number(candidateId))
    )
  );

  const currentCandidateObj = useSelector(selectCurrentCandidate);

  console.log('currentCandidateObj ', currentCandidateObj);

  const { position_id, skillValues, vc_text: text } = currentCandidateObj;

  let classes;
  let header;
  let img;

  if (Number(position_id) === 1) {
    classes = style.back;
    header = 'Backend';
    img = back;
  } else if (Number(position_id) === 2) {
    classes = style.des;
    header = 'Frontend';
    img = front;
  } else if (Number(position_id) === 3) {
    classes = style.front;
    header = 'Design';
    img = design;
  }

  function createMarkup(text) {
    return { __html: text.split('</p>').join('</p>') };
  }

  return (
    <section className={style.candidate}>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className={style.candidate__title}>
              <h2>
                <span>Аутстаффинг</span> it-персонала
              </h2>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <div className={style.candidate__header}>
              <div className={style.arrow} onClick={() => history.push('/')}>
                <div className={style.arrow__img}>
                  <img src={arrow} alt="" />
                </div>
                <div className={style.arrow__sp}>
                  <span>Вернуться к списку</span>
                </div>
              </div>

              <div className={style.icon}>
                <h3>{header}</h3>
                <img className={classes} src={img} alt="" />
              </div>
            </div>
          </div>
        </div>
        <div className={style.candidate__main}>
          <div className="row">
            <div className="col-12 col-xl-4">
              <Sidebar />
            </div>
            <div className="col-12 col-xl-8">
              <div className={style.candidate__main__description}>
                <img src={rectangle} alt="" />
                <p className={style.hashtag}># Описание опыта</p>
                {text ? (
                  <div className={style.candidate__text} dangerouslySetInnerHTML={createMarkup(text)}></div>
                ) : (
                  <p className={style.candidate__textSecondary}>Описание отсутствует...</p>
                )}
                <button type="submit" className={style.candidate__btn}>
                  Выбрать к собеседованию
                </button>
                <SectionSkills skillsArr={skillValues} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Candidate;
