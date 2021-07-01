import React from 'react';
import { useSelector } from 'react-redux';
import style from './Outstaffing.module.css';
import OutstaffingBlock from './OutstaffingBlock';
import TagSelect from '../Select/TagSelect';
import { selectTags, selectTab, selectCandidates } from '../../redux/outstaffingSlice';

const Outstaffing = () => {
  const tagsArr = useSelector(selectTags);
  const selected = useSelector(selectTab);
  const candidatesArr = useSelector(selectCandidates);

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
                data={candidatesArr.find((item) => item.skillsName === 'Frontend')}
                dataTags={tagsArr.flat().filter((tag) => tag.name === 'skills_front')}
                selected={selected === 'Frontend'}
              />
            </div>
            <div className="col-12 col-xl-4">
              <OutstaffingBlock
                data={candidatesArr.find((item) => item.skillsName === 'Backend')}
                dataTags={tagsArr.flat().filter((tag) => tag.name === 'skills_back')}
                selected={selected === 'Backend'}
              />
            </div>
            <div className="col-12 col-xl-4">
              <OutstaffingBlock
                data={candidatesArr.find((item) => item.skillsName === 'Marketer')}
                dataTags={tagsArr.flat().filter((tag) => tag.name === 'skills_design')}
                selected={selected === 'Marketer'}
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
