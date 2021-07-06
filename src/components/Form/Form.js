import React, { useState } from 'react';
import style from './Form.module.css';
import { fetchForm } from '../../server/server';

const Form = () => {
  const [data, setData] = useState({
    email: '',
    phone: '',
    comment: '',
  });

  const handleChange = (e) => {
    const newData = { ...data };
    newData[e.target.id] = e.target.value;
    setData(newData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('email', data.email);
    formData.append('phone', data.phone);
    formData.append('comment', data.comment);

    fetchForm('https://guild.craft-group.xyz/api/profile/add-to-interview', formData);
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   fetchForm('https://guild.craft-group.xyz/api/profile/add-to-interview', data)
  //     .then((el) => {
  //       return el.json();
  //     })
  //     .then((e) => {
  //       console.log(e);
  //     });
  // };

  return (
    <div className="container">
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
            <input
              onChange={handleChange}
              id="phone"
              type="number"
              name="Phone"
              placeholder="Телефон"
              value={data.phone}
            />

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
              Отправить
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;
