import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchResultTest, selectedTest, selectResult} from "../../../redux/quizSlice";
import {fetchGet} from "../../../server/server";


export const Results = () => {
   const result = useSelector(selectResult);
   const test = useSelector(selectedTest);
   const [maxScore, setMaxScore] = useState('');
   const dispatch = useDispatch();

   useEffect(async () => {
      dispatch(fetchResultTest(test.uuid));
      const response = await fetchGet({
           link: `${process.env.REACT_APP_API_URL}/api/user-questionnaire/get-points-number?user_questionnaire_uuid=${test.uuid}`,
           Origin: `${process.env.REACT_APP_BASE_URL}`,
        }
      );
      setMaxScore(response.sum_point)
   }, []);

   return (
     <div className={'result _container'}>
        {
           !result ? <h1 style={{display: "block"}}>Ожидайте результата...</h1> :

             <div className="result__body">
                <div className="result__text">Благодарим за прохождение теста</div>
                <div className="result__text">Ваш Результат: <span
                  className="result__score">{result.score}</span> из {maxScore} </div>
             </div>
        }
     </div>
   );
};

