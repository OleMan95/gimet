import {GET_CONFIG_BODY} from '../constants/types.js';

const initialState = [];


// Этот редюсер принимает initialState и action
// Возвращает state. В случае action.type === ADD_TO_STORE возвращает новый, дополненый state
export default function reducer(state = initialState, action){

  switch (action.type) {
    case GET_CONFIG_BODY:
      if (state.payload === null) return [];

      state=initialState;
      return [
        ...state,
        action.payload
      ];
    default:
      return state;

  }
}
