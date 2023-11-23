import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { deleteProject, modalToggle } from "@redux/projectsTrackerSlice";

import { copyProjectLink } from "@utils/helper";

import { apiRequest } from "@api/request";

import { useNotification } from "@hooks/useNotification";

import AcceptModal from "@components/Modal/AcceptModal/AcceptModal";
import { ModalSelect } from "@components/Modal/ModalSelect/ModalSelect";
import TrackerModal from "@components/Modal/Tracker/TrackerModal/TrackerModal";

import archiveSet from "assets/icons/archive.svg";
import del from "assets/icons/delete.svg";
import edit from "assets/icons/edit.svg";
import link from "assets/icons/link.svg";
import avatarProject from "assets/images/avatarMok.png";

import "./projectTiket.scss";

export const ProjectTiket = ({ project, index }) => {
  const [modalSelect, setModalSelect] = useState(false);
  const [modalAdd, setModalAdd] = useState(false);
  const [acceptModalOpen, setAcceptModalOpen] = useState(false);
  const [path, setPath] = useState("");
  const dispatch = useDispatch();
  const { showNotification } = useNotification();

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
      !path.find(
        (div) =>
          div.classList && div.classList.contains(`project-${project.id}`)
      )
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
    }).then(() => {
      dispatch(deleteProject(project));
      showNotification({
        show: true,
        text: "Проект успешно была перемещена в архив",
        type: "archive",
      });
    });
  }

  function closeAcceptModal() {
    setAcceptModalOpen(false);
  }

  function linkProject() {}

  return (
    <div className={`project project-${project.id}`} key={index}>
      <Link
        to={`/tracker/project/${project.id}`}
        className="project__open-traker"
      >
        <div className="project__link">{project.name}</div>

        <div className="project__info">
          <p>Открытые задачи</p>
          <span className="count">
            {project.columns.reduce(
              (accumulator, currentValue) =>
                accumulator + currentValue.tasks.length,
              0
            )}
          </span>
          <img src={avatarProject} alt="#" className="project__avatar" />
        </div>
      </Link>

      <span
        className="menu-settings"
        onClick={() => {
          setModalSelect(!modalSelect);
        }}
      >
        ...
      </span>

      <Link
        to={`/profile/statistics/${project.id}`}
        className="project__statistics"
      >
        Просмотреть статистику
      </Link>

      <TrackerModal
        active={modalAdd}
        setActive={setModalAdd}
        defautlInput={project.name}
        projectId={project.id}
      ></TrackerModal>

      <ModalSelect active={modalSelect} onClick={(e) => e.stopPropagation()}>
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
            <p onClick={copyProjectLink(project.id)}>ссылка на проект</p>
          </div>
          <div
            onClick={() => {
              setModalSelect(false);
              setAcceptModalOpen(true);
            }}
          >
            <img src={archiveSet}></img>
            <p>в архив</p>
          </div>
          <div onClick={removeProject}>
            <img src={del}></img>
            <p>удалить</p>
          </div>
        </div>
      </ModalSelect>
      {acceptModalOpen && (
        <AcceptModal
          closeModal={closeAcceptModal}
          agreeHandler={removeProject}
        />
      )}
    </div>
  );
};

export default ProjectTiket;
