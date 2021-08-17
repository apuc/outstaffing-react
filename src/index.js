import React from 'react';
import ReactDOM from 'react-dom';
import { store } from './store/store';
import { Provider } from 'react-redux';
import App from './App';
import { Footer } from './components/Footer/Footer';

import './index.css';

ReactDOM.render(
  <Provider store={store}>
    <>
    <App />
    <Footer />
    </>
  </Provider>,
  document.getElementById('root')
);
