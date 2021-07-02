import React, { Suspense, lazy } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import './fonts/stylesheet.css';
import { selectAuth } from './redux/outstaffingSlice';

const AuthPageForDevelopers = lazy(() => import('./pages/AuthPageForDevelopers'));
// const AuthPageForPartners = lazy(() => import('./pages/AuthPageForPartners'));
const HomePage = lazy(() => import('./pages/HomePage'));
const CandidatePage = lazy(() => import('./pages/CandidatePage'));
const CalendarPage = lazy(() => import('./pages/CalendarPage'));
const ReportPage = lazy(() => import('./pages/ReportFormPage.js'));

const App = () => {
  const isAuth = useSelector(selectAuth);
  // const [candidateForCalendar, setCandidateForCalendar] = useState([]);

  // const getCandidateForCalendar = (candidate) => {
  //   console.log('candidate ', candidate);
  //   setCandidateForCalendar(candidate);
  // };

  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        {isAuth ? (
          <Switch>
            <Route path="/" exact>
              <HomePage />
            </Route>
            <Route path="/candidate/:id">
              <CandidatePage />
            </Route>
            <Route path="/calendar">
              <CalendarPage />
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
            {/* <AuthPageForPartners /> */}
            <AuthPageForDevelopers />
          </Route>
        )}
      </Suspense>
    </Router>
  );
};

export default App;
