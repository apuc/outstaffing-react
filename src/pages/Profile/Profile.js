import React, {useState} from 'react';
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";

import {ProfileHeader} from "../../components/ProfileHeader/ProfileHeader";
import {ProfileBreadcrumbs} from "../../components/ProfileBreadcrumbs/ProfileBreadcrumbs"
import {Footer} from "../../components/Footer/Footer";

import {getProfileInfo} from "../../redux/outstaffingSlice";

import {urlForLocal} from "../../helper";

import reportsIcon from "../../images/reports.png"
import summaryIcon from "../../images/summaryIcon.png"
import timerIcon from "../../images/timerIcon.png"
import paymentIcon from "../../images/paymentIcon.png"
import settingIcon from "../../images/settingIcon.png"

import rightArrow from "../../images/arrowRight.png"

import './profile.scss'

export const Profile = () => {

  const profileInfo = useSelector(getProfileInfo);
  const [user] = useState(localStorage.getItem('role_status') === '18' ? 'partner' : 'developer')
  const [profileItemsInfo] = useState({
    developer: [
      {
        path: '/calendar',
        img: reportsIcon,
        title: 'Ваша отчетность',
        description: '<span></span>Отработанных в этом месяце часов'
      },
      {
        path: '/summary',
        img: summaryIcon,
        title: 'Данные и резюме',
        description: 'Ваше резюме<br/><span>заполнено</span>'
      },
      {
        path: '/tracker',
        img: timerIcon,
        title: 'Трекер времени',
        description: 'Сколько времени занимает<br/> выполнение задач'
      },
      {
        path: '/payouts',
        img: paymentIcon,
        title: 'Выплаты',
        description: 'У вас <span>подтвержден</span><br/> статус самозанятого'
      },
      {
        path: '/settings',
        img: settingIcon,
        title: 'Настройки аккаунта',
        description: 'Перейдите чтобы начать<br/> редактирование'
      }
    ],
    partner: [
      {
        path: '/requests',
        img: reportsIcon,
        title: 'Запросы и открытые позиции',
        description: '<span>У вас 2 вакансии<br/></span>открытые от лица компании'
      },
      {
        path: '/employees',
        img: summaryIcon,
        title: 'Данные персонала',
        description: 'Наши специалисты <br/><span>уже работающие у вас</span>'
      },
      {
        path: '/tracker',
        img: timerIcon,
        title: 'Трекер времени',
        description: 'Контроль времени и<br/> выполнение задач'
      },
      {
        path: '/treaties',
        img: paymentIcon,
        title: 'Договора и отчетность',
        description: 'Ключевые условия<br/> договора'
      },
      {
        path: '',
        img: settingIcon,
        title: 'Настройки аккаунта',
        description: 'Перейдите чтобы начать<br/> редактирование'
      }
    ]
  })

  return (
      <div className='profile'>
        <ProfileHeader/>
        <div className='container'>
          <ProfileBreadcrumbs links={[{name: 'Главная', link: '/profile'}]} />
          <h2 className='profile__title'>
            {user === 'developer' ?
                <span><p>Добрый день,&nbsp;</p>{profileInfo.fio}</span>
                :
              'ООО НДВ Консалтинг'
            }
          </h2>
          <div className='summary__info'>
            <div className='summary__person'>
              <img src={profileInfo.photo ? urlForLocal(profileInfo.photo) : ''} className='summary__avatar' alt='avatar'/>
              <p className='summary__name'>
                {user === 'developer' ?
                    <span>{profileInfo.fio}, {profileInfo.specification} разработчик</span>
                    :
                    'ООО НДВ Консалтинг'
                }
              </p>
            </div>
          </div>
          <div className='profile__items'>
            {
              profileItemsInfo[user].map((item, index) => {
                return <Link key={index} to={`/profile${item.path}`} className='item'>
                          <div className='item__about'>
                            <img src={item.img} alt='itemImg'/>
                            <h3>{item.title}</h3>
                          </div>
                          <div className='item__info'>
                            <p dangerouslySetInnerHTML={{__html: item.description}}></p>
                            <div className='item__infoLink'>
                              <img src={rightArrow} alt='arrow'/>
                            </div>
                          </div>
                        </Link>
              })
            }
          </div>
        </div>
        <Footer/>
      </div>
  )
};
