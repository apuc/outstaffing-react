import React, {useState} from 'react';
import {Link} from "react-router-dom";

import {ProfileHeader} from "../../components/ProfileHeader/ProfileHeader";
import {ProfileBreadcrumbs} from "../../components/ProfileBreadcrumbs/ProfileBreadcrumbs"
import {Footer} from "../../components/Footer/Footer";

import BackEndImg from "./images/personalBackEnd.png"
import FrontendImg from "./images/PersonalFrontend.png"
import ArchitectureImg from "./images/PersonalArchitecture.png"
import DesignImg from "./images/PersonalDesign.png"
import TestImg from "./images/PersonalTesters.png"
import AdminImg from "./images/PersonalAdmin.png"
import ManageImg from "./images/PersonalMng.png"
import CopyImg from "./images/PersonalCopy.png"
import SmmImg from "./images/PersonalSMM.png"
import rightArrow from "../../images/arrowRight.png"

import {Navigate} from "react-router-dom";

import "./parthnerPersonalInfo.scss"

export const PartnerPersonalInfo = () => {
    if(localStorage.getItem('role_status') !== '18') {
        return <Navigate to="/profile" replace/>
    }

    const [personalInfoItems] = useState([
        {
            title: 'Backend разработчики',
            link: '/profile',
            description: 'Java PHP Python C# React Vue.js NodeJs Golang Ruby JavaScript',
            available: true,
            img: BackEndImg
        },
        {
            title: 'Frontend разработчики',
            link: '/profile',
            description: 'Java PHP Python C# React Vue.js NodeJs Golang Ruby JavaScript',
            available: true,
            img: FrontendImg
        },
        {
            title: 'Архитектура проектов',
            link: '/profile',
            description: 'Потоки данных ER ERP CRM CQRS UML BPMN',
            available: true,
            img: ArchitectureImg
        },
        {
            title: 'Дизайн проектов',
            link: '/profile',
            description: 'Java PHP Python C# React Vue.js NodeJs Golang Ruby JavaScript',
            available: true,
            img: DesignImg
        },
        {
            title: 'Тестирование проектов',
            link: '/profile',
            description: 'SQL Postman TestRail Kibana Ручное тестирование',
            available: false,
            img: TestImg
        },
        {
            title: 'Администрирование проектов',
            link: '/profile',
            description: 'DevOps ELK Kubernetes Docker Bash Apache Oracle Git',
            available: false,
            img: AdminImg
        },
        {
            title: 'Управление проектом',
            link: '/profile',
            description: 'Scrum Kanban Agile Miro CustDev',
            available: false,
            img: ManageImg
        },
        {
            title: 'Копирайтинг проектов',
            link: '/profile',
            description: 'Теги Заголовок H1 Дескриптор Абзац Сценарий',
            available: false,
            img: CopyImg
        },
        {
            title: 'Реклама и SMM',
            link: '/profile',
            description: 'Java PHP Python C# React Vue.js NodeJs Golang Ruby JavaScript',
            available: false,
            img: SmmImg
        },
    ])
    return (
        <div className="infoPersonal">
            <ProfileHeader />
            <div className="container">
                <ProfileBreadcrumbs links={[
                    {name: 'Главная', link: '/profile'},
                    {name: 'Данные моего персонала', link: '/profile/employees'},
                ]}
                />
                <h2 className="infoPersonal__title">Данные персонала</h2>
                <div className="infoPersonal__items">
                    {personalInfoItems.map((item, index) => {
                        return <Link to={item.link} className={item.available ? "infoPersonal__item item" : "infoPersonal__item item item__disable"}>
                            <div className="item__title">
                                <img src={item.img} alt={item.title} />
                                <h4>{item.title}</h4>
                            </div>
                            <div className="item__info">
                                <p>{item.description}</p>
                                <div className='more'>
                                    <img src={rightArrow} alt="arrow" />
                                </div>
                            </div>
                            {!item.available &&
                                <div className="item__disableHover">
                                    <p>У вас нет персонала из категории</p>
                                    <button>Подобрать</button>
                                </div>
                            }
                        </Link>
                    })}
                </div>
            </div>
            <Footer/>
        </div>
    )
}
