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
    const tags = [
      {
        name: 'front',
        img: '../../images/front_end.png',
        tags: ['Vue.js', 'ReactJS', 'Angular', 'JavaScript', 'Html', 'Css'],
      },
      {
        name: 'back',
        img: '../../images/back_end.png',
        tags: ['Ruby on Rails', 'Node.js', 'Express', 'Php', 'Python', 'Wordpress'],
      },
      {
        name: 'design',
        img: '../../images/design.png',
        tags: ['Figma', 'Avocode', 'PhotoShop', 'Xara', 'Pinegrow', 'Macaw'],
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
                image={front}
                data={data.find((item) => item.name === 'front')}
                header={'# Популярный  стек'}
                onClick={(item) => handleBlockClick(item)}
              />
            </div>
            <div className="col-4">
              <OutstaffingBlock
                image={back}
                data={data.find((item) => item.name === 'back')}
                header={'# Популярный стек'}
                onClick={(item) => handleBlockClick(item)}
              />
            </div>
            <div className="col-4">
              <OutstaffingBlock
                image={design}
                data={data.find((item) => item.name === 'design')}
                header={'# Популярный стек'}
                onClick={(item) => handleBlockClick(item)}
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
