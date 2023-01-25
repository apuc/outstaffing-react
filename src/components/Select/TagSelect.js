import React, {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import Select from 'react-select'
import {Loader} from '../Loader/Loader'
import {apiRequest} from "../../api/request";
import {
  selectedItems,
  selectItems,
  selectTags,
  profiles,
  setPositionId
} from '../../redux/outstaffingSlice'

import './TagSelect.css'


const TagSelect = () => {

  const [searchLoading, setSearchLoading] = useState(false);
  const dispatch = useDispatch();


  const itemsArr = useSelector(selectItems);
  const tagsArr = useSelector(selectTags);

  const handleSubmit = ({dispatch, setSearchLoading}) => {
    setSearchLoading(true);

    dispatch(setPositionId(null));
    const filterItemsId = itemsArr.map((item) => item.id).join();
    const params = filterItemsId ?  {skill: filterItemsId} : '';


    apiRequest('/profile', {
      params: {...params, limit: 1000},
    }).then((res) => {
      dispatch(profiles(res));
      setSearchLoading(false)
    })

    // dispatch(selectedItems([]));
  };

  return (
      <>
        <section className='search'>
          <div className='row'>
            <div className='col-12'>
              <h2 className='search__title'>
                Найти специалиста по навыкам
              </h2>
              <div className='search__box'>
                <Select
                    value={itemsArr}
                    onChange={(value) => dispatch(selectedItems(value))}
                    isMulti
                    name='tags'
                    className='select'
                    classNamePrefix='select'
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
                    className='search__submit'
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
