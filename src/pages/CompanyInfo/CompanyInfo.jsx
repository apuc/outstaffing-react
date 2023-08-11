import React from "react";

import AuthHeader from "@components/Common/AuthHeader/AuthHeader";
import { Footer } from "@components/Common/Footer/Footer";
import SideBar from "@components/SideBar/SideBar";

import arrow from "assets/icons/arrows/arrowRight.svg";
import countingImg from "assets/icons/companyCountingBlockImg.svg";
import braceImg from "assets/images/countingBlockBrace.png";
import calcImg from "assets/images/countingBlockCalcImg.png";

import "./companyInfo.scss";

export const CompanyInfo = () => {
  return (
    <div className="companyInfo">
      <AuthHeader />
      <SideBar />
      <div className="companyInfo__content">
        <div className="container">
          <h1 className="companyInfo__title">
            <span>Арендуйте IT специалистов:</span>
            <br />
            быстро, выгодно, на любой срок.
          </h1>
          <div className="arrowElement arrowDown">
            <img src={arrow} alt="arrow" />
          </div>
          <p className="companyInfo__subTitle">
            Мы предоставляем вам «в аренду» it-специалистов. При этом они
            находятся в нашем штате. Оплата происходит за отработанные часы
          </p>
          <div className="companyInfo__info">
            <div className="companyInfo__countingBlock">
              <div className="companyInfo__countingBlock__head">
                <img src={countingImg} alt="countingImg" />
                <div className="countingBlock__info">
                  <h3 className="countingBlock__title">
                    Экономия бюджета компании - главное преимущество аутстафинга
                  </h3>
                  <p className="countingBlock__subTitle">
                    Приблизительный просчет дал результаты в экономии до 50%
                    бюджета
                  </p>
                </div>
                <div className="arrowElement">
                  <img src={arrow} alt="arrow" />
                </div>
              </div>
              <div className="companyInfo__countingBlock__bottom">
                <span className="titleBottom">Давайте просчитаем:</span>
                <p className="subTitleBottom">
                  Оплата работы <span>разработчика</span> в штат 1500 руб/ч (250
                  000 руб/мес).
                </p>
              </div>
              <img className="countingBlockImg" src={calcImg} alt="calc" />
            </div>
            <div className="companyInfo__info__img">
              <img src={braceImg} alt="brace" />
            </div>
            <div className="companyInfo__info__items">
              <div className="info__item">
                <ul>
                  <li>НДФЛ (13% от зарплаты)</li>
                  <li>взносы в ПФР (22% от заработка)</li>
                  <li>взносы в ФСС (3%)</li>
                  <li>взносы в ОМС (5%)</li>
                </ul>
              </div>
              <div className="info__item">
                <ul>
                  <li>Закупка рабочего оборудования.</li>
                  <li>
                    Расходы на рекрутмент (10% от гросс либо 1−2 оклада для
                    штатного HR), затраты на размещение вакансий
                  </li>
                  <li>Затраты на обучения, аренду, амортизацию оборудования</li>
                </ul>
              </div>
            </div>
            <div className="companyInfo__info__total">
              <span className="companyInfo__info__total__title">
                В итоге у нас получается:
              </span>
              <div className="companyInfo__info__total__text">
                <p>
                  Специалист с изначальной расценкой в 1 500 руб/ч с учетом всех
                  остальных расходов
                  <span>
                    {" "}
                    будет стоить для <br />
                    компании около 3 000 руб/ч.
                  </span>
                </p>
                <p>
                  Услуги IT-аутстаффинга персонала позволяют сократить эти
                  расходы. Мы разбираемся с налогами, обучением, техникой — вы
                  оплачиваете только почасовую работу сотрудника.
                </p>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};
