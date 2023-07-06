import React from "react";

import AuthHeader from "@components/Common/AuthHeader/AuthHeader";
import { Footer } from "@components/Common/Footer/Footer";
import SideBar from "@components/SideBar/SideBar";
import AuthBlock from "@components/AuthBlock/AuthBlock";

import arrowInfo from "assets/icons/trackerIntroInfo.svg";
import trackerAuthImg from "assets/images/trackerAuthImg.png"

import "./trackerAuth.scss";

export const TrackerAuth = () => {
    return (
        <div className="trackerAuth">
            <AuthHeader />
            <SideBar />
            <div className="trackerAuth__content">
                <div className="container">
                    <h1 className="trackerAuth__title">Войдите в свое <span>рабочее пространство<img src={arrowInfo} alt='arrow' /></span></h1>
                    <AuthBlock description="Создавайте и редактируйте задачи и проекты вместе с другими участниками команды." img={trackerAuthImg} />
                </div>
                <Footer />
            </div>
        </div>
    );
};
