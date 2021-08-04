import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './fonts/stylesheet.css'
import { ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute';

const AuthPageForDevelopers = lazy(() =>
  import('./pages/AuthPageForDevelopers')
)
const AuthPageForPartners = lazy(() => import('./pages/AuthPageForPartners'))
const HomePage = lazy(() => import('./pages/HomePage'))
const CandidatePage = lazy(() => import('./pages/CandidatePage'))
const CalendarPage = lazy(() => import('./pages/CalendarPage'))
const ReportPage = lazy(() => import('./pages/ReportFormPage.js'))
const FormPage = lazy(() => import('./pages/FormPage.js'))

const App = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route path='/auth' exact>
            {/* <AuthPageForPartners /> */}
            <AuthPageForDevelopers />
          </Route>
          <ProtectedRoute path='/' exact component={HomePage} />
          <ProtectedRoute path='/candidate/:id' component={CandidatePage} />
          <ProtectedRoute path='/calendar' component={CalendarPage} />
          <ProtectedRoute path='/form' component={FormPage} />
          <ProtectedRoute path='/report' component={ReportPage} />
          <Route>
            <div>Page not found</div>
          </Route>
        </Switch>
      </Suspense>
    </Router>
  )
}

export default App
