import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import style from './Outstaffing.module.css';
import OutstaffingBlock from './OutstaffingBlock';
import TagSelect from '../Select/TagSelect';
import { selectTags } from '../../redux/outstaffingSlice';
import front from '../../images/front_end.png';
import back from '../../images/back_end.png';
import design from '../../images/design.png';

const Outstaffing = () => {
  const [selectedPositionId, setSelectedPositionId] = useState(null);
  const tagsArr = useSelector(selectTags);

  return (
    <>
      <section className={style.outstaffing}>
        <div className="container">
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
                header="Фронтенд"
                positionId='2'
                isSelected={selectedPositionId==='2'}
                onSelect={id=>setSelectedPositionId(id)}
              />
            </div>
            <div className="col-12 col-xl-4">
              <OutstaffingBlock
                dataTags={tagsArr.flat().filter((tag) => tag.name === 'skills_back')}
                img={back}
                header="Бэкенд"
                positionId='1'
                isSelected={selectedPositionId==='1'}
                onSelect={id=>setSelectedPositionId(id)}
              />
            </div>
            <div className="col-12 col-xl-4">
              <OutstaffingBlock
                dataTags={tagsArr.flat().filter((tag) => tag.name === 'skills_design')}
                img={design}
                header="Дизайн"
                positionId='5'
                isSelected={selectedPositionId==='5'}
                onSelect={id=>setSelectedPositionId(id)}
              />
            </div>
          </div>
        </div>
      </section>
      <TagSelect />
    </>
  );
};

export default Outstaffing;
