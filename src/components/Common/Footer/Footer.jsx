import React from "react";

import email from "assets/icons/emailLogo.svg";
import tg from "assets/icons/tgFooter.svg";
import vk from "assets/icons/vkLogo.svg";
import logo from "assets/images/logo/LogoITguild.svg";

import "./footer.scss";

export const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="footer">
          <div className="footer__top">
            <img src={logo} alt="logo" className="logo" />
            <p>
              Подберем и документально оформим IT-специалистов, после чего
              передадим исполнителей под ваше руководство. Вы получаете полное
              управление над сотрудниками, имея возможность контролировать и
              заменять IT штат.
            </p>
            <div className="footer__copyright">
              © {new Date().getFullYear()} - Все права защищены
            </div>
          </div>
          <div className="footer__bottom">
            <div className="footer__social">
              <div className="footer__social__icons">
                <a>
                  <img src={vk} alt="vk" />
                </a>
                <a>
                  <img src={tg} alt="tg" />
                </a>
              </div>
              <p>Войти в команду</p>
            </div>
            <div className="footer__info">
              <div className="footer__mail">
                <a>
                  <img src={email} alt="email" />
                </a>
                <p>office@itguild.info</p>
              </div>
              <a className="footer__policy">Политика конфиденциальности</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
