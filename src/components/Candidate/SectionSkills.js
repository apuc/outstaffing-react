import React from 'react';
import style from './Candidate.module.css';

const SectionSkills = ({ skillsArr }) => {
  return (
    <div className={style.SectionSkills}>
      <h3>Навыки:</h3>
      <ul>{skillsArr && skillsArr.map((skills) => <li key={skills.id}>{skills.skill.name}</li>)}</ul>
    </div>
  );
};

export default SectionSkills;
