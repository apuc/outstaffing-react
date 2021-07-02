import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectCandidates, currentCandidate, selectCurrentCandidate } from '../../redux/outstaffingSlice';
import style from './Candidate.module.css';
import arrow from '../../images/right-arrow.png';
import rectangle from '../../images/rectangle_secondPage.png';
import Sidebar from '../Sidebar/Sidebar';
import SectionSkills from './SectionSkills';

const Candidate = () => {
  const history = useHistory();
  const { id: candidateId } = useParams();

  const dispatch = useDispatch();

  const candidatesArr = useSelector(selectCandidates);
  dispatch(currentCandidate(candidatesArr.find((el) => Number(el.id) === Number(candidateId))));
  const currentCandidateObj = useSelector(selectCurrentCandidate);

  const { name, skillsName, img, skills } = currentCandidateObj;

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
                <p className={style.hashtag}># Описание опыта</p>
                <div className={style.SectionOne}>
                  <h3>SVM - сервис выездных менеджеров для банка ПСБ</h3>
                  <p>
                    Приложение, которое позволяет управлять работой т.н. выездных менеджеров (ВМ). Банк предоставляет их
                    услуги своим (потенциальным или реальным) клиентам, позволяя подключать расчетно-кассовое
                    обслуживание или регистрировать свой бизнес. Клиенту не нужно приходить в отделение/офис банка - все
                    необходимые бумаги ВМ подготовит заранее и принесет на согласование и подпись в удобное ему (клиент)
                    время и место.
                  </p>
                  <h4>Senior PHP/JS Developer</h4>
                </div>
                <p className={style.hashtag}># Средства и инструменты:</p>
                <div className={style.SectionTwo}>
                  <p>
                    - Разработал и внедрил веб приложения, а также программное обеспечение с использованием Node.js,
                    MySQL, JavaScript, HTML, CSS, React.js и Vue.JS. - Поддерживал существующий веб-сайт на базе PHP.
                    Перевел существующую платформу с Laravel на современную архитектуру React/Redux и Node.
                  </p>
                  <p>
                    - Проектировал и разрабатывал компоненты пользовательского интерфейса с использованием HTML, CSS и
                    JavaScript. - Повысил скорость загрузки веб-сайта и время безотказной работы за счете переписывания
                    всех основных компонентов и внедрения новой архетиктуры. - Разработал персональное APIs.
                  </p>
                </div>
                <p className={style.hashtag}># Описание опыта</p>
                <div className={style.SectionThree}>
                  <h3>Multitur - личный кабинет для сервиса поиска/подбора отелей</h3>
                  <p>
                    Личный кабинет для сотрудников отелей, который позволяет управлять информацией по отелю на сайте.
                  </p>
                  <h4>Senior PHP/JS Developer</h4>
                </div>
                <div className={style.SectionFour}>
                  <p className={style.hashtag}># Средства и инструменты:</p>
                  <p>Backend - REST API на PHP 7.1 с использованием фреймворка Laravel 5.8</p>
                  <p>Frontend - Vue.js</p>
                  <p>БД - MYSQL</p>
                </div>
                <p className={style.hashtag}># Функционал:</p>
                <>
                  <div className={style.SectionFive}>
                    <p>Регистрации/авторизации;</p>
                    <p>Управления правами менеджеров отеля, назначение поставщиков</p>
                    <p>Управления описанием и профилем отелей;</p>
                    <p>Управления финансами, ценообразованием, квотами;</p>
                    <p>Переписки со своими менеджерами, а также с вышестоящими инстанциями;</p>
                    <p>Управления новостями отеля;</p>
                    <p>Просмотра расширенной статистики по заявкам и людям;</p>
                  </div>
                  <button type="submit" className={style.SectionFive__btn}>
                    Выбрать к собеседованию
                  </button>
                </>
                <SectionSkills skillsArr={skills} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Candidate;
