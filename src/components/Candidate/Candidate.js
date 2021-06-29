import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import style from './Candidate.module.css';
import arrow from '../../images/right-arrow.png';
import rectangle from '../../images/rectangle_secondPage.png';
import Sidebar from '../Sidebar/Sidebar';
import SectionOne from './sections/SectionOne';
import SectionTwo from './sections/SectionTwo';
import SectionThree from './sections/SectionThree';
import SectionFour from './sections/SectionFour';
import SectionFive from './sections/SectionFive';
import SectionSkills from './sections/SectionSkills';

const Candidate = ({ candidatesArr }) => {
  const history = useHistory();

  const { id: candidateId } = useParams();

  const currentCandidate = candidatesArr.find((el) => Number(el.id) === Number(candidateId));

  const { name, skillsName, img } = currentCandidate;

  let classes;

  if (skillsName === 'Backend') {
    classes = style.back;
    console.log(classes);
  } else if (skillsName === 'Design') {
    classes = style.des;
  } else if (skillsName === 'Frontend') {
    classes = style.front;
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
                <h3>{skillsName}</h3>
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
                <h2>{name}</h2>
                <img src={rectangle} alt="" />
                <p># Описание опыта</p>
                <SectionOne />
                <p># Средства и инструменты:</p>
                <SectionTwo />
                <p># Описание опыта</p>
                <SectionThree />
                <p># Средства и инструменты:</p>
                <SectionFour />
                <p># Функционал:</p>
                <SectionFive />
                <SectionSkills />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Candidate;
