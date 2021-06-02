import React, { useState, useEffect, Suspense, lazy } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './fonts/stylesheet.css';

const AuthPage = lazy(() => import('./pages/AuthPage'));
const HomePage = lazy(() => import('./pages/HomePage'));
const CandidatePage = lazy(() => import('./pages/CandidatePage'));

const App = () => {
  const [isAuth, setIsAuth] = useState(true);

  useEffect(() => {
    const auth = localStorage.getItem('auth');
    if (auth === 'true') {
      setIsAuth(true);
    }
  }, []);

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
            <Route>
              <div>Not found page</div>
            </Route>
          </Switch>
        ) : (
          <Route path="/" exact>
            <AuthPage setAuth={setIsAuth} />
          </Route>
        )}
      </Suspense>
    </Router>
  );
};

export default App;
