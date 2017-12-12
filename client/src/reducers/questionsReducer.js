import {GET_CONFIG_QUESTIONS} from '../constants/types.js';

const initialState = [];

export default function reducer(state = initialState, action){
  switch (action.type) {
    case GET_CONFIG_QUESTIONS:
      if (action.payload===null) {
        return [];
      }

      return [
        ...state,
        action.payload
      ];
    default:
      return state;
  }
}
