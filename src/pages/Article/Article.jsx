import React, { useState } from "react";
import { Link } from "react-router-dom";

import AuthHeader from "@components/Common/AuthHeader/AuthHeader";
import SideBar from "@components/SideBar/SideBar";
import { Footer } from "@components/Common/Footer/Footer";
import { ProfileBreadcrumbs } from "@components/ProfileBreadcrumbs/ProfileBreadcrumbs";
import CardArticle from "@components/CardArticle/CardArticle";

import mockImgArticle from "assets/images/mock/mockImgArticle.png";
import rightArrow from "assets/icons/arrows/left-arrow.png";
import yandexZen from "assets/icons/yandexZen.svg";
import cardCalendar from "assets/icons/cardCalendar.svg";
import cardImg1 from "assets/images/mock/cardArticleItem.png";
import cardImg2 from "assets/images/mock/cardArticleItem2.png";
import cardImg3 from "assets/images/mock/cardArticleItem3.png";

import "./article.scss";

export const Article = ({}) => {
  const [article] = useState([
    {
      image: cardImg1,
      title: "Аутстаффинг джунов: почему это выгодно",
      data: "1 марта, 2023",
    },
    {
      image: cardImg2,
      title: "Аутстаффинг джунов: почему это выгодно",
      data: "1 марта, 2023",
    },
    {
      image: cardImg3,
      title: "Аутстаффинг джунов: почему это выгодно",
      data: "1 марта, 2023",
    },
  ]);

  return (
    <div className="article-blog">
      <AuthHeader />
      <SideBar />
      <div className="container">
        <div className="article-blog__breadCrumbs">
          <ProfileBreadcrumbs
            links={[
              { name: "Главная", link: "/auth" },
              { name: "Блог", link: "/blog" },
              {
                name: "Аутстаффинг джунов: почему это выгодно",
                link: "/blog",
              },
            ]}
          />
        </div>
        <div className="article-blog__title">
          <h1>Аутстаффинг джунов: почему это выгодно</h1>
        </div>

        <div className="article-blog__return">
          <Link to={"/blog"} className="article-blog__return-link">
            <div className="article-blog__return-arrow">
              <img src={rightArrow} />
            </div>
            <span>вернуться к списку статей</span>
          </Link>
        </div>

        <div className="article-blog__body">
          <div className="article-blog__body-text">
            <p>
              Нет, мы работаем только с юридическими лицами и индивидуальными
              предпринимателями и тщательно проверяем своих партнеров.
              Партнерами являются агентства, которые специализируются на
              оказании услуг в формате аутстафф-модели и обладают глубокой
              экспертизой в разработке и внедрении ИТ-проектов.
            </p>
          </div>
          <img src={mockImgArticle} className="article-blog__body-img" />
          <div className="article-blog__body-text">
            <p>
              С одной стороны, зарплаты в сфере разработки растут, с другой
              стороны, появляется огромное количество новичков, которые хотят
              легко и просто войти в ИТ-сферу на волне востребованности и
              больших зарплат. Разумеется, это приводит к осторожному отношению
              работодателя к выпускникам различных курсов. Нет такого курса,
              который даст на 100% готового джуна, слишком многое завязано на
              личной инициативе, обучаемости и желании.
            </p>
            <br />
            <p>
              В итоге получается, что взгляды работодателя и потенциального
              сотрудника расходятся: работодатель не хочет открывать ящик
              пандоры, на который нужно тратить время, а работник, только
              прошедший курсы, испытывает эффект завышенных ожиданий и имеет
              зачастую неадекватные запросы.
            </p>
          </div>
          <div className="article-blog__body-footer">
            <div className="yandex">
              <img src={yandexZen} />
              <div className="yandex__text">
                <p>Читать на Дзен</p>
                <span>dzen.ru</span>
              </div>
            </div>
            <div className="publication-date">
              <img src={cardCalendar} />
              <p>1 марта, 2023</p>
            </div>
          </div>
          <div className="more-articles">
            <h1>Читайте также</h1>
            <div className="more-articles__arrow">
              <img src={rightArrow} />
            </div>
          </div>
          <div className="blog__body">
            {article.map((item, index) => {
              return (
                <CardArticle
                  images={item.image}
                  title={item.title}
                  data={item.data}
                  key={index}
                  id={index}
                />
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Article;
