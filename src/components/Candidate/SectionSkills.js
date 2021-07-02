import React from 'react';
import style from './Candidate.module.css';

const SectionSkills = ({ skillsArr }) => {
  return (
    <div className={style.SectionSkills}>
      <h3>Навыки:</h3>
      {skillsArr.map((skills) => (
        <p key={skills.id}>{skills.skill.name}</p>
      ))}
    </div>
  );
};

export default SectionSkills;
