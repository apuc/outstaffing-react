import React from 'react';
import style from './Search.module.scss';

const Search = () => {
  return (
    <section class={style.search}>
      <div class="container">
        <div class="row">
          <div class="col-12">
            <h2>Найти специалиста по навыкам</h2>

            <form action="">
              <button type={style.submit}>JavaScript</button>
              <input type={style.text} />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Search;
