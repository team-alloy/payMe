/* jshint esversion: 6 */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware , compose } from 'redux';
import ReduxPromise from 'redux-promise';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import root from './store/root';
import App from './components/App';

const middleware = applyMiddleware(ReduxPromise, thunk);

const store = createStore(root, compose(middleware, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));

ReactDOM.render(
  (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  ), document.getElementById('root'),
);
