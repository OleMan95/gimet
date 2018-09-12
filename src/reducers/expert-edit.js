let initialState = [];

const expertEdit = (state = initialState, action) => {
  if(action.type === 'EDIT_EXPERT'){
    return [...state, action.payload];
  }
  if(action.type === 'CLEAR_STORE'){
    return initialState;
  }
  return state;
};

export default expertEdit;