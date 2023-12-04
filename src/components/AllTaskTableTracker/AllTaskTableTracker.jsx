import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import ReactPaginate from "react-paginate";

import AllTaskTableItem from "./AllTaskTableItem/AllTaskTableItem";
import "./allTaskTableTracker.scss";

const AllTaskTableTracker = ({ filteredAllTasks, projects, loader }) => {
  const lol = [
    {
      id: 216,
      project_id: 66,
      project_name: "Tuman 2",
      title: "Турниры",
      created_at: "2023-06-28 13:31:11",
      updated_at: "2023-11-07 11:02:50",
      dead_line: "2023-11-10 12:32:42",
      description:
        "Когда проект передавался - турниры уже были взяты в работу, там была сделана какая-то мелочь. В данный момент статус неизвестен.",
      status: 1,
      column_id: 138,
      user_id: 83,
      user: {
        fio: "Виктор Батищев",
        avatar: "/profileava/m2.png",
      },
      executor_id: 110,
      priority: 1,
      executor: {
        fio: "Овсянников Максим Сергеевич",
        avatar: "/profileava/m2.png",
      },
      comment_count: 0,
      taskUsers: [
        {
          id: 86,
          task_id: 216,
          user_id: 110,
          fio: "Овсянников Максим Сергеевич",
          avatar: "/profileava/m2.png",
        },
      ],
      mark: [],
      execution_priority: null,
      timers: [
        {
          id: 172,
          user_id: 110,
          created_at: "2023-10-23 10:37:39",
          stopped_at: "2023-10-23 10:38:01",
          entity_id: 216,
          entity_type: 2,
          delta: {
            y: 0,
            m: 0,
            d: 0,
            h: 0,
            i: 0,
            s: 22,
            f: 0,
            weekday: 0,
            weekday_behavior: 0,
            first_last_day_of: 0,
            invert: 0,
            days: 0,
            special_type: 0,
            special_amount: 0,
            have_weekday_relative: 0,
            have_special_relative: 0,
          },
          deltaSeconds: 22,
          status: 1,
        },
      ],
    },
    {
      id: 404,
      project_id: 93,
      project_name: "Тест2",
      title: "Кек",
      created_at: "2023-10-11 19:04:14",
      updated_at: "2023-10-11 19:04:19",
      dead_line: "2023-10-11 16:03:51",
      description: "<p>12321313</p>",
      status: 0,
      column_id: 182,
      user_id: 110,
      user: {
        fio: "Овсянников Максим Сергеевич",
        avatar: "/profileava/m2.png",
      },
      executor_id: 110,
      priority: 1,
      executor: {
        fio: "Овсянников Максим Сергеевич",
        avatar: "/profileava/m2.png",
      },
      comment_count: 0,
      taskUsers: [],
      mark: [],
      execution_priority: null,
      timers: [],
    },
    {
      id: 405,
      project_id: 93,
      project_name: "Тест2",
      title: "15481",
      created_at: "2023-10-11 19:04:49",
      updated_at: "2023-10-11 19:05:24",
      dead_line: "2023-10-11 16:04:32",
      description: "<p>Тест</p>",
      status: 0,
      column_id: 182,
      user_id: 110,
      user: {
        fio: "Овсянников Максим Сергеевич",
        avatar: "/profileava/m2.png",
      },
      executor_id: 110,
      priority: 1,
      executor: {
        fio: "Овсянников Максим Сергеевич",
        avatar: "/profileava/m2.png",
      },
      comment_count: 0,
      taskUsers: [],
      mark: [],
      execution_priority: null,
      timers: [
        {
          id: 162,
          user_id: 110,
          created_at: "2023-10-11 16:04:53",
          stopped_at: "2023-10-11 16:05:20",
          entity_id: 405,
          entity_type: 2,
          delta: {
            y: 0,
            m: 0,
            d: 0,
            h: 0,
            i: 0,
            s: 27,
            f: 0,
            weekday: 0,
            weekday_behavior: 0,
            first_last_day_of: 0,
            invert: 0,
            days: 0,
            special_type: 0,
            special_amount: 0,
            have_weekday_relative: 0,
            have_special_relative: 0,
          },
          deltaSeconds: 27,
          status: 1,
        },
      ],
    },
    {
      id: 403,
      project_id: 66,
      project_name: "Tuman 2",
      title: "Тест",
      created_at: "2023-10-11 19:03:28",
      updated_at: "2023-10-13 18:01:33",
      dead_line: "2023-10-11 16:02:52",
      description: "<p>Тест2</p>",
      status: 0,
      column_id: 136,
      user_id: 110,
      user: {
        fio: "Овсянников Максим Сергеевич",
        avatar: "/profileava/m2.png",
      },
      executor_id: 110,
      priority: -1,
      executor: {
        fio: "Овсянников Максим Сергеевич",
        avatar: "/profileava/m2.png",
      },
      comment_count: 0,
      taskUsers: [],
      mark: [],
      execution_priority: null,
      timers: [
        {
          id: 169,
          user_id: 110,
          created_at: "2023-10-13 15:00:16",
          stopped_at: "2023-10-13 15:01:30",
          entity_id: 403,
          entity_type: 2,
          delta: {
            y: 0,
            m: 0,
            d: 0,
            h: 0,
            i: 1,
            s: 14,
            f: 0,
            weekday: 0,
            weekday_behavior: 0,
            first_last_day_of: 0,
            invert: 0,
            days: 0,
            special_type: 0,
            special_amount: 0,
            have_weekday_relative: 0,
            have_special_relative: 0,
          },
          deltaSeconds: 74,
          status: 1,
        },
      ],
    },
  ];

  const [items, setItems] = useState([]);
  const itemsPerPage = 2;

  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    setItems(filteredAllTasks);
  }, [filteredAllTasks]);

  // Баг с отрисовкой массив currentItems пустой
  console.log(currentItems);
  console.log(items);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(items.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(items.length / itemsPerPage));
  }, [itemOffset, itemsPerPage]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <table className="taskList__table">
        <thead>
          <tr>
            <th>Задача</th>
            <th>Статус</th>
            <th>Потраченное время</th>
            <th>Дата начала</th>
            <th>Дедлайн</th>
          </tr>
        </thead>

        <tbody>
          {!loader && (
            <>
              {Boolean(currentItems.length) &&
                currentItems.map((task, index) => {
                  return (
                    <AllTaskTableItem
                      projects={projects}
                      task={task}
                      key={index}
                    />
                  );
                })}
            </>
          )}
        </tbody>
      </table>

      <ReactPaginate
        nextLabel="вперед >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel="< назад"
        pageClassName="pagination__item"
        pageLinkClassName="pagination__link"
        previousClassName="pagination__item"
        previousLinkClassName="pagination__link"
        nextClassName="pagination__item"
        nextLinkClassName="pagination__link"
        breakLabel="..."
        breakClassName="pagination__item"
        breakLinkClassName="pagination__link"
        containerClassName="pagination"
        activeClassName="active-btn"
        renderOnZeroPageCount={null}
      />
    </>
  );
};

export default AllTaskTableTracker;
