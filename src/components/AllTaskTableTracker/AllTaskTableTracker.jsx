import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import ReactPaginate from "react-paginate";

import AllTaskTableItem from "./AllTaskTableItem/AllTaskTableItem";
import "./allTaskTableTracker.scss";

const AllTaskTableTracker = ({ filteredAllTasks, projects, loader }) => {
  const [items, setItems] = useState([]);
  const itemsPerPage = 10;

  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    setItems(filteredAllTasks);
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(filteredAllTasks.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filteredAllTasks.length / itemsPerPage));
  }, [filteredAllTasks]);

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

      {currentItems.length < itemsPerPage ? (
        ""
      ) : (
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
      )}
    </>
  );
};

export default AllTaskTableTracker;
