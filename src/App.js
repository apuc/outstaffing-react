import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './fonts/stylesheet.css'

import { ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute'

import AuthPageForDevelopers from './pages/AuthPageForDevelopers'
import AuthPageForPartners from './pages/AuthPageForPartners'
import HomePage from './pages/HomePage'
import CandidatePage from './pages/CandidatePage'
import CalendarPage from './pages/CalendarPage'
import ReportPage from './pages/ReportFormPage.js'
import ProfileCalendarPage from './pages/ProfileCalendarPage.js'
import FormPage from './pages/FormPage.js'
import SingleReportPage from './pages/SingleReportPage'
import { QuizPage } from './pages/quiz/QuizPage'
import { InterjacentPage } from './pages/quiz/InterjacentPage'
import { QuizTestPage } from './pages/quiz/QuizTestPage'
import { InstructionPage } from './pages/quiz/InstructionPage'
import { ResultPage } from './pages/quiz/ResultPage'
import { Profile } from './pages/Profile.js'

const App = () => {
  return (
    <>
      <h1>IT Аутстаффинг в России</h1>
      <Router>
        <Switch>
          <Route path='/authdev' exact>
            <AuthPageForDevelopers />
          </Route>
          <Route path='/auth' exact>
            <AuthPageForPartners />
          </Route>
          <ProtectedRoute exact path='/' component={HomePage} />
          <ProtectedRoute
            exact
            path='/candidate/:id'
            component={CandidatePage}
          />
          <ProtectedRoute path='/:userId/calendar' component={CalendarPage} />
          <ProtectedRoute
            exact
            path='/candidate/:id/form'
            component={FormPage}
          />
          <ProtectedRoute exact path='/report' component={ReportPage} />
          <ProtectedRoute path='/report/:id' component={SingleReportPage} />
          <ProtectedRoute path='/ProfileCalendar' component={ProfileCalendarPage} />
          <ProtectedRoute path='/quiz' component={QuizPage} />
          <ProtectedRoute
            path='/quiz-interjacent'
            component={InterjacentPage}
          />
          <ProtectedRoute path='/quiz-test' component={QuizTestPage} />
          <ProtectedRoute
            path='/quiz-instruction'
            component={InstructionPage}
          />
          <ProtectedRoute path='/profile' component={Profile} />
          <ProtectedRoute path='/quiz-result' component={ResultPage} />
          <ProtectedRoute component={() => <div>Page not found</div>} />
        </Switch>
      </Router>
    </>
  )
}

export default App
