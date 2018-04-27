import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux';
import configureStore from './store/configureStore.js';
import './index.css';
import './css/App.css';
import './css/Home.css';
import './css/Edit.css';
import './css/ConfigNewExpert.css';
import './css/Consultation.css';
import './css/SignIn.css';
import './css/materialDesignIcons.css';

const store = configureStore(); //creating the application store

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
