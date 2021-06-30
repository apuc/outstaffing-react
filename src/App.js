import React, { useState, Suspense, lazy } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './fonts/stylesheet.css';

const AuthPageForDevelopers = lazy(() => import('./pages/AuthPageForDevelopers'));
// const AuthPageForPartners = lazy(() => import('./pages/AuthPageForPartners'));
const HomePage = lazy(() => import('./pages/HomePage'));
const CandidatePage = lazy(() => import('./pages/CandidatePage'));
const CalendarPage = lazy(() => import('./pages/CalendarPage'));
const ReportPage = lazy(() => import('./pages/ReportFormPage.js'));

const App = () => {
  const [isAuth, setIsAuth] = useState(true);
  const [candidates, setCandidates] = useState([]);
  const [candidateForCalendar, setCandidateForCalendar] = useState([]);

  const getCandidate = (candidateArr) => {
    console.log('candidateArr ', candidateArr);
    setCandidates(candidateArr);
  };

  const getCandidateForCalendar = (candidate) => {
    setCandidateForCalendar(candidate);
  };

  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        {isAuth ? (
          <Switch>
            <Route path="/" exact>
              <HomePage getCandidate={getCandidate} />
            </Route>
            <Route path="/candidate/:id">
              <CandidatePage candidatesArr={candidates} getCandidateForCalendar={getCandidateForCalendar} />
            </Route>
            <Route path="/calendar">
              <CalendarPage candidateForCalendar={candidateForCalendar} />
            </Route>
            <Route path="/report">
              <ReportPage />
            </Route>
            <Route>
              <div>Not found page</div>
            </Route>
          </Switch>
        ) : (
          <Route path="/" exact>
            <AuthPageForDevelopers setAuth={setIsAuth} />
            {/* <AuthPageForPartners setAuth={setIsAuth} /> */}
          </Route>
        )}
      </Suspense>
    </Router>
  );
};

export default App;
