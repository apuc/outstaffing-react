import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { questionnairesSelector, setQuestionnaires } from "../../redux/quizSlice";
import { ProfileHeader } from '../../components/ProfileHeader/ProfileHeader';
import { HeadBottom } from '../../components/features/Candidate-lk/HeadBottom';
import { ProfileBreadcrumbs } from '../../components/ProfileBreadcrumbs/ProfileBreadcrumbs';
import './quiz-page.scss'
import { SelectedCategory } from '../../components/features/quiz/SelectedCategory';
import { Footer } from '../../components/Footer/Footer';
import { Link } from 'react-router-dom';
import { CardAvailableTest } from '../../components/features/quiz/CardAviableTest';
import { apiRequest } from '../../api/request';
import CategoriesItem from '../../components/CategoriesItem/CategoriesItem';

import BackEndImg from "../../pages/PartnerСategories/images/personalBackEnd.png"
import FrontendImg from "../../pages/PartnerСategories/images/PersonalFrontend.png"
import ArchitectureImg from "../../pages/PartnerСategories/images/PersonalArchitecture.png"
import DesignImg from "../../pages/PartnerСategories/images/PersonalDesign.png"
import TestImg from "../../pages/PartnerСategories/images/PersonalTesters.png"
import AdminImg from "../../pages/PartnerСategories/images/PersonalAdmin.png"
import ManageImg from "../../pages/PartnerСategories/images/PersonalMng.png"
import CopyImg from "../../pages/PartnerСategories/images/PersonalCopy.png"
import SmmImg from "../../pages/PartnerСategories/images/PersonalSMM.png"

export const QuizPage = () => {

   const questionnaires = useSelector(questionnairesSelector)
   const dispatch = useDispatch()
   const [personalInfoItems] = useState([
      {
         title: 'Backend разработчики',
         link: '/registration-candidate',
         description: 'Java PHP Python C# React Vue.js NodeJs Golang Ruby JavaScript',
         available: true,
         img: BackEndImg
      },
      {
         title: 'Frontend разработчики',
         link: '/registration-candidate',
         description: 'Java PHP Python C# React Vue.js NodeJs Golang Ruby JavaScript',
         available: true,
         img: FrontendImg
      },
      {
         title: 'Архитектура проектов',
         link: '/registration-candidate',
         description: 'Потоки данных ER ERP CRM CQRS UML BPMN',
         available: true,
         img: ArchitectureImg
      },
      {
         title: 'Дизайн проектов',
         link: '/registration-candidate',
         description: 'Java PHP Python C# React Vue.js NodeJs Golang Ruby JavaScript',
         available: true,
         img: DesignImg
      },
      {
         title: 'Тестирование проектов',
         link: '/registration-candidate',
         description: 'SQL Postman TestRail Kibana Ручное тестирование',
         available: false,
         img: TestImg
      },
      {
         title: 'Администрирование проектов',
         link: '/registration-candidate',
         description: 'DevOps ELK Kubernetes Docker Bash Apache Oracle Git',
         available: false,
         img: AdminImg
      },
      {
         title: 'Управление проектом',
         link: '/registration-candidate',
         description: 'Scrum Kanban Agile Miro CustDev',
         available: false,
         img: ManageImg
      },
      {
         title: 'Копирайтинг проектов',
         link: '/registration-candidate',
         description: 'Теги Заголовок H1 Дескриптор Абзац Сценарий',
         available: false,
         img: CopyImg
      },
      {
         title: 'Реклама и SMM',
         link: '/registration-candidate',
         description: 'Java PHP Python C# React Vue.js NodeJs Golang Ruby JavaScript',
         available: false,
         img: SmmImg
      },
   ]);
   const userId = localStorage.getItem('id')
   const [selectedCategory, setsetSelectedCategory] = useState(false)

   useEffect(() => {
      apiRequest(`/user-questionnaire/questionnaires-list?user_id=${107}`)
         .then(res => dispatch(setQuestionnaires(res)))
   }, [])

   return (
      <div className='quiz-page'>
         <ProfileHeader />
         <HeadBottom />
         <div className="quiz-page__container">
            <ProfileBreadcrumbs links={[{ name: 'Главная', link: '/profile-candidate' }, { name: 'Тестирование', link: '/quiz' }]} />
            <div className="quiz-page__title main-title">{!selectedCategory ? 'Тестирование' : 'Замена специализации'}</div>
            {!selectedCategory && <>
               <div className="quiz-page__specialization">
                  <SelectedCategory setSelectedCategory={setsetSelectedCategory} />
               </div>
               <div className="quiz-page__block">
                  Доступные тесты
               </div>
               <div className="quiz-page__cards-test">
                  {
                     questionnaires.length ? questionnaires.map((item, index) => (
                        <CardAvailableTest
                           description={'Вы новичок с реальным опытом работы до 1 года, или без опыта'}
                           path={'quiz/test'}
                           status={item.status}
                           title={item.questionnaire_title}
                           passedTest={item.passedTest}
                           key={index}
                        />)) : <h1>Анкет нет</h1>
                  }
               </div>
               <div className="block-text">
                  ИЛИ <Link to={''} >выполните тестове задание</Link> , без прохождения тестов
               </div>
            </>}

            {selectedCategory && <div className="quiz-page__categories-items">
               {personalInfoItems.map((item, index) => {
                  return <CategoriesItem link={item.link} key={index} title={item.title} img={item.img} skills={item.description} available={item.available} />
               })
               }
            </div>}
         </div>
         <Footer />
      </div>
   )
}