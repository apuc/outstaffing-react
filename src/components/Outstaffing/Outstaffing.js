import React, { useState } from 'react';
import style from './Outstaffing.module.css';
import OutstaffingBlock from './OutstaffingBlock';
import TagSelect from '../Select/TagSelect';

const Outstaffing = ({ onhandleTabBar, selected, tabs }) => {
  const [selectedItems, setSelectedItems] = useState([]);

  const handleBlockClick = (item) => {
    if (!selectedItems.find((el) => item === el.value)) {
      setSelectedItems([...selectedItems, { value: item, label: item }]);
    }
    // else {
    // setSelectedItems(selectedItems.filter((el) => item !== el.value));
    // }
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
                data={tabs.find((item) => item.name === 'Frontend')}
                onClick={(item) => handleBlockClick(item)}
                onTabBarClick={(name) => onhandleTabBar(name)}
                selected={selected === 'Frontend'}
              />
            </div>
            <div className="col-12 col-xl-4">
              <OutstaffingBlock
                data={tabs.find((item) => item.name === 'Backend')}
                onClick={(item) => handleBlockClick(item)}
                onTabBarClick={(name) => onhandleTabBar(name)}
                selected={selected === 'Backend'}
              />
            </div>
            <div className="col-12 col-xl-4">
              <OutstaffingBlock
                data={tabs.find((item) => item.name === 'Design')}
                onClick={(item) => handleBlockClick(item)}
                onTabBarClick={(name) => onhandleTabBar(name)}
                selected={selected === 'Design'}
              />
            </div>
          </div>
        </div>
      </section>
      <TagSelect
        options={tabs}
        selectedItems={selectedItems}
        tagSubmit={handleSubmit}
        setSelectedItems={setSelectedItems}
      />
    </>
  );
};

export default Outstaffing;
