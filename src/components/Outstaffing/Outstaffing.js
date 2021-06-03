import React, { useState, useEffect } from 'react';
import style from './Outstaffing.module.css';
import front from '../../images/front_end.png';
import back from '../../images/back_end.png';
import design from '../../images/design.png';
import OutstaffingBlock from './OutstaffingBlock';
import TagSelect from '../Select/TagSelect';

const Outstaffing = ({ onhandleTabBar }) => {
  const [data, setData] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    const tags = [
      {
        name: 'frontend',
        img: front,
        header: '# Популярный стек',
        tags: ['Vue.js', 'ReactJS', 'Angular', 'JavaScript', 'Html', 'Css', 'MobX'],
      },
      {
        name: 'backend',
        img: back,
        header: '# Популярный стек',
        tags: ['Node.js', 'Express', 'Php', 'Ruby on Rails', 'Python', 'Wordpress', ' Java'],
      },
      {
        name: 'design',
        img: design,
        header: '# Популярный стек',
        tags: ['Figma', 'Avocode', 'PhotoShop', 'Xara', 'Pinegrow', 'Macaw', 'KompoZer'],
      },
    ];

    setData(tags);
  }, []);

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
            <div className="col-4">
              <OutstaffingBlock
                data={data.find((item) => item.name === 'frontend')}
                onClick={(item) => handleBlockClick(item)}
                onClickhandleTabBar={(name) => onhandleTabBar(name)}
              />
            </div>
            <div className="col-4">
              <OutstaffingBlock
                data={data.find((item) => item.name === 'backend')}
                onClick={(item) => handleBlockClick(item)}
                onClickhandleTabBar={(name) => onhandleTabBar(name)}
              />
            </div>
            <div className="col-4">
              <OutstaffingBlock
                data={data.find((item) => item.name === 'design')}
                onClick={(item) => handleBlockClick(item)}
                onClickhandleTabBar={(name) => onhandleTabBar(name)}
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
