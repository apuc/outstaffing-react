import React, { useState } from "react";

import AuthHeader from "../../components/AuthHeader/AuthHeader";
import SideBar from "../../components/SideBar/SideBar";
import { ProfileBreadcrumbs } from "../../components/ProfileBreadcrumbs/ProfileBreadcrumbs";
import { Footer } from "../../components/Footer/Footer";
import CardArticle from "../../components/UI/CardArticle/CardArticle";

import arrowRight from "../../images/arrowRight.png";
import cardImg1 from "../../images/cardArticleItem.png";
import cardImg2 from "../../images/cardArticleItem2.png";
import cardImg3 from "../../images/cardArticleItem3.png";
import cardImg4 from "../../images/cardArticleItem4.png";
import cardImg5 from "../../images/cardArticleItem5.png";
import cardImg6 from "../../images/cardArticleItem6.png";

import "./blog.scss";

export const Blog = ({}) => {
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
    {
      image: cardImg4,
      title: "Аутстаффинг джунов: почему это выгодно",
      data: "1 марта, 2023",
    },
    {
      image: cardImg5,
      title: "Аутстаффинг джунов: почему это выгодно",
      data: "1 марта, 2023",
    },
    {
      image: cardImg6,
      title: "Аутстаффинг джунов: почему это выгодно",
      data: "1 марта, 2023",
    },
  ]);

  return (
    <div className="blog">
      <AuthHeader />
      <SideBar />

      <div className="container">
        <div className="blog__breadCrumbs">
          <ProfileBreadcrumbs
            links={[
              { name: "Главная", link: "/auth" },
              { name: "Блог", link: "/blog" },
            ]}
          />
        </div>

        <div className="blog__title">
          <h1>Блог</h1>
          <div className="blog__title-arrow">
            <img src={arrowRight} />
          </div>
          <h3>
            Из первых уст рассказываем о себе пользователям, делимся полезными и
            важными материалами, стремимся получать обратную связь
          </h3>
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

      <Footer />
    </div>
  );
};

export default Blog;
