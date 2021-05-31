import React, { useState, useEffect } from 'react';
import style from './Outstaffing.module.css';
import front from '../../../images/front_end.png';
import back from '../../../images/back_end.png';
import design from '../../../images/design.png';
import OutstaffingBlock from '../../Blocks/OutstaffingBlock';

const Outstaffing = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const tempData = ['Ruby on Rails', 'Nginx', 'Docker', 'PostgreSQL', 'Git', 'Typescript', 'ReactJS'];
    setData(tempData);
  }, []);

  return (
    <section className={style.outstaffing}>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className={style.outstaffing__title}>
              <h2>
                <span>Аутстаффинг</span> it-персонала
              </h2>
            </div>
          </div>
        </div>

        <div className="row">
          <OutstaffingBlock image={front} data={data} header={'# Популярный стек'} />
          <OutstaffingBlock image={back} data={data} header={'# Популярный стек'} />
          <OutstaffingBlock image={design} data={data} header={'# Популярный стек'} />
        </div>
      </div>
    </section>
  );
};

export default Outstaffing;
