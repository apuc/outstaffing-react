import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import AuthHeader from "@components/Common/AuthHeader/AuthHeader";
import { Footer } from "@components/Common/Footer/Footer";
import { ProfileBreadcrumbs } from "@components/ProfileBreadcrumbs/ProfileBreadcrumbs";
import SideBar from "@components/SideBar/SideBar";

import arrowBtn from "assets/icons/arrows/arrowRight.svg";

import "./FrequentlyAskedQuestion.scss";

export const FrequentlyAskedQuestion = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [question, setQuestion] = useState({
    id: params.id,
    title: "Это фриланс-платформа?",
    answer:
      "Нет, мы работаем только с юридическими лицами и индивидуальными предпринимателями и тщательно проверяем своих партнеров. Партнерами являются агентства, которые специализируются на оказании услуг в формате аутстафф-модели и обладают глубокой экспертизой в разработке и внедрении ИТ-проектов.",
  });

  useEffect(() => {
    //тут запрос
  }, []);

  return (
    <div className="frequently-asked-question">
      <AuthHeader />
      <SideBar />
      <div className="frequently-asked-question__container container">
        <ProfileBreadcrumbs
          links={[
            { name: "Главная", link: "/auth" },
            {
              name: "FAQ (часто задаваемые вопросы)",
              link: "/frequently-asked-questions",
            },
            {
              name: question.title,
              link: `/frequently-asked-question/${params.id}`,
            },
          ]}
        />
        <div className="frequently-asked-question__title">{question.title}</div>
        <div
          className="frequently-asked-question__back"
          onClick={() => navigate(-1)}
        >
          <div className="frequently-asked-question__arrow">
            <img src={arrowBtn}></img>
          </div>
          <p>вернуться к списку вопросов</p>
        </div>
        <div className="frequently-asked-question__answer">
          <p>{question.answer}</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};
