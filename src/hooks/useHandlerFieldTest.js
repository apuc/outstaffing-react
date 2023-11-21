import { useState } from "react";

export const useHandlerFieldTest = ({uuid,questions,indexQuestion}) => {
  const [values, setValues] = useState([])
  const id = localStorage.getItem("id");
  const handleChangeCheckbox = (e) => {
    if (!e.target.checked) {
      setValues((prev) => [
        ...prev.filter((item) => item.response_body !== e.target.value)
      ]);
      return;
    }
    setValues((prev) => [
      ...prev, {
        user_id: id,
        user_questionnaire_uuid: uuid,
        question_id: questions[indexQuestion].id,
        response_body: e.target.value
      }
    ]);
  };

  const handleFieldsForm = (e) => {
    setValues([{
      user_id: id,
      user_questionnaire_uuid: uuid,
      question_id: questions[indexQuestion].id,
      response_body: e.target.value
    }
    ]);
  }
  const handleChange = (e) => {
    if (+questions[indexQuestion].question_type_id !== 3) {
      handleFieldsForm(e)
      return;
    }
    handleChangeCheckbox(e)
  };
  return {handleChange,values,setValues}
}