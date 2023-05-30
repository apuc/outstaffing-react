import React, { useState } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";

import BaseButton from "@components/Common/BaseButton/BaseButton";

import mockWorker from "assets/images/mock/mokPerson.png";

import "./sliderWorkers.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const SliderWorkers = ({ title, titleInfo, subTitle }) => {
  const [workers] = useState([
    {
      avatar: mockWorker,
      skils: "React / Vue Front end, Middle разработчик",
    },
    {
      avatar: mockWorker,
      skils: "Vue / React Front end, Senior разработчик",
    },
    {
      avatar: mockWorker,
      skils: "NodeJs  Fullstack, Middle разработчик",
    },
    {
      avatar: mockWorker,
      skils: "React / Vue Front end, Middle разработчик",
    },
    {
      avatar: mockWorker,
      skils: "React / PHP Fullstack, Middle разработчик",
    },
  ]);

  const settings = {
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4500,
  };

  if (window.innerWidth < 575) {
    settings.slidesToShow = 1;
  } else if (window.innerWidth < 1440) {
    settings.slidesToShow = 2;
  }

  return (
    <div className="slider-workers">
      <div className="container">
        {Boolean(title) ? (
          <div className="slider-workers__title">
            <h2>{title}</h2>
            <h3>{titleInfo}</h3>
          </div>
        ) : (
          ""
        )}
        <Slider {...settings}>
          {workers.map((worker, index) => {
            return (
              <div className="worker" key={index}>
                <img src={worker.avatar}></img>
                <div className="worker-description">
                  <p>{worker.skils}</p>
                  <BaseButton styles="worker__resume">
                    <Link to={`/worker/${index}`}>Подробное резюме</Link>
                  </BaseButton>
                </div>
              </div>
            );
          })}
        </Slider>
        {Boolean(subTitle) ? (
          <div className="slider-workers__description">
            <h2>Дополните свою команду опытными ИТ-специалистами</h2>
            <p>
              Даём финансовые, юридические и кадровые гарантии, предоставляем
              SLA и отвечаем за работу команды. Вам не нужно искать, оформлять
              или увольнять сотрудника — все хлопоты мы берем на себя.
            </p>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default SliderWorkers;
