import React, { useState } from 'react';
import style from './Form.module.css';
import { fetchForm } from '../../server/server';

const Form = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [comment, setСomment] = useState('');
  const [name, setName] = useState('');

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name === 'Email') {
      setEmail(value);
    } else if (name === 'Phone') {
      setPhone(value);
    } else if (name === 'Comment') {
      setСomment(value);
    } else {
      return;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const info = {
      email: email,
      phone: phone,
      comment: comment,
    };

    fetchForm('https://guild.craft-group.xyz/api/profile/add-to-interview', info)
      .then((el) => {
        return el.json();
      })
      .then((e) => {
        setName(e);
      });
  };

  console.log('NAME ', name);

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-12">
          <form className={style.form}>
            <label htmlFor="email">Емейл:</label>
            <input onChange={handleChange} id="email" name="Email" type="email" placeholder="Емейл" value={email} />

            <label htmlFor="phone">Номер телефона:</label>
            <input onChange={handleChange} id="phone" type="number" name="Phone" placeholder="Телефон" value={phone} />

            <textarea
              onChange={handleChange}
              rows="5"
              cols="40"
              name="Comment"
              placeholder="Оставьте комментарий"
              value={comment}
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
