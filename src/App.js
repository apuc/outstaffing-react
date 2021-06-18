import React, { useState, Suspense, lazy } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './fonts/stylesheet.css';

const AuthPageForDevelopers = lazy(() => import('./pages/AuthPageForDevelopers'));
// const AuthPageForPartners = lazy(() => import('./pages/AuthPageForPartners'));
const HomePage = lazy(() => import('./pages/HomePage'));
const CandidatePage = lazy(() => import('./pages/CandidatePage'));
const CalendarPage = lazy(() => import('./pages/CalendarPage'));

const App = () => {
  const [isAuth, setIsAuth] = useState(false);

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
