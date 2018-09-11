let initialState = {
  isAuthorized: false
};

const todoList = (state = initialState, action) => {
  if(action.type === 'INIT_USER'){
    const newState = action.payload;
    newState.isAuthorized = true;
    return newState;
  }
  if(action.type === 'CLEAR_STORE'){
    return initialState;
  }
  return state;
};

export default todoList;