import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Select from 'react-select';
import style from './TagSelect.module.css';
import { selectedItems, selectItems, selectTags, filteredCandidates } from '../../redux/outstaffingSlice';
import { fetchItemsForId } from '../../server/server';

const TagSelect = () => {
  const dispatch = useDispatch();

  const itemsArr = useSelector(selectItems);

  const tagsArr = useSelector(selectTags);

  const handleSubmit = () => {
    const filterItemsId = itemsArr.map((item) => item.id).join();

    fetchItemsForId('https://guild.craft-group.xyz/api/profile?skills=', filterItemsId).then((el) =>
      dispatch(filteredCandidates(el))
    );

    dispatch(selectedItems([]));
  };

  return (
    <>
      <section className={style.search}>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h2 className={style.search__title}>Найти специалиста по навыкам</h2>
              <div className={style.search__box}>
                <Select
                  value={itemsArr}
                  onChange={(value) => dispatch(selectedItems(value))}
                  isMulti
                  name="tags"
                  className={style.select}
                  classNamePrefix={style.select}
                  options={tagsArr.flat().map((item) => {
                    return { id: item.id, value: item.value, label: item.value };
                  })}
                />
                <button onClick={handleSubmit} type="submit">
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
