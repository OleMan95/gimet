import {combineReducers} from 'redux';
import expertsReducer from './expertsReducer.js';

// combineReducers принимает редюсеры, разделенные комой,
// например, combineReducers({ counter, todos })
export default combineReducers({expertsReducer});
