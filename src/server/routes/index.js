import express from "express";
import React from "react";
import {renderToString} from "react-dom/server";
import template from "../template";
import App from "../../components/App";
import {StaticRouter} from 'react-router-dom';
import { createStore } from 'redux';
import rootReducer from "../../reducers";
import { Provider } from 'react-redux';
import jwtService from "../services/jwt-service";
import User from "../models/user";

const router = express.Router();

const store = createStore(rootReducer);

router.get('*', async (req, res, next) => {
  let context = {};
  const body = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url} context={context}>
        <App/>
      </StaticRouter>
    </Provider>
  );

  store.dispatch({type: 'CLEAR_STORE'});

  if(req.cookies.at){
    console.log('req.cookies.at',req.cookies.at);
    const {_id} = await jwtService.verify(req.cookies.at);
    const user = await User.findById(_id).select({password:0, __v: 0}).populate('experts');
    store.dispatch({type: 'INIT_USER', payload: user});
  }

  res.cookie('aat', 'true').send(template({
    body: body,
    title: 'GIMET',
    preloadedState: store.getState()
  }));
  next();
});

export default router;

