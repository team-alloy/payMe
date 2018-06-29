/* jshint esversion: 6 */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware , compose } from 'redux';
import { Provider } from 'react-redux';
import { thunk } from 'redux-thunk';
import root from './store/root';

import App from './components/App.jsx';

const store = createStore(root, window.devToolsExtension ? window.devToolsExtension() : f => f);

ReactDOM.render(
  (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  ), document.getElementById('root'),
);
