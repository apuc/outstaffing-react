import React, { useEffect, useState } from "react";
import ModalSettings from "../UI/ModalSettings/ModalSettings";

import link from "../../images/link.svg";
import archiveSet from "../../images/archive.svg";
import del from "../../images/delete.svg";
import edit from "../../images/edit.svg";

// import {apiRequest} from "../../api/request";
import {useDispatch} from "react-redux";
import { setProjectBoardFetch } from "../../redux/projectsTrackerSlice";

import "./projectTiket.scss";

export const ProjectTiket = ({ project, index, setOpenProject }) => {
  const [modalSettings, setModalSettings] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    initListeners();
  }, []);

  function initListeners() {
    document.addEventListener("click", closeByClickingOut);
  }

  function closeByClickingOut(event) {
    const path = event.path || (event.composedPath && event.composedPath());

    if (
      event &&
      !path.find((item) => item.classList && item.classList.contains("project"))
    ) {
      setModalSettings(false);
    }
  }

  return (
    <div className="project" key={index}>
      <h3 onClick={() =>{
          setOpenProject(true)
          dispatch(setProjectBoardFetch(project.id))
      }}>{project.name}</h3>
      <div className="project__info">
        <p>Открытые задачи</p>
        <span className="count">-</span>
        {/*<span className="add">{project.columns.length ? '+' : ''}</span>*/}
        <span className="menu-settings" onClick={() => setModalSettings(true)}>
          ...
        </span>
      </div>

      <ModalSettings active={modalSettings}>
        <div className="project__settings-menu">
          <div>
            <img src={edit}></img>
            <p>редактировать</p>
          </div>
          <div>
            <img src={link}></img>
            <p>ссылка на проект</p>
          </div>
          <div>
            <img src={archiveSet}></img>
            <p>в архив</p>
          </div>
          <div>
            <img src={del}></img>
            <p>удалить</p>
          </div>
        </div>
      </ModalSettings>
    </div>
  );
};

export default ProjectTiket;
