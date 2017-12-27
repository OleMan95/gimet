import {SET_CONSULTATION_EXPERT, SET_CONSULTATION_CONTENT} from '../constants/types.js';

const initialState = {
  expert:{},
  content:''
};


export default function reducer(state = initialState, action){
  let newState;
  switch (action.type) {
    case SET_CONSULTATION_EXPERT:
      newState = {
        expert:action.payload,
        content:''
      };
      return newState;
    
    case SET_CONSULTATION_CONTENT:
      newState = {
        expert: state.expert,
        content: action.payload
      };
      return newState;
    
    default:
      return state;

  }
}
