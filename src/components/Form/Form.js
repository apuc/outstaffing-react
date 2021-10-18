import React, { useState } from 'react';
import style from './Form.module.css';
import { fetchForm } from '../../server/server';
import { auth } from '../../redux/outstaffingSlice';
import { useHistory, useParams, Redirect } from 'react-router-dom';
import { Loader } from '../Loader/Loader';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import './form.css';

import { withSwalInstance } from 'sweetalert2-react';
import swal from 'sweetalert2';
import { useSelector, useDispatch } from 'react-redux';
import { getRole } from '../../redux/roleSlice';
 
const SweetAlert = withSwalInstance(swal);

const Form = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const role = useSelector(getRole);
  const urlParams = useParams();
  const [status, setStatus] = useState(null);
  const [data, setData] = useState({
    email: '',
    phone: '',
    comment: '',
  });
  const [isFetching, setIsFetching] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;

    setData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsFetching(true)
    const formData = new FormData();
    formData.append('profile_id', urlParams.id);
    formData.append('email', data.email);
    formData.append('phone', data.phone);
    formData.append('comment', data.comment);

    fetchForm({ link: `${process.env.REACT_APP_API_URL}/api/profile/add-to-interview`, index: {
      profile_id: urlParams.id,
      ...data,
    }, history, role, logout: dispatch(auth(false))  }).then( (res)=>  res.json()
      .then( resJSON => {
        setStatus(resJSON);
        setIsFetching(false);
      })
    )
  };

  return (
    <>
      {status && <SweetAlert
        show={!!status}
        text={status.errors ? status.errors[Object.keys(status.errors)[0]] : 'Форма отправлена'}
        onConfirm={status.errors ? () => {setStatus(null);} : () => {setStatus(null); history.push(`/candidate/${urlParams.id}`)}}
      />}
      <div className="row">
        <div className="col-sm-12">
          <form className={style.form} id="test">
            <label htmlFor="email">Емейл:</label>
            <input
              onChange={handleChange}
              id="email"
              name="Email"
              type="email"
              placeholder="Емейл"
              value={data.email}
            />

            <label htmlFor="phone">Номер телефона:</label>
            <PhoneInput
              id="phone"
              name="Phone"
              country={'ru'}
              value={data.phone}
              onChange={e=>handleChange({target: {value:e, id: 'phone' }})}
            />
            {/* <input
              onChange={handleChange}
              id="phone"
              type="text"
              name="Phone"
              placeholder="Телефон"
              value={data.phone}
            /> */}

            <textarea
              onChange={handleChange}
              id="comment"
              rows="5"
              cols="40"
              name="Comment"
              placeholder="Оставьте комментарий"
              value={data.comment}
            ></textarea>

            <button onClick={handleSubmit} className={style.form__btn} type="submit">
            { isFetching ? <Loader /> : 'Отправить' }
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Form;
