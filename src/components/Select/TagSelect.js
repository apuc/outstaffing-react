import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Select from 'react-select'
import { Loader } from '../Loader/Loader'
import style from './TagSelect.module.css'
import {
  selectedItems,
  selectItems,
  selectTags,
  filteredCandidates,
  setPositionId,
  auth
} from '../../redux/outstaffingSlice'
import { fetchGet } from '../../server/server'

import { getRole } from '../../redux/roleSlice'

const TagSelect = () => {

  const role = useSelector(getRole);
  const [searchLoading, setSearchLoading] = useState(false);
  const dispatch = useDispatch();

  const itemsArr = useSelector(selectItems);

  const tagsArr = useSelector(selectTags);

  const handleSubmit = ({ dispatch, setSearchLoading }) => {
    setSearchLoading(true);

    dispatch(setPositionId(null));
    const filterItemsId = itemsArr.map((item) => item.id).join();

    fetchGet({
      link: `${process.env.REACT_APP_API_URL}/api/profile?skills=`,
      params: filterItemsId,
      role,
      logout: () => dispatch(auth(false))
    }).then((el) => {
      dispatch(filteredCandidates(el));
      setSearchLoading(false)
    })

    // dispatch(selectedItems([]));
  };

  return (
    <>
      <section className={style.search}>
        <div className='row'>
          <div className='col-12'>
            <h2 className={style.search__title}>
              Найти специалиста по навыкам
            </h2>
            <div className={style.search__box}>
              <Select
                value={itemsArr}
                onChange={(value) => dispatch(selectedItems(value))}
                isMulti
                name='tags'
                className={style.select}
                classNamePrefix={style.select}
                options={
                  tagsArr &&
                  tagsArr.flat().map((item) => {
                    return {
                      id: item.id,
                      value: item.value,
                      label: item.value
                    }
                  })
                }
              />
              <button
                onClick={() => handleSubmit({ dispatch, setSearchLoading })}
                type='submit'
                className={style.search__submit}
              >
                {searchLoading ? <Loader width={30} height={30} /> : 'Поиск'}
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
};

export default TagSelect
