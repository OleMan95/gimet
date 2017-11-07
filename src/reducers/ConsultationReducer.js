import {SET_CONSULTATON_EXPERT} from '../constants/types.js';

const initialState = {};

// Этот редюсер принимает initialState и action
// Возвращает state. В случае action.type === ADD_TO_STORE возвращает новый, дополненый state
export default function reducer(state = initialState, action){

  switch (action.type) {
    case SET_CONSULTATON_EXPERT:
      
      return action.payload;
      
    default:
      return state;

  }
}
