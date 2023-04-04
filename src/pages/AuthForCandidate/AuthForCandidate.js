import React, {useEffect, useRef, useState} from "react";
import {loading, selectIsLoading} from "../../redux/loaderSlice";
import {apiRequest} from "../../api/request";
import {auth, selectAuth, setUserInfo} from "../../redux/outstaffingSlice";
import {setRole} from "../../redux/roleSlice";
import {useDispatch, useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";

import AuthHeader from "../../components/AuthHeader/AuthHeader";
import SideBar from "../../components/SideBar/SideBar";
import CategoriesItem from "../../components/CategoriesItem/CategoriesItem"
import StepsForCandidate from "../../components/StepsForCandidate/StepsForCandidate"
import {Footer} from "../../components/Footer/Footer";

import BackEndImg from "../../pages/PartnerСategories/images/personalBackEnd.png"
import FrontendImg from "../../pages/PartnerСategories/images/PersonalFrontend.png"
import ArchitectureImg from "../../pages/PartnerСategories/images/PersonalArchitecture.png"
import DesignImg from "../../pages/PartnerСategories/images/PersonalDesign.png"
import TestImg from "../../pages/PartnerСategories/images/PersonalTesters.png"
import AdminImg from "../../pages/PartnerСategories/images/PersonalAdmin.png"
import ManageImg from "../../pages/PartnerСategories/images/PersonalMng.png"
import CopyImg from "../../pages/PartnerСategories/images/PersonalCopy.png"
import SmmImg from "../../pages/PartnerСategories/images/PersonalSMM.png"

import authImg from "../../images/authCandidateFormImg.png"
import arrowBtn from "../../images/arrowRight.png";

import './authForCandidate.scss';

export const AuthForCandidate = () => {

    const isLoading = useSelector(selectIsLoading);
    const ref = useRef();
    const dispatch = useDispatch();
    const isAuth = useSelector(selectAuth);
    let navigate = useNavigate();
    const getToken = localStorage.getItem("auth_token");

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

    useEffect(() => {
        if (isAuth || getToken) {
            navigate("/profile");
        }
    }, [getToken]);

    const submitHandler = () => {
        let formData = new FormData(ref.current);
        if (!isLoading) {
            dispatch(loading(true));
            apiRequest("/user/login", {
                method: "POST",
                data: formData,
            }).then((res) => {
                if (!res.access_token) {
                    dispatch(loading(false));
                } else {
                    localStorage.setItem("auth_token", res.access_token);
                    localStorage.setItem("id", res.id);
                    localStorage.setItem("cardId", res.card_id);
                    localStorage.setItem("role_status", res.status);
                    localStorage.setItem(
                        "access_token_expired_at",
                        res.access_token_expired_at
                    );
                    dispatch(auth(true));
                    dispatch(setUserInfo(res));
                    dispatch(loading(false));
                    dispatch(setRole("ROLE_PARTNER"));
                }
            });
        }
    };

    return(
        <div className='auth-candidate'>
            <AuthHeader />
            <div className='container'>
                <div className='auth__wrapper'>
                    <div className='auth__info'>
                        <h3>Войти, уже есть доступ</h3>
                        <img src={authImg} alt='img' />
                        <p>если вы получили доступ пройдя 2 шага для входа или хотите узнать свои результаты в кабинете</p>
                    </div>
                    <form ref={ref} className='auth__form'>
                        <label htmlFor="login">Ваш email *</label>
                        <input id="login" type="text" name="username" placeholder="Email" />

                        <label htmlFor="password">Ваш пароль*</label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            placeholder="Пароль"
                        />
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                submitHandler();
                            }}
                        >Войти</button>
                    </form>
                </div>
                <div className='auth-candidate__start'>
                    <h2 className="auth-candidate__start__title">Хочу в команду <span>Айти специалистов</span></h2>
                    <div className="change-mode__arrow">
                        <img src={arrowBtn}></img>
                    </div>
                    <p className="auth-candidate__start__description">Для нас не имеет значение Ваша локация.</p>
                    <div className='auth-candidate__start__categoriesWrapper'>
                        <StepsForCandidate step="шаг 1 - выбери специализацтию" />
                        {personalInfoItems.map((item, index) => {
                            return <CategoriesItem link={item.link} key={index} title={item.title} img={item.img} skills={item.description} available={item.available} />
                        })

                        }
                    </div>
                </div>
            </div>
            <SideBar />
            <Footer/>
        </div>
    )
};
