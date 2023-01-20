import React from 'react'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'

import {Loader} from '../Loader/Loader'
import ErrorBoundary from "../../HOC/ErrorBoundary";

import {LEVELS, SKILLS} from '../../constants/constants'
import {selectProfiles, selectFilteredCandidates,} from '../../redux/outstaffingSlice'

import {urlForLocal} from '../../helper'

import male from '../../images/medium_male.png'
import rectangle from '../../images/rectangle_secondPage.png'

import './description.scss'


const Description = ({onLoadMore, isLoadingMore}) => {

  const candidatesListArr = useSelector(selectProfiles);
  const filteredListArr = useSelector(selectFilteredCandidates);



  if (!filteredListArr) {
    return (
        <section className='description'>
          <div className='container'>
            <div className='description__wrapper'>
              <ErrorBoundary>
                {candidatesListArr && Array.isArray(candidatesListArr) && candidatesListArr.length > 0 ? (
                    candidatesListArr.map((el) => (
                        <div className='row' key={el.id}>
                          <div className='col-2 col-xs-12'>
                            {el.photo && <img className='description__img' src={urlForLocal(el.photo)} alt=''/>}
                          </div>
                          <div className='col-12 col-xl-6'>
                            <h3 className='description__title'>
                              <Link to={`/candidate/${el.id}`}>
                                {el.specification} {SKILLS[el.position_id]},{' '}
                                {LEVELS[el.level]}{' '}
                              </Link>
                            </h3>

                            {el.vc_text_short ? (
                                <div className='description__text'>
                                  {el.vc_text_short}
                                </div>
                            ) : (
                                <p className='description__text-secondary'>
                                  Описание отсутствует...
                                </p>
                            )}
                          </div>
                          <div className='col-12 col-xl-4'>
                            <Link to={`/candidate/${el.id}`}>
                              <button className='description__button'>
                                Подробное резюме
                              </button>
                            </Link>
                          </div>
                          <div className='col-xl-2'></div>
                          <div className='col-12 col-xl-6'>
                            <ul className='description__list'>
                              {Array.isArray(el?.skillValues) && el.skillValues.map((e) => (
                                  <li key={e.id} className='description__list-item'>
                                    {e.skill.name}
                                  </li>
                              ))}
                            </ul>
                            <img
                                className='description__rectangle'
                                src={rectangle}
                                alt=''
                            />
                          </div>
                          <div className='col-xl-4'></div>
                        </div>
                    ))
                ) : (
                    <div className='description__empty'>
                      {isLoadingMore
                          ? 'В данный момент в категории нет свободных специалистов'
                          : 'Загрузка...'}
                    </div>
                )}
              </ErrorBoundary>
            </div>

            <div className='row'>
              <div className='col-12'>
                <div className='description__footer'>
                  <div className='description__footer-btn'>
                    <button onClick={() => onLoadMore(2)}>
                      {isLoadingMore ? (
                          <Loader width={40} height={40}/>
                      ) : (
                          'Загрузить еще'
                      )}{' '}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
    )
  }

  return (
      <section className='description'>
        <div className='container'>
          <div className='description__wrapper'>
            <ErrorBoundary>
              {filteredListArr && Array.isArray(filteredListArr) && filteredListArr.length > 0
                  ? filteredListArr.map((el) => (
                      <div className='row' key={el.id}>
                        <div className='col-2'>
                          <img className='description__img' src={()=>urlForLocal(el?.photo)} alt=''/>
                        </div>
                        <div className='col-12 col-xl-6'>
                          <h3 className='description__title'>
                            <Link to={`/candidate/${el.id}`}>
                              {' '}
                              {el.specification} {SKILLS[el.position_id]},{' '}
                              {LEVELS[el.level]}{' '}
                            </Link>
                          </h3>

                          {el.vc_text_short ? (
                              <div className='description__text'>
                                {el.vc_text_short}
                              </div>
                          ) : (
                              <p className='description__text-secondary'>
                                Описание отсутствует...
                              </p>
                          )}
                        </div>
                        <div className='col-12 col-xl-4'>
                          <Link to={`/candidate/${el.id}`}>
                            <button className='description__button'>
                              Подробное резюме
                            </button>
                          </Link>
                        </div>
                        <div className='col-xl-2'></div>
                        <div className='col-12 col-xl-6'>
                          <ul className='description__list'>
                            {Array.isArray(el?.skillValues) && el.skillValues?.map((e) => (
                                <li key={e.id} className='description__list-item'>
                                  {e.skill.name}
                                </li>
                            ))}
                          </ul>
                          <img
                              className='description__rectangle'
                              src={rectangle}
                              alt=''
                          />
                        </div>
                        <div className='col-xl-4'></div>
                      </div>
                  ))
                  : /* : <div className={style.description__empty}>В данный момент в категории нет свободных специалистов</div> } */
                  candidatesListArr && Array.isArray(candidatesListArr) &&
                  candidatesListArr.map((el) => (
                      <div className='row' key={el.id}>
                        <div className='col-2'>
                          <img className='description__img' src={male} alt=''/>
                        </div>
                        <div className='col-12 col-xl-6'>
                          <h3 className='description__title'>
                            {SKILLS[el.position_id]}, {LEVELS[el.level]}
                          </h3>

                          {el.vc_text_short ? (
                              <div className='description__text'>
                                {el.vc_text_short}
                              </div>
                          ) : (
                              <p className='description__text-secondary'>
                                Описание отсутствует...
                              </p>
                          )}
                        </div>
                        <div className='col-12 col-xl-4'>
                          <Link to={`/candidate/${el.id}`}>
                            <button className='description__button'>
                              Подробное резюме
                            </button>
                          </Link>
                        </div>
                        <div className='col-xl-2'></div>
                        <div className='col-12 col-xl-6'>
                          <ul className='description__list'>
                            {Array.isArray(el?.skillValues) && el.skillValues?.map((e) => (
                                <li key={e.id} className='description__list-item'>
                                  {e.skill.name}
                                </li>
                            ))}
                          </ul>
                          <img
                              className='description__rectangle'
                              src={rectangle}
                              alt=''
                          />
                        </div>
                        <div className='col-xl-4'></div>
                      </div>
                  ))}
            </ErrorBoundary>
          </div>

          <div className='row'>
            <div className='col-12'>
              <div className='description__footer'>
                <div className='description__footer-btn'>
                  {candidatesListArr &&
                  filteredListArr.length === 0 ? (
                      <button onClick={() => onLoadMore(2)}>Загрузить еще</button>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  )
};

export default Description
