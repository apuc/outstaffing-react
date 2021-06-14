import React from 'react';
import style from './Section.module.css';

const SectionFive = () => {
  return (
    <>
      <div className={style.SectionFive}>
        <p>Регистрации/авторизации;</p>
        <p>Управления правами менеджеров отеля, назначение поставщиков</p>
        <p>Управления описанием и профилем отелей;</p>
        <p>Управления финансами, ценообразованием, квотами;</p>
        <p>Переписки со своими менеджерами, а также с вышестоящими инстанциями;</p>
        <p>Управления новостями отеля;</p>
        <p>Просмотра расширенной статистики по заявкам и людям;</p>
      </div>
      <button type="submit" className={style.SectionFive__btn}>
        Выбрать к собеседованию
      </button>
    </>
  );
};

export default SectionFive;
