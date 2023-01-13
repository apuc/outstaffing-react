import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {withSwalInstance} from 'sweetalert2-react'
import swal from 'sweetalert2'

import {Loader} from '../Loader/Loader'

import {auth, setUserInfo} from '../../redux/outstaffingSlice'
import {loading} from '../../redux/loaderSlice'
import {setRole} from '../../redux/roleSlice'

import {selectIsLoading} from '../../redux/loaderSlice'

import ellipse from '../../images/ellipse.png'

import './authBox.scss'
import {useRequest} from "../../hooks/useRequest";


const SweetAlert = withSwalInstance(swal);

export const AuthBox = ({title, altTitle, roleChangeLink}) => {
  const dispatch = useDispatch();

  const {apiRequest} = useRequest();

  const isLoading = useSelector(selectIsLoading);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const submitHandler = () => {

    if (!isLoading) {
      dispatch(loading(true));
      apiRequest('/user/login',
          {
            method: 'POST',
            data: JSON.stringify({
              username,
              password
            })
          }).then((res) => {

        if (!res.access_token) {

          setError('Некорректные данные для входа');
          dispatch(loading(false))

        } else {

          localStorage.setItem('auth_token', res.access_token);
          localStorage.setItem('id', res.id);
          localStorage.setItem('cardId', res.card_id);
          localStorage.setItem(
              'access_token_expired_at',
              res.access_token_expired_at
          );
          dispatch(auth(true));
          dispatch(setUserInfo(res));
          dispatch(loading(false));
          dispatch(setRole('ROLE_PARTNER'))
        }
      })
    }
  };

  return (
      <div className='auth-box'>
        <h2 className='auth-box__header'>
          Войти в <span>систему</span>
        </h2>
        <div className='auth-box__title'>
          <img src={ellipse} alt=''/>
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
                onClick={(e) => {
                  e.preventDefault();
                  submitHandler()
                }}
            >
              {isLoading ? <Loader/> : 'Войти'}
            </button>

            <Link to={roleChangeLink}>
              <button className='auth-box__form-btn--role auth-box__auth-link'>
                {altTitle}
              </button>
            </Link>
          </div>
        </form>
      </div>
  )
};
