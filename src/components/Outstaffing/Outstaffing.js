import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import style from './Outstaffing.module.css';
import OutstaffingBlock from './OutstaffingBlock';
import TagSelect from '../Select/TagSelect';
import { selectTags } from '../../redux/outstaffingSlice';

const Outstaffing = ({ selected, candidatesArray }) => {
  const [selectedItems, setSelectedItems] = useState([]);

  const tagsArr = useSelector(selectTags);

  const handleBlockClick = (item) => {
    console.log('item ', item);
    if (!selectedItems.find((el) => item === el.value)) {
      setSelectedItems([...selectedItems, { value: item, label: item }]);
    }
  };

  const handleSubmit = () => {
    const filterItems = JSON.stringify(selectedItems.map((item) => item.value));

    alert(`Back-end: ${filterItems}`);

    setSelectedItems([]);
  };

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
                data={candidatesArray.find((item) => item.skillsName === 'Frontend')}
                dataTags={tagsArr.flat().filter((tag) => tag.name === 'skills_front')}
                onClick={(item) => handleBlockClick(item)}
                selected={selected === 'Frontend'}
              />
            </div>
            <div className="col-12 col-xl-4">
              <OutstaffingBlock
                data={candidatesArray.find((item) => item.skillsName === 'Backend')}
                dataTags={tagsArr.flat().filter((tag) => tag.name === 'skills_back')}
                onClick={(item) => handleBlockClick(item)}
                selected={selected === 'Backend'}
              />
            </div>
            <div className="col-12 col-xl-4">
              <OutstaffingBlock
                data={candidatesArray.find((item) => item.skillsName === 'Marketer')}
                dataTags={tagsArr.flat().filter((tag) => tag.name === 'skills_design')}
                onClick={(item) => handleBlockClick(item)}
                selected={selected === 'Design'}
              />
            </div>
          </div>
        </div>
      </section>
      <TagSelect
        options={tagsArr}
        selectedItems={selectedItems}
        tagSubmit={handleSubmit}
        setSelectedItems={setSelectedItems}
      />
    </>
  );
};

export default Outstaffing;
