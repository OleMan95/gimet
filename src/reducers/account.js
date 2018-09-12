
let initialState = {
  isAuthorized: false
};

const account = (state = initialState, action) => {
  if(action.type === 'INIT_USER'){
    const newState = action.payload;
    newState.isAuthorized = true;
    return newState;
  }
  if(action.type === 'SET_EXPERT_TO_ACCOUNT'){
    const newState = state;
    newState.experts = action.payload;
    return newState;
  }
  if(action.type === 'CLEAR_STORE'){
    return initialState;
  }
  return state;
};

export default account;