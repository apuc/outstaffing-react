import React, {useEffect, useState} from 'react'
import {useParams, Link, useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'

import SkillSection from '../SkillSection/SkillSection'
import Sidebar from '../CandidateSidebar/CandidateSidebar'
import {Footer} from '../Footer/Footer'

import {currentCandidate, selectCurrentCandidate,} from '../../redux/outstaffingSlice'

import {apiRequest} from "../../api/request";
import {createMarkup} from "../../helper";

import arrow from '../../images/right-arrow.png'
import rectangle from '../../images/rectangle_secondPage.png'
import front from '../../images/front_end.png'
import back from '../../images/back_end.png'
import design from '../../images/design.png'

import './candidate.scss'
import {LogoutButton} from "../LogoutButton/LogoutButton";
import {Header} from "../Header/Header";


const Candidate = () => {
  const {id: candidateId} = useParams();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const currentCandidateObj = useSelector(selectCurrentCandidate);

  const [activeSnippet, setActiveSnippet] = useState(true);



  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);

  useEffect(() => {
    apiRequest(`/profile/${candidateId}`, {
      params: Number(candidateId),
    }).then((el) => dispatch(currentCandidate(el)))
  }, [dispatch, candidateId]);

  const {position_id, skillValues, vc_text: text} = currentCandidateObj;

  const setStyles = () => {
    const styles = {
      classes: '',
      header: '',
      img: ''
    };

    switch (Number(position_id)) {
      case 1: {
        styles.classes = 'back';
        styles.header = 'Backend';
        styles.img = back;

        break
      }
      case 2: {
        styles.classes = 'des';
        styles.header = 'Frontend';
        styles.img = front;
        break
      }
      case 3: {
        styles.classes = 'front';
        styles.header = 'Design';
        styles.img = design;
        break
      }
      default:
        break
    }

    return styles
  };

  const {header, img, classes} = setStyles();

  return (
      <>
        <Header/>
        <div className='container candidate'>

          <div className='row'>
            <div className='col-12 candidate__header'>

              <div className='candidate__arrow' onClick={() => navigate('/')}>
                <div className='candidate__arrow-img'>
                  <img src={arrow} alt=''/>
                </div>
                <div className='candidate__arrow-sp'>
                  <span>Вернуться к списку</span>
                </div>
              </div>

              <div className='candidate__icon'>
                <h3>{header}</h3>
                <img className={classes} src={img} alt=''/>
              </div>

            </div>
          </div>
          <div className='candidate__main'>
            <div className='row'>
              <div className='col-12 col-xl-4'>
                <Sidebar candidate={currentCandidateObj} position activeSnippet={activeSnippet}
                         setActiveSnippet={setActiveSnippet}/>
              </div>
              {
                activeSnippet ?
                    (
                        <div className='col-12 col-xl-8'>
                          <div className='candidate__main-description'>
                            <img src={rectangle} alt=''/>
                            <p className='candidate__hashtag'># Описание опыта</p>
                            {text ? (
                                <div
                                    className='candidate__text'
                                    dangerouslySetInnerHTML={createMarkup(text)}
                                ></div>
                            ) : (
                                <p className='candidate__text-secondary'>
                                  {currentCandidateObj.vc_text
                                      ? currentCandidateObj.vc_text
                                      : 'Описание отсутствует...'}
                                </p>
                            )}

                            <SkillSection skillsArr={skillValues}/>

                          </div>
                        </div>
                    ) :
                    (
                        <div className="col-12 col-xl-8">
                          <div className="candidate__works works">
                            <div className="works__body">
                              <div className="works__item item-works">
                                <div className="item-works__body">
                                  <Link to="/" className="item-works__link">Vuetifyis.com</Link>
                                  <div className="item-works__text">Forked from
                                    peluprvi/vuetifyjs.com <br/> Vuetifyjs.com
                                    documentation
                                  </div>
                                  <div className="item-works__mark">Angular</div>
                                </div>
                              </div>
                              <div className="works__item item-works">
                                <div className="item-works__body">
                                  <Link to="/" className="item-works__link">Vuetifyis.com</Link>
                                  <div className="item-works__text">Forked from
                                    peluprvi/vuetifyjs.com <br/> Vuetifyjs.com
                                    documentation
                                  </div>
                                  <div className="item-works__mark">Angular</div>
                                </div>
                              </div>
                              <div className="works__item item-works">
                                <div className="item-works__body">
                                  <Link to="/" className="item-works__link">Vuetifyis.com</Link>
                                  <div className="item-works__text">Forked from
                                    peluprvi/vuetifyjs.com <br/> Vuetifyjs.com
                                    documentation
                                  </div>
                                  <div className="item-works__mark item-works__mark_yellow">Laravel</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                    )
              }

            </div>
          </div>
          <Footer/>
        </div>
      </>
  )
};

export default Candidate
