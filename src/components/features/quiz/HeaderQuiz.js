import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {selectUserInfo, setQuestionnairesList, setUserInfo} from "../../../redux/quizSlice";
import {useRequest} from "../../../hooks/useRequest";
import './quiz.scss'

export const HeaderQuiz = ({header}) => {

  const dispatch = useDispatch();
  const userId = localStorage.getItem('id');
  const userInfo = useSelector(selectUserInfo);

  const {apiRequest} = useRequest();

  useEffect(() => {
    dispatch(setUserInfo(userId))
  }, [dispatch]);

  useEffect(() => {
    apiRequest(`/user-questionnaire/questionnaires-list?user_id=${userId}`)
        .then(res => dispatch(setQuestionnairesList(res)))
  }, [dispatch]);

  return (
      <div>
        {userInfo?.status === 500 ? <div className="error-msg">{userInfo.message}</div> :
            <div className="header-quiz">
              <div className="header-quiz__container">
                {!userInfo ? <h2>Loading...</h2> :
                    <>
                      {header && <h2 className={'header-quiz__title-main'}>Добрый день, {userInfo.fio}</h2>}
                      <div className="header-quiz__body header-quiz__body_interjacent">
                        <div className="header-quiz__avatar">
                          <img src={userInfo.photo} alt={userInfo.photo}/>
                        </div>
                        <div className="header-quiz__name-user">{userInfo.fio}</div>
                        <div className="header-quiz__title">{userInfo.position_name}</div>
                      </div>
                    </>
                }
              </div>
            </div>
        }
      </div>
  )
};
