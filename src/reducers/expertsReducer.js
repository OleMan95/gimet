import {NEW_EXPERT} from '../constants/types.js';

const initialState = [];

// Этот редюсер принимает initialState и action
// Возвращает state. В случае action.type === ADD_TO_STORE возвращает новый, дополненый state
export default function reducer(state = initialState, action){
  console.log(action);

  switch (action.type) {
    case NEW_EXPERT:
      return [
        ...state,
        action.payload
      ];
    default:
      return state;

  }
}
