import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux';
import configureStore from './store/configureStore.js';

import App from './App';
import './index.css';

const initialState = [
  'Test 1',
  'Test 2'
];

const store = configureStore(); //creating the application store

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('root'));
registerServiceWorker();
