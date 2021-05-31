import React, { useState, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './fonts/stylesheet.css';

const AuthPage = lazy(() => import('./pages/AuthPage'));
const HomePage = lazy(() => import('./pages/HomePage'));
const CandidatePage = lazy(() => import('./pages/CandidatePage'));

const App = () => {
  const [isAuth, setIsAuth] = useState(false);

  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        {isAuth ? (
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/candidate/:id" component={CandidatePage} />
            <Route component={<div>Not found page</div>} />
          </Switch>
        ) : (
          <Route path="/" exact component={(props) => <AuthPage {...props} setAuth={setIsAuth} />} />
        )}
      </Suspense>
    </Router>
  );
};

export default App;
