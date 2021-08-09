import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Select from 'react-select';
import { Loader } from '../Loader/Loader';
import style from './TagSelect.module.css';
import { selectedItems, selectItems, selectTags, filteredCandidates } from '../../redux/outstaffingSlice';
import { fetchItemsForId } from '../../server/server';
import { selectIsLoading } from '../../redux/loaderSlice';

const TagSelect = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading)

  const itemsArr = useSelector(selectItems);

  const tagsArr = useSelector(selectTags);

  const handleSubmit = () => {
    const filterItemsId = itemsArr.map((item) => item.id).join();

    fetchItemsForId(`${process.env.REACT_APP_API_URL}/api/profile?skills=`, filterItemsId).then((el) =>
      dispatch(filteredCandidates(el))
    );

    // dispatch(selectedItems([]));
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
                <button onClick={handleSubmit} type="submit" className={style.search__submit}>
                { isLoading ? <Loader /> : 'Поиск' }
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
