import {NEW_EXPERT, UPDATE_EXPERT} from '../constants/types.js';


const initialState = {};

// Этот редюсер принимает initialState и action
// Возвращает state. В случае action.type === NEW_EXPERT возвращает новый, дополненый state
export default function reducer(state = initialState, action){
  switch (action.type) {
    case NEW_EXPERT:

      return state;
    case UPDATE_EXPERT:

      return state;
    default:
      return state;
  }
}
