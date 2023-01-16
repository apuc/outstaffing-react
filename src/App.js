import React from 'react'
import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';


import AuthForPartners from "./pages/AuthForPartners/AuthForPartners";
import AuthForDevelopers from "./pages/AuthForDevelopers/AuthForDevelopers";
import HomePage from './pages/HomePage'
import CandidatePage from './pages/CandidatePage'
import CalendarPage from './pages/CalendarPage'
import ReportPage from './pages/ReportFormPage.js'
import ProfileCalendarPage from './pages/ProfileCalendarPage.js'
import FormPage from './pages/FormPage.js'
import SingleReportPage from './pages/SingleReportPage'
import {QuizPage} from './pages/quiz/QuizPage'
import {InterjacentPage} from './pages/quiz/InterjacentPage'
import {QuizTestPage} from './pages/quiz/QuizTestPage'
import {InstructionPage} from './pages/quiz/InstructionPage'
import {ResultPage} from './pages/quiz/ResultPage'
import {Profile} from './pages/Profile/Profile.js'
import {Summary} from './pages/Summary/Summary'

import './fonts/stylesheet.css'
import 'bootstrap/dist/css/bootstrap.min.css'


const App = () => {
  return (
      <>
        <h1>IT Аутстаффинг в России</h1>
        <Router>

          <Routes>
            <Route exact path='/' element={<HomePage/>}/>

            <Route exact path='/authdev' element={<AuthForDevelopers/>}/>
            <Route exact path='/auth' element={<AuthForPartners/>}/>

            <Route exact path='/candidate/:id' element={<CandidatePage/>}/>
            <Route exact path='/candidate/:id/form' element={<FormPage/>}/>
            <Route path='/:userId/calendar' element={<CalendarPage/>}/>

            <Route exact path='/report' element={<ReportPage/>}/>
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
              <Route exact path='calendar' element={<ProfileCalendarPage/>}/>
              <Route exact path='summary' element={<Summary/>}/>
            </Route>

            <Route path="*" element={<Navigate to="/" replace/>}/>
          </Routes>
        </Router>
      </>
  )
};

export default App
