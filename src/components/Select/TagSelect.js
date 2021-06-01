// import React, { useState, useRef } from 'react';
// import Select from 'react-select';
// import style from './TagSelect.module.css';

// const options = [
//   { value: 'Ruby on Rails', label: 'Ruby on Rails' },
//   { value: 'Nginx', label: 'Nginx' },
//   { value: 'Docker', label: 'Docker' },
//   { value: 'PostgreSQL', label: 'PostgreSQL' },
//   { value: 'Vue.js', label: 'Vue.js' },
//   { value: 'Typescript', label: 'Typescript' },
//   { value: 'ReactJ', label: 'ReactJ' },
// ];

// const TagSelect = (selectArr) => {
//   console.log('selectArr', selectArr);
//   const [items, setItems] = useState([]);

//   const inputEl = useRef(null);

//   const test = () => {
//     console.log(inputEl);
//     inputEl.current.select.setValue(selectArr.selectArr);
//   };

//   const handleChange = (values) => {
//     console.log('values', values);
//     const selectItems = values.filter((value) => value);

//     setItems(selectItems);
//   };

//   const handleSubmit = () => {
//     const filterItems = JSON.stringify(items.map((item) => item.value));

//     alert(`Back-end: ${filterItems}`);

//     setItems([]);
//   };

//   return (
//     <>
//       <section className={style.search}>
//         <div className="container">
//           <div className="row">
//             <div className="col-12">
//               <h2 className={style.search__title}>Найти специалиста по навыкам</h2>
//               <div className={style.search__box}>
//                 <Select
//                   ref={inputEl}
//                   value={items}
//                   onChange={handleChange}
//                   isMulti
//                   name="tags"
//                   className={style.select}
//                   classNamePrefix={style.select}
//                   options={options}
//                 />
//                 <button onClick={handleSubmit} type="submit">
//                   Submit
//                 </button>
//                 <button onClick={test} type="submit">
//                   Submit
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default TagSelect;
