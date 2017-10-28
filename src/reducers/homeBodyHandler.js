import {NEW_EXPERT, GET_HOME_BODY} from '../constants/types.js';

const initialState = [];

// Этот редюсер принимает initialState и action
// Возвращает state. В случае action.type === ADD_TO_STORE возвращает новый, дополненый state
export default function reducer(state = initialState, action){
  console.log(action);

  switch (action.type) {
    case GET_HOME_BODY:
    console.log(state.payload);
      if (state.payload === null) return [];
      
      state=initialState;

      return [
        ...state,
        action.payload
      ];
      break;
    default:
      return state;

  }
}
