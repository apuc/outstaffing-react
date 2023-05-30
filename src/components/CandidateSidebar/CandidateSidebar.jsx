import React, { useState } from "react";

import { Achievement } from "@components/Achievement/Achievement";
import ModalAspirant from "@components/Modal/ModalAspirant/ModalAspirant";

import { urlForLocal } from "@utils/helper";
import { LEVELS, SKILLS } from "@utils/constants";

import "./candidateSidebar.scss";

const getYearsString = (years) => {
  let yearsString;
  if (years % 10 === 1) {
    yearsString = "год";
  } else if (years === 11 || years === 12 || years === 13 || years === 14) {
    yearsString = "лет";
  } else if (years % 10 === 2 || years % 10 === 3 || years % 10 === 4) {
    yearsString = "года";
  } else {
    yearsString = "лет";
  }
  return `${years} ${yearsString}`;
};

const CandidateSidebar = ({ candidate, setActiveSnippet, activeSnippet }) => {
  const userId = localStorage.getItem("id");

  const [addAspt, setAddAspt] = useState(false);

  const showSnippet = () => {
    setActiveSnippet(!activeSnippet);
  };

  let levelAspt = {
    spec: candidate.specification,
    skils: SKILLS[candidate.position_id],
    level: LEVELS[candidate.level],
  };

  return (
    <div className="candidate-sidebar">
      <ModalAspirant
        active={addAspt}
        setActive={setAddAspt}
        level={levelAspt}
      ></ModalAspirant>

      <div className="candidate-sidebar__info">
        <div className="candidate-sidebar__position">
          <h2>
            {candidate.specification} {SKILLS[candidate.position_id]},{" "}
            {LEVELS[candidate.level]}{" "}
          </h2>
        </div>
        {candidate.photo && <img src={urlForLocal(candidate.photo)} alt="" />}
        {candidate && candidate.years_of_exp && (
          <>
            <p className="candidate-sidebar__experience-title">Опыт работы</p>
            <p className="candidate-sidebar__experience">
              {getYearsString(candidate.years_of_exp)}
            </p>
          </>
        )}

        <button
          className="candidate-sidebar__select"
          onClick={() => setAddAspt(true)}
        >
          Выбрать к собеседованию
        </button>

        {userId && (
          <>
            <button className="candidate-sidebar__select" onClick={showSnippet}>
              {activeSnippet ? "Код разработчика" : "Скрыть"}
            </button>
            <div className="candidate-sidebar__achievements">
              {candidate &&
                candidate.achievements &&
                candidate.achievements.map((item) => {
                  return (
                    <Achievement key={item.id} achievement={item.achievement} />
                  );
                })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CandidateSidebar;
