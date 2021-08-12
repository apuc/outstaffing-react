import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectItems, selectedItems, filteredCandidates } from '../../redux/outstaffingSlice';
import { fetchItemsForId } from '../../server/server';
import style from './Outstaffing.module.css';

const handlePositionClick = ({dispatch, positionId}) => {

  fetchItemsForId(`${process.env.REACT_APP_API_URL}/api/profile?position_id=`, positionId).then((el) =>
    dispatch(filteredCandidates(el))
  );
};

const OutstaffingBlock = ({ dataTags = [], selected, img, header, positionId }) => {
  console.log('p', positionId)
  const dispatch = useDispatch();

  const itemsArr = useSelector(selectItems);

  const handleBlockClick = (item, id) => {
    if (!itemsArr.find((el) => item === el.value)) {
      dispatch(selectedItems([...itemsArr, { id, value: item, label: item }]));
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
      <div className={`${style.outstaffing__box__img} ${selected ? style.border : ''}`} onClick={()=>handlePositionClick({dispatch, positionId})}>
        <h3>{header}</h3>
        <img className={classes} src={img} alt="img" />
      </div>
      <div className={`${selected ? style.mobile__block : style.mobile__none}`}>
        <p className={style.outstaffing__box__text}># Популярный стек</p>
        {dataTags && (
          <ul className={style.items}>
            {dataTags.map((item) => (
              <li key={item.id} onClick={() => handleBlockClick(item.value, item.id)}>
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
