import React from "react";

import plus from "assets/icons/plus.svg";

import "./allTaskTableItem.scss";

const AllTaskTableItem = ({ task, projects }) => {
  function toggleDescTask(e) {
    e.target?.classList.toggle("open-desc-item");
    e.target
      .closest("td")
      ?.querySelector(".taskList__table__name-project")
      .classList.toggle("hide-desc");
  }

  return (
    <tr key={task.id}>
      <td>
        <div className="taskList__table__title-task">
          <p>{task.title}</p>

          <img
            src={plus}
            alt="#"
            onClick={(e) => {
              toggleDescTask(e);
            }}
          />
        </div>
        <div className="taskList__table__name-project hide-desc">
          <h4>Проект:</h4>
          <p>
            {projects?.map((project) => {
              if (project.id == task.project_id) {
                return project.name;
              }
            })}
          </p>
        </div>
      </td>
      <td>
        <div className="task-status">
          {task.status == 1 ? "Active" : "Close"}
        </div>
      </td>
      <td>
        {task.timers.map((item) => {
          let time = new Date(item.deltaSeconds * 1000)
            .toISOString()
            .slice(11, 19);
          return `${time}`;
        })}
      </td>
      <td>{new Date(task.created_at).toLocaleDateString()}</td>
      <td>{new Date(task.dead_line).toLocaleDateString()}</td>
    </tr>
  );
};

export default AllTaskTableItem;
