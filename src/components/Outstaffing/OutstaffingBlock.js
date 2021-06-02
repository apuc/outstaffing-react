import React from 'react';
import style from './Outstaffing.module.css';

const OutstaffingBlock = ({ text, image, data, onClick }) => {
  return (
    <div className={style.outstaffing__box}>
      <img src={image} alt="img" />
      <p>{text}</p>
      <ul className={style.items}>
        {data &&
          data.tags &&
          data.tags.length &&
          data.tags.map((item) => (
            <li key={item} onClick={() => onClick(item)}>
              {item}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default OutstaffingBlock;
