import React from 'react';

import {ProfileHeader} from "../../components/ProfileHeader/ProfileHeader";
import {Footer} from "../../components/Footer/Footer";

import arrowDown from "../../images/selectArrow.png"

import './partnerAddRequest.scss'

export const PartnerAddRequest = () => {
    return (
        <div className='partnerAddRequest'>
            <ProfileHeader />
            <div className='container'>
                <h2 className='partnerAddRequest__title'>Страница добавления заявки</h2>
                <div className='partnerAddRequest__section'>
                    <div className='partnerAddRequest__form'>
                        <div className='partnerAddRequest__form__block form__block'>
                            <h3 className='form__block__title'>Данные открытой позиции</h3>
                            <div className='form__block__section'>
                                <h3>Название вакансии</h3>
                                <div className='form__block__section__input'>
                                    <input type='text' placeholder='Вакансия'/>
                                </div>
                            </div>
                            <div className='form__block__section'>
                                <h3>Выберите специализацию</h3>
                                <div className='form__block__section__selects'>
                                    <div className='form__block__section__select'>
                                        <span>Разработка</span>
                                        <img src={arrowDown} />
                                    </div>
                                    <div className='form__block__section__select'>
                                        <span>Backend Developer</span>
                                        <img src={arrowDown} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='partnerAddRequest__form__block form__block'>
                            <h3 className='form__block__title'>Квалификация</h3>
                            <div className='form__block__section'>
                                <h3>Выберите уровень знаний </h3>
                                <div className='form__block__section__select'>
                                    <span>Разработка</span>
                                    <img src={arrowDown} />
                                </div>
                            </div>
                            <div className='form__block__section'>
                                <h3>Введите необходимое описание</h3>
                                <textarea/>
                            </div>
                            <div className='form__block__section'>
                                <h3>Необходимое количество человек на позицию</h3>
                                <div className='form__block__section__select'>
                                    <span>2</span>
                                    <img src={arrowDown} />
                                </div>
                            </div>
                            <div className='form__block__buttons'>
                                <button className='form__block__cancel'>Отмена</button>
                                <button className='form__block__save'>Сохранить</button>
                            </div>
                        </div>
                    </div>
                    <div className='partnerAddRequest__info'>
                        <div className='partnerAddRequest__info__block'>
                            <h4>Процесс:</h4>
                            <p>
                                При аутстафе мы предоставляем вам
                                it-специалистов при этом они находятся в
                                нашем штате.
                                <br/><br/>
                                Вы сможете прособеседовать наших
                                специалистов, посмотреть проекты и Git.
                            </p>
                        </div>
                        <div className='partnerAddRequest__info__block'>
                            <h4>Отчетность:</h4>
                            <p>
                                Вы можете обратиться к специалисту
                                напрямую.
                                <br/><br/>
                                Каждый день специалисты описывают
                                выполненные работы и затраченные
                                на это часы.
                                <br/><br/>
                                Можем выделить руководителя проекта
                                и тестировщиков.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}