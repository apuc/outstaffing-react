import React, { useState } from "react";

import CardArticle from "@components/CardArticle/CardArticle";
import AuthHeader from "@components/Common/AuthHeader/AuthHeader";
import { Footer } from "@components/Common/Footer/Footer";
import { ProfileBreadcrumbs } from "@components/ProfileBreadcrumbs/ProfileBreadcrumbs";
import SideBar from "@components/SideBar/SideBar";

import blogArrow from "assets/icons/arrows/blogArrow.svg";
import cardImg2 from "assets/images/mock/cardArticleItem2.png";
import cardImg3 from "assets/images/mock/cardArticleItem3.png";
import cardImg4 from "assets/images/mock/cardArticleItem4.png";
import cardImg5 from "assets/images/mock/cardArticleItem5.png";
import cardImg6 from "assets/images/mock/cardArticleItem6.png";
import cardImg1 from "assets/images/mock/cardArticleItem.png";

import "./blog.scss";

export const Blog = () => {
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
          <div>
            <h1>Блог</h1>
            <img src={blogArrow} className="blog__title-arrow" />
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

        <div className="blog__load-more">
          <button>Загрузить еще</button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Blog;
