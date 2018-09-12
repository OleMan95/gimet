import React from "react";
import {hydrate} from "react-dom";
import {BrowserRouter} from "react-router-dom";
import App from "../components/App";
import { Provider } from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import rootReducer from '../reducers';

const preloadedState = window.__PRELOADED_STATE__;
delete window.__PRELOADED_STATE__;

let script = document.querySelector('script#state');
script.parentNode.removeChild(script);

const store = createStore(rootReducer, preloadedState);

console.log(store.getState());

store.subscribe(() =>
  console.log('==> STORE: ',store.getState())
);

hydrate(
  <Provider store={store}>
		<BrowserRouter>
				<App/>
		</BrowserRouter>
  </Provider>
  , document.getElementById('root'));
