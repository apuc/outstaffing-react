import React from 'react';
import style from './InputsComponent.module.css';

const InputsComponent = ({ inputsArr, deleteInput, remove }) =>
  inputsArr.map((input) => (
    <form id={input} key={input} className={style.reportForm__form}>
      {/* <span>{input}.</span> */}
      <div className={style.input__text}>
        <input name="text" type="text" />
      </div>
      <div className={style.input__number}>
        <input name="number" type="number" min="1" />
      </div>
      <img onClick={() => deleteInput(input)} src={remove} alt="" />
    </form>
  ));

export default InputsComponent;
