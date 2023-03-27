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
import {Tracker} from './pages/Tracker/Tracker'
import {Payouts} from './pages/Payouts/Payouts'
import { PartnerSettings } from "./pages/PartnerSettings/PartnerSettings"
import {PartnerRequests} from './pages/PartnerRequests/PartnerRequests'
import {PartnerAddRequest} from './pages/PartnerAddRequest/PartnerAddRequest'
import {PartnerBid} from './pages/PartnerBid/PartnerBid'
import {PartnerCategories} from "./pages/PartnerСategories/PartnerСategories";
import {PartnerTreaties} from "./pages/PartnerTreaties/PartnerTreaties";
import {PartnerEmployees} from "./pages/PartnerEmployees/PartnerEmployees";

import './fonts/stylesheet.css'
import 'bootstrap/dist/css/bootstrap.min.css'




const App = () => {
  return (
      <>
        <Router>

          <Routes>

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
              <Route exact path='catalog' element={<Home/>}/>
              <Route exact path='calendar' element={<ProfileCalendar/>}/>
              <Route exact path='summary' element={<Summary/>}/>
              <Route exact path='view' element={<ViewReport/>}/>
              <Route exact path='tracker' element={<Tracker/>}/>
              <Route exact path='payouts' element={<Payouts/>}/>
              <Route exact path='settings' element={<PartnerSettings/>}/>
              <Route exact path='requests' element={<PartnerRequests/>}/>
              <Route exact path='add-request' element={<PartnerAddRequest/>}/>
              <Route exact path='bid' element={<PartnerBid/>}/>
              <Route exact path='categories' element={<PartnerCategories/>}/>
              <Route exact path='treaties' element={<PartnerTreaties/>}/>
              <Route exact path='categories/employees' element={<PartnerEmployees/>}/>
            </Route>

            <Route path="*" element={<Navigate to="/profile" replace/>}/>
          </Routes>
        </Router>
      </>
  )
};

export default App
