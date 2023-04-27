import React from "react";

import AuthHeader from "../../components/AuthHeader/AuthHeader";
import SideBar from "../../components/SideBar/SideBar";
import { ProfileBreadcrumbs } from "../../components/ProfileBreadcrumbs/ProfileBreadcrumbs";
import { Footer } from "../../components/Footer/Footer";

import arrowRight from "../../images/arrowRight.png";

import "./blog.scss";

export const Blog = ({}) => {
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
      </div>

      <Footer />
    </div>
  );
};

export default Blog;
