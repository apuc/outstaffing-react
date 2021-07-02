import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectedTab, selectItems, selectedItems } from '../../redux/outstaffingSlice';
import style from './Outstaffing.module.css';

const OutstaffingBlock = ({ dataTags = [], data = {}, selected, img, header }) => {
  const dispatch = useDispatch();

  const itemsArr = useSelector(selectItems);

  const { skillsName } = data;

  const handleBlockClick = (item) => {
    if (!itemsArr.find((el) => item === el.value)) {
      dispatch(selectedItems([...itemsArr, { value: item, label: item }]));
    }
  };

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
        onClick={() => dispatch(selectedTab(skillsName))}
      >
        <h3>{header}</h3>
        <img className={classes} src={img} alt="img" />
      </div>
      <div className={`${selected ? style.mobile__block : style.mobile__none}`}>
        <p className={style.outstaffing__box__text}># Популярный стек</p>
        {dataTags && (
          <ul className={style.items}>
            {dataTags.map((item) => (
              <li key={item.id} onClick={() => handleBlockClick(item.value)}>
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
