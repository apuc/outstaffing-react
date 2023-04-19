import React, {useState} from 'react';

import {ProfileHeader} from "../../components/ProfileHeader/ProfileHeader";
import {ProfileBreadcrumbs} from "../../components/ProfileBreadcrumbs/ProfileBreadcrumbs"
import {Footer} from "../../components/Footer/Footer";

import mainTabImg from "./Images/mainTreaties.png"
import actImg from "./Images/actTreaties.png"
import checkImg from "./Images/checkTreaties.png"
import arrowDown from "./Images/arrowDown.png"
import logoAstral from "./Images/logoAstral.png"
import arrowItem from "./Images/arrowCheck.png"
import lock from "./Images/lock.svg"
import lockDone from "./Images/lockDone.svg"
import avatarMok from "./Images/avatarMok.png"

import './partnerTreaties.scss'
import { Navigation } from '../../components/Navigation/Navigation';

export const PartnerTreaties = () => {
    const [toggleTab, setToggleTab] = useState(1);

    const toggleTabs = (index) => {
        setToggleTab(index);
    };
    return(
        <div className="treaties">
            <ProfileHeader/>
            <Navigation />
            <div className="container">
                <ProfileBreadcrumbs
                    links={[
                        {name: 'Главная', link: '/profile'},
                        {name: 'Договора и отчетность', link: '/profile/treaties'},
                    ]}
                />
                <h2 className="treaties__title">Договора и отчетность</h2>
                <div className="treaties__tabs">
                    <div className="treaties__tabs__head">
                        <div
                            className={toggleTab === 1 ? "tab active-tab" : "tab"}
                            onClick={() => toggleTabs(1)}
                        >
                            <img src={mainTabImg} alt="img" />
                            <p>Основные </p>
                        </div>
                        <div
                            className={toggleTab === 2 ? "tab active-tab" : "tab"}
                            onClick={() => toggleTabs(2)}
                        >
                            <img src={actImg} alt="img" />
                            <p>Акты</p>
                        </div>
                        <div
                            className={toggleTab === 3 ? "tab active-tab" : "tab"}
                            onClick={() => toggleTabs(3)}
                        >
                            <img src={checkImg} alt="img" />
                            <p>Счета</p>
                        </div>
                    </div>
                    <div className="treaties__tabs__content">
                        <div className={toggleTab === 1
                                    ? "treaties__tabs__content__main active__content"
                                    : "treaties__tabs__content__main"}>
                            <div className="main__head">
                                <p>Реквизиты компании</p>
                                <div className="img">
                                    <img src={arrowDown} alt="arrow" />
                                </div>
                            </div>
                            <div className="treaties__tabs__content__main__item item notPaid">
                                <div className="item__info">
                                    <p className="number">Договор № К-1-2022<br/>от 01.11.22</p>
                                    <div className="astral">
                                        <p>Провайдер документооборота: Астрал</p>
                                        <div className="img">
                                            <img src={arrowDown} alt="arrow" />
                                        </div>
                                    </div>
                                    <img className="logo" src={logoAstral} alt="logo" />
                                </div>
                                <div className="item__more">
                                    <div className="item__more__names">
                                        <p>Бойко Кирилл Сергеевич, подписал и отправил документ</p>
                                        <p>ООО "Зоря", документ получен</p>
                                    </div>
                                    <div className="item__more__date">
                                        <div className="item__more__date__from">
                                            <img src={lock} alt="lock" />
                                            <p>01/01/2021</p>
                                        </div>
                                        <img src={arrowItem} alt="to" />
                                        <div className="item__more__date__to">
                                            <img src={lockDone} alt="lockDone" />
                                            <p>01/02/2021</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="treaties__tabs__content__main__item item persons">
                                <div className="item__info">
                                    <p className="number">Доп. соглашение<br/> №12 от 10.05.22</p>
                                    <div className="item__person">
                                        <div className="item__person__date">
                                            <img className="arrow" src={arrowItem} alt="arrow" />
                                            <p>На выполнение работ данного сотрудника</p>
                                        </div>
                                        <div className="item__person__info">
                                            <img src={avatarMok} alt="avatar" />
                                            <div className="item__person__info__name">
                                                <p>Макаренко Дмитрий</p>
                                                <span>Дизайнер</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="item__info">
                                    <p className="number">Доп. соглашение<br/> №12 от 10.05.22</p>
                                    <div className="item__person">
                                        <div className="item__person__date">
                                            <img className="arrow" src={arrowItem} alt="arrow" />
                                            <p>На выполнение работ данного сотрудника</p>
                                        </div>
                                        <div className="item__person__info">
                                            <img src={avatarMok} alt="avatar" />
                                            <div className="item__person__info__name">
                                                <p>Макаренко Дмитрий</p>
                                                <span>Дизайнер</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={toggleTab === 2
                            ? "treaties__tabs__content__main second active__content"
                            : "treaties__tabs__content__main"}>
                            <div className="main__head acts">
                                <div className="provider">
                                    <p>Провайдер документооборота: Астрал</p>
                                    <img src={logoAstral} alt="astral" />
                                </div>
                                <div className="info">
                                    <p>Реквизиты компании</p>
                                    <div className="img">
                                        <img src={arrowDown} alt="arrow" />
                                    </div>
                                </div>
                            </div>
                            <div className="treaties__tabs__content__main__item item notPaid">
                                <div className="item__info">
                                    <p className="number">Акт №4 от 10.03.23</p>
                                    <div className="item__person__act">
                                        <div className="item__person__act__info">
                                            <div className="item__person__act__avatar">
                                                <img src={avatarMok} alt="avatar" />
                                                <div className="item__person__act__name">
                                                    <p>
                                                        Макаренко Дмитрий
                                                    </p>
                                                    <span>
                                                        Дизайнер
                                                    </span>
                                                </div>
                                            </div>
                                            <img className="personArrow" src={arrowItem} alt="arrow" />
                                            <p className="moreInfo">к Доп. соглашению № 1</p>
                                        </div>
                                        <div className="arrow">
                                            <img src={arrowDown} alt="arrow" />
                                        </div>
                                    </div>
                                </div>
                                <div className="item__more price">
                                    <div className="item__more__price">
                                        <p className="total">214 500,00 руб</p>
                                        <p>147 раб.часов ( 1200руб / час ) </p>
                                    </div>
                                    <div className="item__more__names">
                                        <p>Бойко Кирилл Сергеевич, подписал и отправил документ</p>
                                        <p>ООО "Зоря", документ получен</p>
                                    </div>
                                    <div className="item__more__date">
                                        <div className="item__more__date__from">
                                            <img src={lock} alt="lock" />
                                            <p>01/01/2021</p>
                                        </div>
                                        <img src={arrowItem} alt="to" />
                                        <div className="item__more__date__to">
                                            <img src={lockDone} alt="lockDone" />
                                            <p>01/02/2021</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="treaties__tabs__content__main__item item">
                                <div className="item__info">
                                    <p className="number">Акт №4 от 10.03.23</p>
                                    <div className="item__person__act">
                                        <div className="item__person__act__info">
                                            <div className="item__person__act__avatar">
                                                <img src={avatarMok} alt="avatar" />
                                                <div className="item__person__act__name">
                                                    <p>
                                                        Макаренко Дмитрий
                                                    </p>
                                                    <span>
                                                        Дизайнер
                                                    </span>
                                                </div>
                                            </div>
                                            <img className="personArrow" src={arrowItem} alt="arrow" />
                                            <p className="moreInfo">к Доп. соглашению № 1</p>
                                        </div>
                                        <div className="arrow">
                                            <img src={arrowDown} alt="arrow" />
                                        </div>
                                    </div>
                                </div>
                                <div className="item__more price">
                                    <div className="item__more__price">
                                        <p className="total">214 500,00 руб</p>
                                        <p>147 раб.часов ( 1200руб / час ) </p>
                                    </div>
                                    <div className="item__more__names">
                                        <p>Бойко Кирилл Сергеевич, подписал и отправил документ</p>
                                        <p>ООО "Зоря", документ получен</p>
                                    </div>
                                    <div className="item__more__date">
                                        <div className="item__more__date__from">
                                            <img src={lock} alt="lock" />
                                            <p>01/01/2021</p>
                                        </div>
                                        <img src={arrowItem} alt="to" />
                                        <div className="item__more__date__to">
                                            <img src={lockDone} alt="lockDone" />
                                            <p>01/02/2021</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={toggleTab === 3
                            ? "treaties__tabs__content__main second active__content"
                            : "treaties__tabs__content__main"}>
                            <div className="main__head acts">
                                <div className="provider">
                                    <p>Провайдер документооборота: Астрал</p>
                                    <img src={logoAstral} alt="astral" />
                                </div>
                                <div className="info">
                                    <p>Реквизиты компании</p>
                                    <div className="img">
                                        <img src={arrowDown} alt="arrow" />
                                    </div>
                                </div>
                            </div>
                            <div className="treaties__tabs__content__main__item item notPaid">
                                <div className="item__info">
                                    <p className="number">Акт №4 от 10.03.23</p>
                                    <div className="item__person__act">
                                        <div className="item__person__act__info">
                                            <div className="item__person__act__avatar">
                                                <img src={avatarMok} alt="avatar" />
                                                <div className="item__person__act__name">
                                                    <p>
                                                        Макаренко Дмитрий
                                                    </p>
                                                    <span>
                                                        Дизайнер
                                                    </span>
                                                </div>
                                            </div>
                                            <img className="personArrow" src={arrowItem} alt="arrow" />
                                            <p className="moreInfo">к Доп. соглашению № 1</p>
                                        </div>
                                        <div className="arrow">
                                            <img src={arrowDown} alt="arrow" />
                                        </div>
                                    </div>
                                </div>
                                <div className="item__more price">
                                    <div className="item__more__price">
                                        <p className="total">214 500,00 руб</p>
                                        <p>147 раб.часов ( 1200руб / час ) </p>
                                    </div>
                                    <div className="item__more__names">
                                        <p>Бойко Кирилл Сергеевич, подписал и отправил документ</p>
                                        <p>ООО "Зоря", документ получен</p>
                                    </div>
                                    <div className="item__more__date">
                                        <div className="item__more__date__from">
                                            <img src={lock} alt="lock" />
                                            <p>01/01/2021</p>
                                        </div>
                                        <img src={arrowItem} alt="to" />
                                        <div className="item__more__date__to">
                                            <img src={lockDone} alt="lockDone" />
                                            <p>01/02/2021</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="treaties__tabs__content__main__item item">
                                <div className="item__info">
                                    <p className="number">Акт №4 от 10.03.23</p>
                                    <div className="item__person__act">
                                        <div className="item__person__act__info">
                                            <div className="item__person__act__avatar">
                                                <img src={avatarMok} alt="avatar" />
                                                <div className="item__person__act__name">
                                                    <p>
                                                        Макаренко Дмитрий
                                                    </p>
                                                    <span>
                                                        Дизайнер
                                                    </span>
                                                </div>
                                            </div>
                                            <img className="personArrow" src={arrowItem} alt="arrow" />
                                            <p className="moreInfo">к Доп. соглашению № 1</p>
                                        </div>
                                        <div className="arrow">
                                            <img src={arrowDown} alt="arrow" />
                                        </div>
                                    </div>
                                </div>
                                <div className="item__more price">
                                    <div className="item__more__price">
                                        <p className="total">214 500,00 руб</p>
                                        <p>147 раб.часов ( 1200руб / час ) </p>
                                    </div>
                                    <div className="item__more__names">
                                        <p>Бойко Кирилл Сергеевич, подписал и отправил документ</p>
                                        <p>ООО "Зоря", документ получен</p>
                                    </div>
                                    <div className="item__more__date">
                                        <div className="item__more__date__from">
                                            <img src={lock} alt="lock" />
                                            <p>01/01/2021</p>
                                        </div>
                                        <img src={arrowItem} alt="to" />
                                        <div className="item__more__date__to">
                                            <img src={lockDone} alt="lockDone" />
                                            <p>01/02/2021</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}
