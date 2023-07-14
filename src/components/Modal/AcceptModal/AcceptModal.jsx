import React from "react";

import close from "assets/icons/closeProjectPersons.svg";

import './acceptModal.scss'

export const AcceptModal = ({closeModal, agreeHandler}) => {
    return (
        <div className='backDrop'>
            <div className='acceptModal'>
                <h3 className='acceptModal__title'>
                    Вы точно хотите переместить задачу в архив?
                </h3>
                <div className='acceptModal__buttons'>
                    <button className='agree' onClick={agreeHandler}>Да</button>
                    <button className='cancel' onClick={closeModal}>Нет</button>
                </div>
                <img className='acceptModal__close' src={close} alt='close' onClick={closeModal} />
            </div>
        </div>
    )
}

export default AcceptModal
