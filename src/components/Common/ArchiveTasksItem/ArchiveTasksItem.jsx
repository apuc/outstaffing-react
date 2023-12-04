import React from "react";

import { getCorrectDate } from "@components/Calendar/calendarHelper";

import "./archiveTasksItem.scss";

const ArchiveTasksItem = ({ task, index }) => {
  return (
    <tr key={index}>
      <td className="archive__completeTask__description">
        <p className="completeTask__title">{task.title}</p>
        <p
          className="date"
          dangerouslySetInnerHTML={{
            __html: task.description,
          }}
        />
      </td>
      <td className="archive__completeTask__time">
        <p>
          {task.timers.length == 0
            ? "-"
            : task.timers.map((item) => {
                let time = new Date(item.deltaSeconds * 1000)
                  .toISOString()
                  .slice(11, 19);
                return `${time}`;
              })}
        </p>
      </td>
      <td className="archive__completeTask__info">
        <div>
          <p>{getCorrectDate(task.updated_at)}</p>
        </div>
      </td>
    </tr>
  );
};

export default ArchiveTasksItem;
