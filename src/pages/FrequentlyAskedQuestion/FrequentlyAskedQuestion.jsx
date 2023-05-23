import { useNavigate, useParams } from "react-router";
import { ProfileBreadcrumbs } from "../../components/ProfileBreadcrumbs/ProfileBreadcrumbs";
import SideBar from "../../components/SideBar/SideBar";
import AuthHeader from "../../components/AuthHeader/AuthHeader";
import { Footer } from "../../components/Footer/Footer";
import arrowBtn from "../../images/arrowRight.png";
import "./FrequentlyAskedQuestion.scss";
import { useEffect, useState } from "react";
import {
  FREQUENTLY_ASKED_QUESTIONS_ROUTE,
  FREQUENTLY_ASKED_QUESTION_ROUTE,
} from "../../constants/router-path";

export const FrequentlyAskedQuestion = () => {
  const params = useParams();
  const navigate = useNavigate()
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
              link: FREQUENTLY_ASKED_QUESTIONS_ROUTE,
            },
            {
              name: question.title,
              link: FREQUENTLY_ASKED_QUESTION_ROUTE + "/" + params.id,
            },
          ]}
        />
        <div className="frequently-asked-question__title">{question.title}</div>
        <div className="frequently-asked-question__back" onClick={()=>navigate(-1)}>
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
