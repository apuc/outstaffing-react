import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectAuth } from './redux/outstaffingSlice';
import 'bootstrap/dist/css/bootstrap.min.css'
import './fonts/stylesheet.css'
import { ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute';

import { YMInitializer } from 'react-yandex-metrika';

import AuthPageForDevelopers from './pages/AuthPageForDevelopers';
import AuthPageForPartners from './pages/AuthPageForPartners';
import HomePage from './pages/HomePage';
import CandidatePage from './pages/CandidatePage';
import CalendarPage from'./pages/CalendarPage';
import ReportPage from './pages/ReportFormPage.js';
import FormPage from './pages/FormPage.js';

const App = (props) => {
  const isAuth = useSelector(selectAuth)
  return (<>
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
          <ProtectedRoute exact path='/candidate/:id' component={CandidatePage} />
          <ProtectedRoute path='/calendar' component={CalendarPage} />
          <ProtectedRoute exact path='/candidate/:id/form' component={FormPage} />
          <ProtectedRoute path='/report' component={ReportPage} />
          <ProtectedRoute component={()=><div>Page not found</div>} />
        </Switch>
    </Router>
    
    {/* <YMInitializer 
      accounts={[84188125]} 
      options={{
        clickmap:true,
        trackLinks:true,
        accurateTrackBounce:true,
        webvisor:true
        }} 
      version="2" 
    /> */}
    </>
  )
}


export default App
