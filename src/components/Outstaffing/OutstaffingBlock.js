import React from 'react';
import style from './Outstaffing.module.css';

const OutstaffingBlock = ({ dataTags = [], data = {}, onClick, onTabBarClick, selected }) => {
  const { header, img, text, name } = data;

  let classes;

  dataTags.forEach((el) => {
    if (el.name === 'skills_back') {
      classes = style.back;
    } else if (el.name === 'skills_design') {
      classes = style.des;
    } else if (el.name === 'skills_front') {
      classes = style.front;
    }
  });

  return (
    <div className={style.outstaffing__box}>
      <div
        className={`${style.outstaffing__box__img} ${selected ? style.border : null}`}
        onClick={() => onTabBarClick(name)}
      >
        <h3>{header}</h3>
        <img className={classes} src={img} alt="img" />
      </div>
      <div className={`${selected ? style.mobile__block : style.mobile__none}`}>
        <p className={style.outstaffing__box__text}>{text}</p>
        {dataTags && (
          <ul className={style.items}>
            {dataTags.map((item) => (
              <li key={item.id} onClick={() => onClick(item.value)}>
                {item.value}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default OutstaffingBlock;
