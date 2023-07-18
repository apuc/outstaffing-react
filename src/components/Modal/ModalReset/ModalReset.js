import React from "react";

import close from "assets/icons/closeProjectPersons.svg";

import "./modalReset.scss";

export const ModalReset = ({ setModalReset }) => {
    return (
        <div className="modalReset">
            <h3 className='modalReset__title'>Восстановление доступа</h3>
            <div className='modalReset__input'>
                <span>Укажите e-mail, для которого хотите восстановить пароль.</span>
                <input placeholder='email'/>
            </div>
            <button className='modalReset__submit'>Восстановить</button>
            <img onClick={() => setModalReset(false)} src={close} className='modalReset__close' alt='close' />
        </div>
    );
};
