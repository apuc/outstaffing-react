import React from 'react';
import './footer.css';
import align from '../../images/align-left.png'
import phone from '../../images/phone.png'
import telegram from '../../images/telegram.png'

export const Footer = () => {
    return (
        <div className='container'>
        <footer>
            
        <div className='footer row'>
            <div className='col-12 col-xl-7'>
                <div className='footer__left'>
                    <div className='footer__img'>
                    <img src={align} alt='' />
                    </div>
                    <div className='footer__description'>
                    <span>
                        Подберем и документально оформим IT-специалистов, после чего передадим исполнителей под ваше руководство. 
                        Вы получаете полное управление над сотрудниками, имея возможность контролировать и заменять IT штат.{' '}
                    </span>
                    </div>
                </div>
                </div>

                <div className='col-4 col-xl-2'>
                <div className='footer__icon'>
                    <img src={phone} alt='' />
                    <img src={telegram} alt='' />
                </div>
                </div>

                <div className='col-8 col-xl-3'>
                <div className='footer__right'>
                    <p className='footer__phone'>+7 495 156 78 98</p>
                    <p className='footer__hours'>Будни с 9:00 до 21:00</p>
                </div>
            </div>
        </div>
        <div className='copyright'>2021 © Outstaffing</div>

        </footer>
        </div>
    )
}