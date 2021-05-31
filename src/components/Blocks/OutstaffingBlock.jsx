import style from '../../components/Home/sections/Outstaffing.module.css';

const OutstaffingBlock = ({ header , image, data }) => {
    return (
      <div className="col-4">
        <div className={style.outstaffing__box}>
          <img src={image} alt={header} />
          <p>{header}</p>
          <ul className={style.items}>
            {data.map((item, index) => (
              <li key={index.toString()} onClick={() => console.log(item, index)}>{index + 1} {item}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  export default OutstaffingBlock