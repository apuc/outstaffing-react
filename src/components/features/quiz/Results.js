import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchResultTest, selectedTest, selectResult } from "@redux/quizSlice";
import { apiRequest } from "@api/request";

export const Results = () => {
  const result = useSelector(selectResult);
  const test = useSelector(selectedTest);
  const [maxScore, setMaxScore] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchResultTest(test.uuid));
    apiRequest(
      `/user-questionnaire/get-points-number?user_questionnaire_uuid=${test.uuid}`
    ).then((res) => setMaxScore(res.sum_point));
  }, [apiRequest, dispatch, test]);

  return (
    <div className={"result _container"}>
      {!result ? (
        <h1 style={{ display: "block" }}>Ожидайте результата...</h1>
      ) : (
        <div className="result__body">
          <div className="result__text">Благодарим за прохождение теста</div>
          <div className="result__text">
            Ваш Результат: <span className="result__score">{result.score}</span>{" "}
            из {maxScore}{" "}
          </div>
        </div>
      )}
    </div>
  );
};
