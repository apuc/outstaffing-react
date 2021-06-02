import React from 'react';
import style from './Outstaffing.module.css';

const OutstaffingBlock = ({ data = {}, onClick }) => {
  const { img, header, tags } = data;
  return (
    <div className={style.outstaffing__box}>
      <img src={img} alt="img" />
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
