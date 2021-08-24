import React from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import { useDispatch, useSelector } from 'react-redux';
import { selectItems, selectedItems, filteredCandidates, auth } from '../../redux/outstaffingSlice';
import { fetchItemsForId } from '../../server/server';
import style from './Outstaffing.module.css';

import { fetchProfile } from '../../server/server';
import { useHistory } from 'react-router-dom';
import { getRole } from '../../redux/roleSlice';

const handlePositionClick = ({dispatch, positionId, isSelected, onSelect, history, role}) => {
  if(isSelected) {
    fetchProfile({ link: `${process.env.REACT_APP_API_URL}/api/profile?limit=`, index: 4, history, role, logout: dispatch(auth(false))  }).then((profileArr) => {
      dispatch(filteredCandidates(profileArr));
      dispatch(selectedItems([]));
      onSelect(positionId);
    }
    );
  } else {
    fetchItemsForId({ link: `${process.env.REACT_APP_API_URL}/api/profile?position_id=`, index: positionId, history, role, logout: dispatch(auth(false))  }).then((el) => {
      dispatch(filteredCandidates(el));
      dispatch(selectedItems([]));
      onSelect(positionId);
    }
    );
  }
};

const OutstaffingBlock = ({ dataTags = [], selected, img, header, positionId, isSelected, onSelect }) => {
  const history = useHistory();
  const role = useSelector(getRole);

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
    <OutsideClickHandler
      onOutsideClick={() => {
        isSelected && onSelect(null)
      }}
    >
    <div className={`${style.outstaffing__box} ${isSelected?style.outstaffing__box__selected:''}`} >
      <div className={`${style.outstaffing__box__img} ${selected ? style.border : ''}`} onClick={()=>handlePositionClick({dispatch, positionId, isSelected, onSelect, history, role})}>
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
    </OutsideClickHandler>
  );
};

export default OutstaffingBlock;
