import React from "react";

import "./allMyTasksItem.scss";

const AllMyTasksItem = ({ task, projects, currentItems }) => {
  function toggleDescTask(e) {
    e.target.closest("img").classList.toggle("open-desc-item");
    e.target
      .closest("td")
      ?.querySelector(".taskList__table__name-project")
      .classList.toggle("hide-desc");
  }

  return (
    <tr key={task.id}>
      <td>
        <div className="taskList__table__title-task">
          <p>
            {task.title}#{currentItems}
          </p>

          <div
            onClick={(e) => {
              toggleDescTask(e);
            }}
          >
            <img src={plus} alt="#" />
          </div>
        </div>
        <div className="taskList__table__name-project hide-desc">
          <h4>Проект:</h4>
          <p>
            {projects.map((project) => {
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

export default AllMyTasksItem;
