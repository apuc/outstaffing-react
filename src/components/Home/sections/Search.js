import React, { useState } from 'react';
import style from './Search.module.scss';

export const candidatesList = [
  { id: 1, name: 'Artyom' },
  { id: 2, name: 'Vitaliy' },
];

const Search = ({ onTe }) => {
  const [input, setInput] = useState('');

  // const test = (input, candidatesList) => {
  //   return candidatesList.filter((el) => el.name.toLowerCase().includes(input.toLowerCase()));
  // };

  const handleSubmit = (e) => {
    e.preventDefault();

    setInput('');
  };

  return (
    <section className={style.search}>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h2>Найти специалиста по навыкам</h2>

            <form action="" onSubmit={handleSubmit}>
              <button type={style.submit}>JavaScript</button>
              <input value={input} onChange={(e) => setInput(e.target.value)} type={style.text} />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Search;
