import React from "react";

import ArchiveTasksItem from "@components/ArchiveTableTracker/ArchiveTasksItem/ArchiveTasksItem";

import "./archiveTableTracker.scss";

const ArchiveTableTracker = ({ filterCompleteTasks, loader }) => {
  return (
    <table className="archive__table">
      <thead>
        <tr>
          <th>Задача</th>
          <th>Потраченное время</th>
          <th>Дата окончания</th>
        </tr>
      </thead>
      <tbody>
        {!loader && (
          <>
            {Boolean(filterCompleteTasks.length) ? (
              filterCompleteTasks.map((task, index) => {
                return (
                  <ArchiveTasksItem task={task} index={index} key={index} />
                );
              })
            ) : (
              <div className="archive__noItem">
                <p>В данном месяце у вас не было задач</p>
              </div>
            )}
          </>
        )}
      </tbody>
    </table>
  );
};

export default ArchiveTableTracker;
