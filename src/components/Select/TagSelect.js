import React from 'react';
import Select from 'react-select';
import style from './TagSelect.module.css';

const TagSelect = ({ selectedItems, tagSubmit, options, setSelectedItems }) => {
  return (
    <>
      <section className={style.search}>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h2 className={style.search__title}>Найти специалиста по навыкам</h2>
              <div className={style.search__box}>
                <Select
                  value={selectedItems}
                  onChange={(value) => setSelectedItems(value)}
                  isMulti
                  name="tags"
                  className={style.select}
                  classNamePrefix={style.select}
                  options={options.flat().map((item) => {
                    return { value: item.value, label: item.value };
                  })}
                />
                <button onClick={tagSubmit} type="submit">
                  Поиск
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
