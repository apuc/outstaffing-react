import React from 'react';
import './candidate.css';

const SectionSkills = ({ skillsArr }) => {
  return (
    <div className='SectionSkills'>
      <h3>Навыки:</h3>
      <ul>{skillsArr && skillsArr.map((skills) => <li key={skills.id}>{skills.skill.name}</li>)}</ul>
    </div>
  );
};

export default SectionSkills;
