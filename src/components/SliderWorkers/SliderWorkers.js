import React, { useState } from "react";
import Slider from "react-slick";

import mockWorker from "../../images/mokPerson.png";

import "./sliderWorkers.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const SliderWorkers = ({}) => {
  const [workers] = useState([
    {
      avatar: mockWorker,
      skils: "React / Vue Front end, Middle разработчик",
    },
    {
      avatar: mockWorker,
      skils: "React / Vue Front end, Middle разработчик",
    },
    {
      avatar: mockWorker,
      skils: "React / Vue Front end, Middle разработчик",
    },
    {
      avatar: mockWorker,
      skils: "React / Vue Front end, Middle разработчик",
    },
    {
      avatar: mockWorker,
      skils: "React / Vue Front end, Middle разработчик",
    },
  ]);
  const settings = {
    infinite: true,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  if (window.innerWidth < 575) {
    settings.slidesToShow = 1;
  }

  return (
    <div className="slider-workers">
      <div className="container">
        <div className="slider-workers__title">
          <h2>Свободные разработчики </h2>
          <h3> для Вашей команды</h3>
        </div>

        <Slider {...settings}>
          {workers.map((worker) => {
            return (
              <div className="worker">
                <img src={worker.avatar}></img>
                <div className="worker-description">
                  <p>{worker.skils}</p>
                  <button className="worker__resume">Подробное резюме</button>
                </div>
              </div>
            );
          })}
        </Slider>

        <div className="slider-workers__description">
          <h2>Дополните свою команду опытными ИТ-специалистами</h2>
          <p>
            Даём финансовые, юридические и кадровые гарантии, предоставляем SLA
            и отвечаем за работу команды. Вам не нужно искать, оформлять или
            увольнять сотрудника — все хлопоты мы берем на себя.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SliderWorkers;
