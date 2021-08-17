import React from 'react';
import ReactDOM from 'react-dom';
import { store } from './store/store';
import { Provider } from 'react-redux';
import App from './App';

import './index.css';

ReactDOM.render(
  <Provider store={store}>
    <>
    <App />
    <footer>
      <div>2021 © Outstaffing</div>
    </footer>
    </>
  </Provider>,
  document.getElementById('root')
);
