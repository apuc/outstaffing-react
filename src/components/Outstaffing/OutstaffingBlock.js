import React from 'react';
import style from './Outstaffing.module.css';

const OutstaffingBlock = ({ data = {}, onClick, onClickhandleTabBar }) => {
  const { img, header, tags, name } = data;
  return (
    <div className={style.outstaffing__box}>
      <img onClick={() => onClickhandleTabBar(name)} src={img} alt="img" />
      <p>{header}</p>
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
  );
};

export default OutstaffingBlock;
