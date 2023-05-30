import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { apiRequest } from "@api/request";
import { deleteProject, modalToggle } from "@redux/projectsTrackerSlice";

import { ModalSelect } from "@components/UI/ModalSelect/ModalSelect";
import TrackerModal from "@components/UI/TrackerModal/TrackerModal";

import link from "assets/icons/link.svg";
import archiveSet from "assets/icons/archive.svg";
import del from "assets/icons/delete.svg";
import edit from "assets/icons/edit.svg";

import "./projectTiket.scss";

export const ProjectTiket = ({ project, index }) => {
  const [modalSelect, setModalSelect] = useState(false);
  const [modalAdd, setModalAdd] = useState(false);
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
      setModalSelect(false);
    }
  }

  function removeProject() {
    apiRequest("/project/update", {
      method: "PUT",
      data: {
        project_id: project.id,
        status: 10,
      },
    }).then((res) => {
      dispatch(deleteProject(project));
    });
  }

  return (
    <div className="project" key={index}>
      <Link to={`/tracker/project/${project.id}`}>{project.name}</Link>
      <div className="project__info">
        <p>Открытые задачи</p>
        <span className="count">
          {project.columns.reduce(
            (accumulator, currentValue) =>
              accumulator + currentValue.tasks.length,
            0
          )}
        </span>
        <span className="menu-settings" onClick={() => setModalSelect(true)}>
          ...
        </span>
      </div>

      <TrackerModal
        active={modalAdd}
        setActive={setModalAdd}
        defautlInput={project.name}
        projectId={project.id}
      ></TrackerModal>

      <ModalSelect active={modalSelect}>
        <div className="project__settings-menu">
          <div
            onClick={() => {
              dispatch(modalToggle("editProject"));
              setModalAdd(true);
              setModalSelect(false);
            }}
          >
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
          <div onClick={removeProject}>
            <img src={del}></img>
            <p>удалить</p>
          </div>
        </div>
      </ModalSelect>
    </div>
  );
};

export default ProjectTiket;
