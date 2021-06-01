import React, { useState, useEffect, useRef } from 'react';
import style from './Outstaffing.module.css';
import front from '../../images/front_end.png';
import back from '../../images/back_end.png';
import design from '../../images/design.png';
import OutstaffingBlock from './OutstaffingBlock';
// import TagSelect from '../Select/TagSelect';
import Select from 'react-select';

const options = [
  { value: 'Ruby on Rails', label: 'Ruby on Rails' },
  { value: 'Nginx', label: 'Nginx' },
  { value: 'Docker', label: 'Docker' },
  { value: 'PostgreSQL', label: 'PostgreSQL' },
  { value: 'Vue.js', label: 'Vue.js' },
  { value: 'Typescript', label: 'Typescript' },
  { value: 'ReactJ', label: 'ReactJ' },
];

const Outstaffing = () => {
  const [data, setData] = useState([]);
  const [arr, setArr] = useState([]);

  useEffect(() => {
    const tempData = ['Ruby on Rails', 'Nginx', 'Docker', 'PostgreSQL', 'Vue.js', 'Typescript', 'ReactJS'];
    setData(tempData);
  }, []);

  const [items, setItems] = useState([]);

  const inputEl = useRef(null);

  const test = (index) => {
    let arrr = options[index];
    console.log('DDDDD', arrr);

    setArr([arrr]);
  };

  const handle = (arr) => {
    console.log(arr);
    inputEl.current.select.setValue(arr);
  };

  const handleChange = (values) => {
    const selectItems = values.map((value) => value);

    setItems(selectItems);

    console.log('items', items);
  };

  const handleSubmit = () => {
    const filterItems = JSON.stringify(items.map((item) => item.value));

    alert(`Back-end: ${filterItems}`);

    setItems([]);
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
              <OutstaffingBlock image={front} data={data} header={'# Популярный стек'} onTest={test} />
            </div>
            <div className="col-4">
              <OutstaffingBlock image={back} data={data} header={'# Популярный стек'} onTest={test} />
            </div>
            <div className="col-4">
              <OutstaffingBlock image={design} data={data} header={'# Популярный стек'} onTest={test} />
            </div>
          </div>
        </div>
      </section>
      {/* <TagSelect selectArr={tt} /> */}
      <section className={style.search}>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h2 className={style.search__title}>Найти специалиста по навыкам</h2>
              <div className={style.search__box}>
                <Select
                  ref={inputEl}
                  value={items}
                  onChange={handleChange}
                  isMulti
                  name="tags"
                  className={style.select}
                  classNamePrefix={style.select}
                  options={options}
                />
                <button onClick={handleSubmit} type="submit">
                  Submit
                </button>
                <button onClick={handle} type="submit">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Outstaffing;
