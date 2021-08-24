import React, { useEffect } from 'react';
import { useHistory, useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { currentCandidate, selectCurrentCandidate, auth } from '../../redux/outstaffingSlice';
import arrow from '../../images/right-arrow.png';
import rectangle from '../../images/rectangle_secondPage.png';
import Sidebar from '../Sidebar/Sidebar';
import SectionSkills from './SectionSkills';
import front from '../../images/front_end.png';
import back from '../../images/back_end.png';
import design from '../../images/design.png';
import { fetchItemsForId } from '../../server/server';
import { Footer } from '../Footer/Footer';

import './candidate.css';
import { getRole } from '../../redux/roleSlice';

const Candidate = () => {
  const history = useHistory();
  const { id: candidateId } = useParams();
  const dispatch = useDispatch();
  const role = useSelector(getRole);

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    fetchItemsForId({ link: `${process.env.REACT_APP_API_URL}/api/profile/`, index:Number(candidateId), history, role, logout: dispatch(auth(false)) }).then((el) =>
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
        styles.classes = 'back';
        styles.header = 'Backend';
        styles.img = back;

        break;
      }
      case 2: {
        styles.classes = 'des';
        styles.header = 'Frontend';
        styles.img = front;
        break;
      }
      case 3: {
        styles.classes = 'front';
        styles.header = 'Design';
        styles.img = design;
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
    <div className='candidate'>
        <div className="row">
          <div className="col-12">
            <div className='candidate__title'>
              <h2>
                <span>Аутстаффинг</span> it-персонала
              </h2>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <div className='candidate__header'>
              <div className='arrow' onClick={() => history.push('/')}>
                <div className='arrow__img'>
                  <img src={arrow} alt="" />
                </div>
                <div className='arrow__sp'>
                  <span>Вернуться к списку</span>
                </div>
              </div>

              <div className='icon'>
                <h3>{header}</h3>
                <img className={classes} src={img} alt="" />
              </div>
            </div>
          </div>
        </div>
        <div className='candidate__main'>
          <div className="row">
            <div className="col-12 col-xl-4">
              <Sidebar candidate={currentCandidateObj}  />
            </div>
            <div className="col-12 col-xl-8">
              <div className='candidate__main__description'>
                <img src={rectangle} alt="" />
                <p className='hashtag'># Описание опыта</p>
                {text ? (
                  <div className='candidate__text' dangerouslySetInnerHTML={createMarkup(text)}></div>
                ) : (
                  <p className='candidate__textSecondary'>
                    {currentCandidateObj.vc_text ? currentCandidateObj.vc_text : 'Описание отсутствует...' }
                  </p>
                )}
                {/* <Link to={`/candidate/${currentCandidateObj.id}/form`}>
                  <button type="submit" className='candidate__btn'>
                    Выбрать к собеседованию
                  </button>
                </Link> */}
                <SectionSkills skillsArr={skillValues} />
              </div>
            </div>
          </div>
        </div>
        <Footer />
    </div>
  );
};

export default Candidate;
