import React from 'react';

export const GetOptionTask = ({type, answer, handleChange, inputValue}) => {
   switch (type) {
      case "3":
         return (
           <div className="form-task__group" key={answer.id}>
              <input className='form-task__check' type="checkbox" value={answer.answer_body} id={answer.id}
                     onChange={handleChange}/>
              <label htmlFor={answer.id}>{answer.answer_body}</label>
           </div>
         )
      case "2":
      case "4":
         return (
           <div className="form-task__group" key={answer.id}>
              <input className='form-task__check' type="radio" value={answer.answer_body} name={'radio'} id={answer.id}
                     onChange={handleChange}/>
              <label htmlFor={answer.id}>{answer.answer_body}</label>
           </div>
         )
      case "1":
         return (
           <div className="form-task__group">
              <textarea className='form-task__field' value={inputValue}
                        onChange={handleChange}/>
           </div>
         )
      default:
         return (
           <div className="form-task__group" key={answer.id}>
              <input className='form-task__check' type="checkbox" value={answer.answer_body} id={answer.id}
                     onChange={handleChange}/>
              <label htmlFor={answer.id}>{answer.answer_body}</label>
           </div>
         )
   }
}
