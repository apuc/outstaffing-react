import React from 'react'
import OutsideClickHandler from 'react-outside-click-handler'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectItems,
  selectedItems,
  filteredCandidates,
  auth
} from '../../redux/outstaffingSlice'

import { fetchGet } from '../../server/server'
import { useHistory } from 'react-router-dom'
import { getRole } from '../../redux/roleSlice'

import './outstaffingBlock.scss'

const handlePositionClick = ({
  dispatch,
  positionId,
  isSelected,
  onSelect,
  history,
  role
}) => {
  if (isSelected) {
    fetchGet({
      link: `${process.env.REACT_APP_API_URL}/api/profile?limit=`,
      params: 4,
      history,
      role,
      logout: () => dispatch(auth(false))
    }).then((profileArr) => {
      dispatch(filteredCandidates(profileArr))
      dispatch(selectedItems([]))
      onSelect(positionId)
    })
  } else {
    fetchGet({
      link: `${process.env.REACT_APP_API_URL}/api/profile?position_id=`,
      params: positionId,
      history,
      role,
      logout: () => dispatch(auth(false))
    }).then((el) => {
      dispatch(filteredCandidates(el))
      dispatch(selectedItems([]))
      onSelect(positionId)
    })
  }
}

const OutstaffingBlock = ({
  dataTags = [],
  selected,
  img,
  header,
  positionId,
  isSelected,
  onSelect
}) => {
  const history = useHistory()
  const role = useSelector(getRole)

  const dispatch = useDispatch()

  const itemsArr = useSelector(selectItems)

  const handleBlockClick = (item, id) => {
    if (!itemsArr.find((el) => item === el.value)) {
      dispatch(selectedItems([...itemsArr, { id, value: item, label: item }]))
    }
  }

  let classes

  dataTags.forEach((el) => {
    if (el.name === 'skills_back') {
      classes = 'back'
    } else if (el.name === 'skills_design') {
      classes = 'des'
    } else if (el.name === 'skills_front') {
      classes = 'front'
    }
  })

  return (
    <OutsideClickHandler
      onOutsideClick={() => {
        isSelected && onSelect(null)
      }}
    >
      <div
        className={`outstaffing-block${
          isSelected ? ' outstaffing-block__selected' : ''
        }`}
      >
        <div
          className={`outstaffing-block__img ${
            selected ? ' outstaffing-block__border' : ''
          }`}
          onClick={() =>
            handlePositionClick({
              dispatch,
              positionId,
              isSelected,
              onSelect,
              history,
              role
            })
          }
        >
          <h3>{header}</h3>
          <img className={classes} src={img} alt='img' />
        </div>
        <div
          className={`${
            selected
              ? 'outstaffing-block__mobile--block'
              : 'outstaffing-block__mobile--none'
          }`}
        >
          <p className='outstaffing-block__text'># Популярный стек</p>
          {dataTags && (
            <ul className='outstaffing-block__items'>
              {dataTags.map((item) => (
                <li
                  key={item.id}
                  onClick={() => handleBlockClick(item.value, item.id)}
                >
                  {item.value}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </OutsideClickHandler>
  )
}

export default OutstaffingBlock
