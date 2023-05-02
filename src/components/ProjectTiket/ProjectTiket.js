import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import ModalSettings from "../UI/ModalSettings/ModalSettings";

import link from "../../images/link.svg";
import archiveSet from "../../images/archive.svg";
import del from "../../images/delete.svg";
import edit from "../../images/edit.svg";

import {apiRequest} from "../../api/request";
import {useDispatch} from "react-redux";
import { deleteProject } from "../../redux/projectsTrackerSlice";

import "./projectTiket.scss";

export const ProjectTiket = ({ project, index }) => {
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

  function removeProject() {
    apiRequest('/project/update', {
      method: 'PUT',
      data: {
        project_id: project.id,
        status: 0
      }
    }).then((res) => {
      dispatch(deleteProject(project))
    })
  }

  return (
    <div className="project" key={index}>
      <Link to={`/tracker/project/${project.id}`}>{project.name}</Link>
      <div className="project__info">
        <p>Открытые задачи</p>
        <span className="count">{project.columns.reduce((accumulator, currentValue) => accumulator + currentValue.tasks.length, 0)}</span>
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
          <div
            onClick={removeProject}>
            <img src={del}></img>
            <p>удалить</p>
          </div>
        </div>
      </ModalSettings>
    </div>
  );
};

export default ProjectTiket;
