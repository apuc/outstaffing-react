import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { auth } from '../../redux/outstaffingSlice'
import { loading } from '../../redux/loaderSlice'
import ellipse from '../../images/ellipse.png'

import { Loader } from '../Loader/Loader'

import { fetchAuth } from '../../server/server'
import { setRole } from '../../redux/roleSlice'
import { selectIsLoading } from '../../redux/loaderSlice'

import './authBox.scss'

import { withSwalInstance } from 'sweetalert2-react'
import swal from 'sweetalert2'
const SweetAlert = withSwalInstance(swal)

export const AuthBox = ({ title, roleChangeLink }) => {
  const dispatch = useDispatch()
  const isLoading = useSelector(selectIsLoading)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  return (
    <div className='auth-box'>
      <h2 className='auth-box__header'>
        Войти в <span>систему</span>
      </h2>
      <div className='auth-box__title'>
        <img src={ellipse} alt='' />
        <span>{title}</span>
      </div>
      <form className='auth-box__form'>
        <label htmlFor='login'>Ваш логин:</label>
        <input
          id='login'
          type='text'
          placeholder='Логин'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor='password'>Пароль:</label>
        <input
          id='password'
          type='password'
          placeholder='Пароль'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && (
          <div className='auth-box__form-error'>
            <SweetAlert
              show={!!error}
              title='Ошибка'
              text={error}
              onConfirm={() => setError(null)}
            />
          </div>
        )}

        <div className='auth-box__form-buttons'>
          <button
            className='auth-box__form-btn'
            onClick={
              !isLoading
                ? (e) => {
                    e.preventDefault()
                    dispatch(loading(true))
                    fetchAuth({
                      username,
                      password,
                      dispatch: () => {
                        dispatch(auth(true))
                        dispatch(loading(false))
                        dispatch(setRole('ROLE_PARTNER'))
                      },
                      catchError: () => {
                        setError('Некорректные данные для входа')
                        dispatch(loading(false))
                      }
                    })
                  }
                : () => {}
            }
          >
            {isLoading ? <Loader /> : 'Войти'}
          </button>

          <button className='auth-box__form-btn--role auth-box__auth-link' >
            <Link to={roleChangeLink}>Для разработчиков</Link>
          </button>
        </div>
      </form>
    </div>
  )
}
