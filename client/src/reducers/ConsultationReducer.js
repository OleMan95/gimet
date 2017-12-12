import {SET_CONSULTATON_EXPERT, SET_CONSULTATON_CONTENT} from '../constants/types.js';

const initialState = {
  expert:{},
  content:''
};


export default function reducer(state = initialState, action){
  let newState;
  switch (action.type) {
    case SET_CONSULTATON_EXPERT:
      newState = {
        expert:action.payload,
        content:''
      };
      return newState;
    
    case SET_CONSULTATON_CONTENT:
      newState = {
        expert: state.expert,
        content: action.payload
      };
      return newState;
    
    default:
      return state;

  }
}
