import React from 'react'
import './skillSection.scss'

const SkillSection = ({ skillsArr }) => {
  return (
    <div className='skill-section'>
      <h3>Навыки:</h3>
      <ul>
        {skillsArr &&
          skillsArr.map((skills) => (
            <li key={skills.id}>{skills.skill.name}</li>
          ))}
      </ul>
    </div>
  )
}

export default SkillSection
