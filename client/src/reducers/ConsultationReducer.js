import {SET_CONSULTATION_EXPERT, SET_CONSULTATION_CONTENT} from '../constants/types.js';

const initialState = {
  expert:{},
  content:''
};


export default function reducer(state = initialState, action){
  let newState;
  switch (action.type) {
    // case SET_CONSULTATION_EXPERT:
    //     newState = {
    //       expert:action.payload,
    //       content:''
    //     };
    //     return newState;

    case "SET_CONSULTATION_CONTENT":
        let newState1 = {
          expert:state.expert,
          content:action.payload
        };
        return newState1;

    case 'SET_CONSULTATION_EXPERT1':
        newState = {
            expert: action.payload,
            content: ''
        };
        return newState;

    default:
        return state;

  }
}
