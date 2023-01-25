import React from 'react'
import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';


import AuthForPartners from "./pages/AuthForPartners/AuthForPartners";
import AuthForDevelopers from "./pages/AuthForDevelopers/AuthForDevelopers";
import Home from "./pages/Home/Home";
import Candidate from "./components/Candidate/Candidate";
import Calendar from "./components/Calendar/Calendar";
import ReportForm from "./components/ReportForm/ReportForm";
import {ProfileCalendar} from "./components/ProfileCalendar/ProfileCalendar";
import FormPage from './pages/FormPage/FormPage.js'
import SingleReportPage from './pages/SingleReportPage/SingleReportPage'
import {QuizPage} from './pages/quiz/QuizPage'
import {InterjacentPage} from './pages/quiz/InterjacentPage'
import {QuizTestPage} from './pages/quiz/QuizTestPage'
import {InstructionPage} from './pages/quiz/InstructionPage'
import {ResultPage} from './pages/quiz/ResultPage'
import {Profile} from './pages/Profile/Profile.js'
import {Summary} from './pages/Summary/Summary'
import {ViewReport} from './pages/ViewReport/ViewReport'

import './fonts/stylesheet.css'
import 'bootstrap/dist/css/bootstrap.min.css'




const App = () => {
  return (
      <>
        <Router>

          <Routes>

            <Route exact path='/' element={<Home/>}/>

            <Route exact path='/authdev' element={<AuthForDevelopers/>}/>
            <Route exact path='/auth' element={<AuthForPartners/>}/>

            <Route exact path='/candidate/:id' element={<Candidate/>}/>
            <Route exact path='/candidate/:id/form' element={<FormPage/>}/>
            <Route path='/:userId/calendar' element={<Calendar/>}/>

            <Route exact path='/report' element={<ReportForm/>}/>
            <Route path='/report/:id' element={<SingleReportPage/>}/>

            <Route exact path='quiz'>
              <Route index element={<QuizPage/>}/>
              <Route exact path='interjacent' element={<InterjacentPage/>}/>
              <Route exact path='test' element={<QuizTestPage/>}/>
              <Route exact path='instruction' element={<InstructionPage/>}/>
              <Route exact path='result' element={<ResultPage/>}/>
            </Route>

            <Route exact path='profile'>
              <Route index element={<Profile/>}/>
              <Route exact path='calendar' element={<ProfileCalendar/>}/>
              <Route exact path='summary' element={<Summary/>}/>
              <Route exact path='view' element={<ViewReport/>}/>
            </Route>

            <Route path="*" element={<Navigate to="/" replace/>}/>
          </Routes>
        </Router>
      </>
  )
};

export default App
