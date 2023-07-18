import React from "react";

import close from "assets/icons/closeProjectPersons.svg";

import "./modalTrackerRegistration.scss";

export const ModalTrackerRegistration = ({ setModalReset }) => {
    return (
        <div className="modalConfirmTracker">
            <h3 className='modalConfirmTracker__title'>Спасибо за регистрацию. Теперь можете войти в кабинет</h3>
            <p className='modalConfirmTracker__info'>Мы отправили ссылку<br/>
                для активации вашего аккаунта на почту<br/> <span>nhw44308@mail.com</span></p>
            <button className='modalConfirmTracker__btn'>Перейти в почту</button>
            <img onClick={() => setModalReset(false)} src={close} className='modalReset__close' alt='close' />
        </div>
    );
};
