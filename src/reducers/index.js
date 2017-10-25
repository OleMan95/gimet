import {combineReducers} from 'redux';
import mainReducer from './mainReducer.js';

// combineReducers принимает редюсеры, разделенные комой,
// например, combineReducers({ counter, todos })
export default combineReducers({mainReducer});
