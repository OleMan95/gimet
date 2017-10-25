import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {createStore} from 'redux';

function reducer(state =[]) {
  return state;
} //reducer

const store = createStore(reducer); //create application store

console.log(store.getState());

store.subscribe(()=>{ //subscribe on store changing and put it in log
  console.log(),
  store.getState();
});

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
