import React from "react";
import ReactPaginate from "react-paginate";

import AllMyTasksItem from "@components/Common/AllMyTasksItem/AllMyTasksItem";

const ArchiveTableTracker = ({ filterCompleteTasks, projects, loader }) => {
  return (
    <>
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
                  <AllMyTasksItem task={task} projects={projects} />;
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
    </>
  );
};

export default ArchiveTableTracker;
