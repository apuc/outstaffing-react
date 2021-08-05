import React, { useEffect } from 'react';
import { useHistory, useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { currentCandidate, selectCurrentCandidate } from '../../redux/outstaffingSlice';
import style from './Candidate.module.css';
import arrow from '../../images/right-arrow.png';
import rectangle from '../../images/rectangle_secondPage.png';
import Sidebar from '../Sidebar/Sidebar';
import SectionSkills from './SectionSkills';
import front from '../../images/front_end.png';
import back from '../../images/back_end.png';
import design from '../../images/design.png';
import { fetchItemsForId } from '../../server/server';

const Candidate = () => {
  const history = useHistory();
  const { id: candidateId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    fetchItemsForId(`${process.env.REACT_APP_API_URL}/api/profile/`, Number(candidateId)).then((el) =>
      dispatch(currentCandidate(el))
    );
  }, [dispatch, candidateId]);

  const currentCandidateObj = useSelector(selectCurrentCandidate);

  const { position_id, skillValues, vc_text: text } = currentCandidateObj;

  const setStyles = () => {
    const styles = {
      classes: '',
      header: '',
      img: '',
    };

    switch (Number(position_id)) {
      case 1: {
        styles.classes = style.back;
        styles.header = 'Backend';
        styles.img = back;

        break;
      }
      case 2: {
        styles.classes = style.des;
        styles.header = 'Frontend';
        styles.img = front;
        break;
      }
      case 3: {
        style.classes = style.front;
        style.header = 'Design';
        style.img = design;
        break;
      }
      default:
        break;
    }

    return styles;
  };

  function createMarkup(text) {
    return { __html: text.split('</p>').join('</p>') };
  }

  const { header, img, classes } = setStyles();

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
                <Link to={'/form'}>
                  <button type="submit" className={style.candidate__btn}>
                    Выбрать к собеседованию
                  </button>
                </Link>
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
