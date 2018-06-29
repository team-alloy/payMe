/* jshint esversion: 6 */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware , compose } from 'redux';
import ReduxPromise from 'redux-promise';
import { Provider } from 'react-redux';
import { thunk } from 'redux-thunk';
import root from './store/root';

import App from './components/App.jsx';
const middleware = applyMiddleware(ReduxPromise)(createStore);
// const store = createStore(root, middleware, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
  (
    <Provider store={middleware(root)}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  ), document.getElementById('root'),
);
