import React, {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import Select from 'react-select'
import {Loader} from '../Loader/Loader'
import {useRequest} from "../../hooks/useRequest";
import {
  selectedItems,
  selectItems,
  selectTags,
  filteredCandidates,
  setPositionId
} from '../../redux/outstaffingSlice'

import style from './TagSelect.module.css'


const TagSelect = () => {

  const [searchLoading, setSearchLoading] = useState(false);
  const dispatch = useDispatch();

  const {apiRequest} = useRequest();

  const itemsArr = useSelector(selectItems);
  const tagsArr = useSelector(selectTags);

  const handleSubmit = ({dispatch, setSearchLoading}) => {
    setSearchLoading(true);

    dispatch(setPositionId(null));
    const filterItemsId = itemsArr.map((item) => item.id).join();
    const params = filterItemsId ?  {skill: filterItemsId} : '';


    apiRequest('/profile', {
      params: {...params, limit: 1000},
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
                    onChange={(value) => {console.log(value) ;return dispatch(selectedItems(value))}}
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
                    onClick={() => handleSubmit({dispatch, setSearchLoading})}
                    type='submit'
                    className={style.search__submit}
                >
                  {searchLoading ? <Loader width={30} height={30}/> : 'Поиск'}
                </button>
              </div>
            </div>
          </div>
        </section>
      </>
  )
};

export default TagSelect
