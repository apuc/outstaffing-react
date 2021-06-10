import React from 'react';
import style from './Outstaffing.module.css';

const OutstaffingBlock = ({ data = {}, onClick, onTabBarClick, selected }) => {
  const { img, text, tags, name, header } = data;
  let classes;

  if (name === 'Backend') {
    classes = style.back;
  } else if (name === 'Design') {
    classes = style.des;
  } else if (name === 'Frontend') {
    classes = style.front;
  }

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
        {tags && (
          <ul className={style.items}>
            {tags.map((item) => (
              <li key={item} onClick={() => onClick(item)}>
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default OutstaffingBlock;
