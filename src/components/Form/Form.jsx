import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";

import { apiRequest } from "@api/request";
import { Loader } from "@components/Loader/Loader";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import "react-phone-input-2/lib/style.css";
import "./form.scss";

const SweetAlert = withReactContent(Swal);

const Form = () => {
  const navigate = useNavigate();

  const urlParams = useParams();

  const [status, setStatus] = useState(null);
  const [data, setData] = useState({
    email: "",
    phone: "",
    comment: "",
  });
  const [isFetching, setIsFetching] = useState(false);

  const handleModal = (status) => {
    SweetAlert.fire({
      text:
        status !== 200 || 201 ? "Какие-то неполадки =(" : "Форма отправлена",
      preConfirm: () =>
        status !== 200 || 201
          ? () => {
              setStatus(null);
            }
          : () => {
              setStatus(null);
              navigate(`/candidate/${urlParams.id}`);
            },
    });
  };

  useEffect(() => {
    if (status) {
      handleModal(status);
    }
  }, [status]);

  const handleChange = (e) => {
    const { id, value } = e.target;

    setData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsFetching(true);
    const formData = new FormData();
    formData.append("profile_id", urlParams.id);
    formData.append("Email", data.email);
    formData.append("phone", data.phone);
    formData.append("comment", data.comment);

    apiRequest("/interview-request/create-interview-request", {
      method: "POST",
      params: {
        profile_id: urlParams.id,
        ...data,
      },
    }).then((res) => {
      setStatus(res);
      setIsFetching(false);
    });
  };

  return (
    <div className="row">
      <div className="col-sm-12">
        <form className="form" id="test">
          <label htmlFor="email">Емейл:</label>
          <input
            onChange={handleChange}
            id="email"
            name="Email"
            type="email"
            placeholder="Емейл"
            value={data.email}
          />

          <label htmlFor="phone">Номер телефона:</label>
          <PhoneInput
            id="phone"
            name="Phone"
            country={"ru"}
            value={data.phone}
            onChange={(e) =>
              handleChange({ target: { value: e, id: "phone" } })
            }
          />

          <textarea
            onChange={handleChange}
            id="comment"
            rows="5"
            cols="40"
            name="Comment"
            placeholder="Оставьте комментарий"
            value={data.comment}
          ></textarea>

          <button onClick={handleSubmit} className="form__btn" type="submit">
            {isFetching ? <Loader /> : "Отправить"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
