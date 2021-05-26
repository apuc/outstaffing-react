import React from 'react';
import { useHistory } from 'react-router-dom';
import style from './Candidate.module.scss';
// import { candidatesList } from '../Home/sections/Description';
import icon from '../../images/front_end.png';
import arrow from '../../images/right-arrow.png';

import classes from './Candidate.module.scss';

const Candidate = () => {
  const history = useHistory();

  // const { id: candidateId } = useParams();

  // const currentCandidate = candidatesList.find((el) => el.id === Number(candidateId));

  return (
    <section className={classes.candidate}>
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
                <img src={arrow} alt="" />
                <span>Вернуться к списку</span>
              </div>

              <div className="icon">
                <img src={icon} alt="" />
              </div>
            </div>
          </div>
        </div>
        <div className={style.candidate__main}>
          <div className="row">
            <div className="col-4">
              <div className="">
                <p>
                  sddddddddddddddddddddddddddddddddd <br /> ddddddddddddddddddddddddddd <br />
                  ddddddddddddddddddd
                </p>
              </div>
            </div>

            <div className="col-8">
              <div className="">
                <p>
                  sddddddddddddddddddddddddddddddddd <br /> ddddddddddddddddddddddddddd <br />
                  ddddddddddddddddddd
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <h1>
        Candidate name: <span>{currentCandidate.name}</span>
      </h1> */}
    </section>
  );
};

export default Candidate;
