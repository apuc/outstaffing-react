import React from 'react';
import style from './Outstaffing.module.scss';
import front from '../../../images/front_end.png';
import back from '../../../images/back_end.png';
import design from '../../../images/design.png';

const Outstaffing = () => {
  return (
    <section className={style.outstaffing}>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className={style.outstaffing__title}>
              <h2>
                <span>Аутстаффинг</span> it-персонала
              </h2>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-4">
            <div className={style.outstaffing__box}>
              <img src={front} alt="" />
              <p># Популярный стек </p>
              <ul className={style.items}>
                <li>Ruby on Rails</li>
                <li>Nginx</li>
                <li>Docker</li>
                <li>PostgreSQL</li>
                <li>Git</li>
                <li>Typescript</li>
                <li>ReactJS</li>
              </ul>
            </div>
          </div>

          <div className="col-4">
            <div className={style.outstaffing__box}>
              <img src={back} alt="" />
              <p># Популярный стек</p>

              <ul className={style.items}>
                <li>Ruby on Rails</li>
                <li>Nginx</li>
                <li>Docker</li>
                <li>PostgreSQL</li>
                <li>Git</li>
                <li>Typescript</li>
                <li>ReactJS</li>
              </ul>
            </div>
          </div>

          <div className="col-4">
            <div className={style.outstaffing__box}>
              <img src={design} alt="" />
              <p># Популярный стек</p>

              <ul className={style.items}>
                <li>Ruby on Rails</li>
                <li>Nginx</li>
                <li>Docker</li>
                <li>PostgreSQL</li>
                <li>Git</li>
                <li>Typescript</li>
                <li>ReactJS</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Outstaffing;
