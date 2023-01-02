import React, {useEffect, useState} from 'react';
import { ProfileHeader } from "../components/Profile/ProfileHeader";
import {getProfileInfo} from "../redux/outstaffingSlice";
import { useSelector } from "react-redux";
import {transformHtml} from "../helper";
import { Footer } from '../components/Footer/Footer'

import arrow from "../images/right-arrow.png";
import rightArrow from "../images/arrowRight.png"
import gitImgItem from "../images/gitItemImg.png"

import './../components/Profile/profile.scss'
import {fetchGet} from "../server/server";

export const Profile = () => {
    const profileInfo = useSelector(getProfileInfo)
    const [openGit, setOpenGit] = useState(false);
    const [gitInfo, setGitInfo] = useState([])
    useEffect(() => {
        fetchGet({
            link: `${process.env.REACT_APP_API_URL}/api/profile/portfolio-projects?card_id=${localStorage.getItem('cardId')}`,
        }).then((responseGit) => {
            setGitInfo(responseGit)
        })
    }, [])
    return(
        <div className='profile'>
            <ProfileHeader/>
            <div className='profile__container'>
                <div className='profile__content'>
                    <h2 className='profile__title'>Ваше резюме {openGit &&  <span>- Git</span>}</h2>
                    {openGit && <div className='profile__back' onClick={() => setOpenGit(false)}>
                        <img src={arrow} alt='arrow'/>
                        <p>Вернуться</p>
                    </div>}
                    <div className='profile__info'>
                        <div className='profile__person'>
                            <img src={profileInfo.photo} className='profile__avatar' />
                            <p className='profile__name'>{profileInfo.fio} {profileInfo.specification}</p>
                        </div>
                        {!openGit &&
                        <button className='profile__git' onClick={()=> setOpenGit(true)}>Git</button>
                        }
                    </div>
                </div>
                {!openGit &&
                    <div className='profile__skills skills__section'>
                        <div className='profile__sections__head'>
                            <h3>Основной стек</h3>
                            <button>Редактировать раздел</button>
                        </div>
                        <div className='skills__section__items'>
                            <div className='skills__section__items__wrapper'>
                                {profileInfo.skillValues && profileInfo.skillValues.map((skill) => {
                                    return <span key={skill.id} className='skill_item'>{skill.skill.name}</span>
                                })}
                            </div>
                        </div>
                    </div>
                }
                {profileInfo.vc_text && !openGit &&
                    <div className='profile__experience' dangerouslySetInnerHTML={transformHtml(profileInfo.vc_text)}>
                    </div>
                }
                {openGit &&
                    <div className='profile__sectionGit'>
                        <div className='profile__sections__head'>
                            <h3>Страница портфолио кода разработчика</h3>
                            <button>Редактировать раздел</button>
                        </div>
                        <div className='profile__sectionGitItems'>
                            {gitInfo.length && gitInfo.map((itemGit) => {
                                return <div key={itemGit.id} className='profile__sectionGitItem gitItem'>
                                            <div className='gitItem__info'>
                                                <div className='gitItem__info__about'>
                                                    <img src={gitImgItem} alt='gitImg' />
                                                    <div className='gitItem__info__name'>
                                                        <h4>{itemGit.title}</h4>
                                                        <p>{itemGit.description}</p>
                                                    </div>
                                                </div>
                                                <div className='gitItem__info__specification'>
                                                    <span></span>
                                                    <p>{itemGit.main_stack}</p>
                                                </div>
                                            </div>
                                            <a className='gitItem__link' href={itemGit.link} target="_blank">
                                                <img src={rightArrow} alt='arrowRight' />
                                            </a>
                                        </div>
                                })
                            }
                        </div>
                    </div>
                }
            </div>
            <Footer/>
        </div>
    )
}

