import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import * as firebase from 'firebase';
import {Provider} from 'react-redux';
import configureStore from './store/configureStore.js';
import './index.css';
import './css/App.css';
import './css/Home.css';
import './css/ConfigNewExpert.css';
import './css/Consultation.css';
import './css/SignIn.css';
import './css/materialDesignIcons.css';

//@ts-nocheck
var config = {
    apiKey: "AIzaSyCivktnGFm08scDqJpB_G3vcE43GPCR8DE",
    authDomain: "gimet-project.firebaseapp.com",
    databaseURL: "https://gimet-project.firebaseio.com",
    projectId: "gimet-project",
    storageBucket: "gimet-project.appspot.com",
    messagingSenderId: "109473978707"
  };

firebase.initializeApp(config);

const store = configureStore(); //creating the application store

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
