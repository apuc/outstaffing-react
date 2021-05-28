import React, { useState } from 'react';
import Select from 'react-select';
import style from './Select.module.scss';

const options = [
  { value: 'Ruby on Rails', label: 'Ruby on Rails' },
  { value: 'Nginx', label: 'Nginx' },
  { value: 'Docker', label: 'Docker' },
  { value: 'PostgreSQL', label: 'PostgreSQL' },
  { value: 'Vue.js', label: 'Vue.js' },
  { value: 'Typescript', label: 'Typescript' },
  { value: 'ReactJ', label: 'ReactJ' },
];

const TagSelect = () => {
  const [items, setItems] = useState(null);

  const handleChange = (values) => {
    const selectItems = values.map((value) => value);

    setItems(selectItems);
  };

  const handleSubmit = () => {
    const filterItems = JSON.stringify(items.map((item) => item.value));

    alert(`Back-end: ${filterItems}`);

    setItems('');
  };

  return (
    <>
      <section className={style.search}>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h2>Найти специалиста по навыкам</h2>
              <div className={style.search__box}>
                <Select
                  value={items}
                  onChange={handleChange}
                  isMulti
                  name="colors"
                  className={style.select}
                  classNamePrefix={style.select}
                  options={options}
                />
                <button onClick={handleSubmit} type="submit">
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

export default TagSelect;
