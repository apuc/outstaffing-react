import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import style from './Outstaffing.module.css';
import OutstaffingBlock from './OutstaffingBlock';
import TagSelect from '../Select/TagSelect';
import { selectTags, getPositionId, setPositionId } from '../../redux/outstaffingSlice';
import front from '../../images/front_end.png';
import back from '../../images/back_end.png';
import design from '../../images/design.png';



const createSelectPositionHandler = ({ positionId, setPositionId, dispatch }) => id => {
  if(id===positionId) {
    dispatch(setPositionId(null));
  } else {
    dispatch(setPositionId(id));
  }
}

const Outstaffing = () => {
  const dispatch = useDispatch();
  const positionId = useSelector(getPositionId)
  const tagsArr = useSelector(selectTags);

  const onSelectPosition = createSelectPositionHandler({ positionId, setPositionId, dispatch });
  return (
    <>
      <section className={style.outstaffing}>
          <div className="row">
            <div className="col-12">
              <div className={style.outstaffing__title}>
                <h2>
                  <span>Аутстаффинг</span> it-персонала
                </h2>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12 col-xl-4">
              <OutstaffingBlock
                dataTags={tagsArr && tagsArr.flat().filter((tag) => tag.name === 'skills_front')}
                img={front}
                header="Frontend"
                positionId='2'
                isSelected={positionId==='2'}
                onSelect={id=>onSelectPosition(id)}
              />
            </div>
            <div className="col-12 col-xl-4">
              <OutstaffingBlock
                dataTags={tagsArr.flat().filter((tag) => tag.name === 'skills_back')}
                img={back}
                header="Backend"
                positionId='1'
                isSelected={positionId==='1'}
                onSelect={id=>onSelectPosition(id)}
              />
            </div>
            <div className="col-12 col-xl-4">
              <OutstaffingBlock
                dataTags={tagsArr.flat().filter((tag) => tag.name === 'skills_design')}
                img={design}
                header="Дизайн"
                positionId='5'
                isSelected={positionId==='5'}
                onSelect={id=>onSelectPosition(id)}
              />
            </div>
          </div>
      </section>
      <TagSelect />
    </>
  );
};

export default Outstaffing;
