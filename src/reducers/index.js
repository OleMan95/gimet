import {combineReducers} from 'redux';
import accountReducer from './accountReducer.js';
import homeBodyHandler from './homeBodyHandler.js';
import newConfigReducer from './newConfigReducer.js';
import ConsultationReducer from './ConsultationReducer.js';

// combineReducers принимает редюсеры, разделенные комой,
// например, combineReducers({ counter, todos })

export default combineReducers({accountReducer, homeBodyHandler,newConfigReducer,ConsultationReducer});
