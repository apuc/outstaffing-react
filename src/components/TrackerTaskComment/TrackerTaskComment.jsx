import React, { useState } from "react";

import { apiRequest } from "../../api/request";
import del from "../../assets/icons/delete.svg";
import edit from "../../assets/icons/edit.svg";
import accept from "../../assets/images/accept.png";
import { urlForLocal } from "../../utils/helper";
import { getCorrectDate } from "../Calendar/calendarHelper";
import TrackerTaskSubComment from "../TrackerTaskComment/TrackerTaskComment";

export const TrackerTaskComment = ({
  taskId,
  comment,
  commentDelete,
  addSubComment,
  subCommentDelete,
}) => {
  const [commentsEditOpen, setCommentsEditOpen] = useState(false);
  const [commentsEditText, setCommentsEditText] = useState(comment.text);
  const [subCommentsCreateOpen, setSubCommentsCreateOpen] = useState(false);
  const [subCommentsCreateText, setSubCommentsCreateText] = useState("");

  function editComment() {
    if (commentsEditText === comment.text) return;
    apiRequest("/comment/update", {
      method: "PUT",
      data: {
        comment_id: comment.id,
        text: commentsEditText,
      },
    }).then(() => {});
  }

  function deleteComment() {
    apiRequest("/comment/update", {
      method: "PUT",
      data: {
        comment_id: comment.id,
        status: 0,
      },
    }).then(() => {
      if (comment.parent_id) {
        subCommentDelete(comment);
      } else {
        commentDelete(comment);
      }
    });
  }

  function createSubComment() {
    setSubCommentsCreateOpen(false);
    if (!subCommentsCreateText) return;
    apiRequest("/comment/create", {
      method: "POST",
      data: {
        text: subCommentsCreateText,
        entity_type: 2,
        entity_id: taskId,
        parent_id: comment.id,
      },
    }).then((res) => {
      let newSubComment = res;
      newSubComment.created_at = new Date();
      setSubCommentsCreateText("");
      addSubComment(comment.id, newSubComment);
    });
  }

  return (
    <div
      className={[
        !comment.parent_id && comment.subComments.length
          ? "comments__list__item__main"
          : "",
        "comments__list__item",
        comment.parent_id ? "comments__list__item__subComment" : "",
      ].join(" ")}
    >
      <div className="comments__list__item__info">
        <div className="comments__list__item__fio">
          <img src={urlForLocal(comment.user.avatar)} alt="avatar" />
          <p>{comment.user.fio}</p>
        </div>
        <div className="comments__list__item__date">
          <span>{getCorrectDate(comment.created_at)}</span>
          {comment.user_id === Number(localStorage.getItem("id")) && (
            <>
              <div className={commentsEditOpen ? "edit edit__open" : "edit"}>
                <img
                  src={edit}
                  alt="edit"
                  onClick={() => {
                    if (commentsEditOpen) {
                      editComment();
                    }
                    setCommentsEditOpen(!commentsEditOpen);
                  }}
                />
              </div>
              <img src={del} alt="delete" onClick={() => deleteComment()} />
            </>
          )}
        </div>
      </div>
      {commentsEditOpen ? (
        <input
          className="comments__list__item__text"
          value={commentsEditText}
          onChange={(e) => {
            setCommentsEditText(e.target.value);
          }}
        />
      ) : (
        <p className="comments__list__item__text">{commentsEditText}</p>
      )}
      {!comment.parent_id && (
        <>
          {subCommentsCreateOpen ? (
            <div className="comments__list__item__answer__new">
              <input
                value={subCommentsCreateText}
                onChange={(e) => {
                  setSubCommentsCreateText(e.target.value);
                }}
              />
              <img
                src={accept}
                alt="accept"
                onClick={() => {
                  createSubComment();
                }}
              />
            </div>
          ) : (
            <span
              onClick={() => {
                setSubCommentsCreateOpen(true);
              }}
              className="comments__list__item__answer"
            >
              Ответить
            </span>
          )}
        </>
      )}
      {Boolean(comment.subComments?.length) &&
        comment.subComments.map((subComment) => {
          return (
            <TrackerTaskSubComment
              key={subComment.id}
              taskId={taskId}
              comment={subComment}
              subCommentDelete={subCommentDelete}
            />
          );
        })}
    </div>
  );
};

export default TrackerTaskComment;
