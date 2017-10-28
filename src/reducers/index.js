import {combineReducers} from 'redux';
import expertsReducer from './expertsReducer.js';
import homeBodyHandler from './homeBodyHandler.js';

// combineReducers принимает редюсеры, разделенные комой,
// например, combineReducers({ counter, todos })
export default combineReducers({expertsReducer, homeBodyHandler});
