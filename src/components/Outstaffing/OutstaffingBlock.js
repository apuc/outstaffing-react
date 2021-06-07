import React from 'react';
import style from './Outstaffing.module.css';

const OutstaffingBlock = ({ data = {}, onClick, onTabBarClick, selected }) => {
  const { img, text, tags, name, header } = data;
  let clas;

  if (name === 'Backend') {
    clas = style.back;
  } else if (name === 'Design') {
    clas = style.des;
  } else if (name === 'Frontend') {
    clas = style.front;
  }

  return (
    <div className={style.outstaffing__box}>
      <div
        className={`${style.outstaffing__box__img} ${selected ? style.border : null}`}
        onClick={() => onTabBarClick(name)}
      >
        <h3>{header}</h3>
        <img className={clas} src={img} alt="img" />
      </div>
      <div>
        <p>{text}</p>
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
