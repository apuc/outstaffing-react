import React from 'react';
import {Link, Navigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {getPartnerEmployees} from "../../redux/outstaffingSlice";

import {ProfileHeader} from "../../components/ProfileHeader/ProfileHeader";
import {ProfileBreadcrumbs} from "../../components/ProfileBreadcrumbs/ProfileBreadcrumbs"
import {Footer} from "../../components/Footer/Footer";

import imgInfo from "./emplInfo.png"
import rightArrow from "../../images/arrowRight.png"

import "./partnerEmployees.scss"

export const PartnerEmployees = () => {
    const partnerEmployees = useSelector(getPartnerEmployees);
    if(localStorage.getItem('role_status') !== '18' || !partnerEmployees.length) {
        return <Navigate to="/profile/categories" replace/>
    }
    return(
        <div className="partnerEmployees">
            <ProfileHeader />
            <div className="container">
                <ProfileBreadcrumbs links={[
                    {name: 'Главная', link: '/profile'},
                    {name: 'Данные моего персонала', link: '/profile/categories'},
                    {name: 'Backend разработчики', link: '/profile/categories/employees'},
                ]}
                />
                <h2 className="partnerEmployees__title">Backend разработчики</h2>
                <div className="partnerEmployees__items">
                    {partnerEmployees.map((person) => {
                            return <div className="partnerEmployees__item" key={person.id}>
                                        <div className="partnerEmployees__item__name">
                                            <img src={person.personAvatar} alt="avatar" />
                                            <h4>{person.name}</h4>
                                        </div>
                                        <div className="partnerEmployees__item__info">
                                            <div className="partnerEmployees__item__info__qualification">
                                                <h5>{person.qualification}</h5>
                                                <span>{person.level}</span>
                                                <div className="info_summary">
                                                    <img src={imgInfo} alt="img" />
                                                    <p>Данные и резюме</p>
                                                    <Link to='/candidate/26' className="arrow">
                                                        <img src={rightArrow} alt="arrow" />
                                                    </Link>
                                                </div>
                                            </div>
                                            <div className="partnerEmployees__item__info__project">
                                                <span className="name">Проект:</span>
                                                <h5>{person.project}</h5>
                                                <div className="partnerEmployees__item__info__project__details">
                                                    <div className="details__item">
                                                        <p>Открытые задачи</p>
                                                        <span className="count">{person.tasks_in_progress}</span>
                                                    </div>
                                                    <div className="details__item">
                                                        <p>Отработанных часов в <span>марте</span></p>
                                                        <span className="count">{person.month_hours}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                        })

                    }
                </div>
            </div>
            <Footer/>
        </div>
    )
}
