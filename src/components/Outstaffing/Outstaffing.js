import React, { useState, useEffect } from 'react';
import style from './Outstaffing.module.css';
import front from '../../images/front_end.png';
import back from '../../images/back_end.png';
import design from '../../images/design.png';
import OutstaffingBlock from './OutstaffingBlock';
import TagSelect from '../Select/TagSelect';

const Outstaffing = () => {
  const [data, setData] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    const tempData = ['Ruby on Rails', 'Nginx', 'Docker', 'PostgreSQL', 'Vue.js', 'Typescript', 'ReactJS'];
    setData(tempData);
  }, []);

  const handleBlockClick = (index) => {
    if (selectedItems.find((item) => item.value === data[index])) {
      return;
      // setSelectedItems(selectedItems.filter((item) => item.value !== data[index]));
    } else {
      setSelectedItems([...selectedItems, { value: data[index], label: data[index] }]);
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
            <div className="col-4">
              <OutstaffingBlock
                image={front}
                data={data}
                header={'# Популярный стек'}
                onClick={(index) => handleBlockClick(index)}
              />
            </div>
            <div className="col-4">
              <OutstaffingBlock
                image={back}
                data={data}
                header={'# Популярный стек'}
                onClick={(index) => handleBlockClick(index)}
              />
            </div>
            <div className="col-4">
              <OutstaffingBlock
                image={design}
                data={data}
                header={'# Популярный стек'}
                onClick={(index) => handleBlockClick(index)}
              />
            </div>
          </div>
        </div>
      </section>
      <TagSelect
        options={data}
        selectedItems={selectedItems}
        tagSubmit={handleSubmit}
        setSelectedItems={setSelectedItems}
      />
    </>
  );
};

export default Outstaffing;
