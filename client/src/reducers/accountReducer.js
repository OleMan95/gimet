import {NEW_EXPERT, UPDATE_EXPERT} from '../constants/types.js';


const initialState = {
    token: "eyJhbGciOiJIUzI1NiJ9.ZXhhbXBsZUBlbWFpbC5jb20.LsOtkPXqPJxs92hQvmNC3Mf33UHNjTPxI9YUaAdb07g",
    user: {
        _id: "5a52a11f41f5721c61d309fe",
        updatedAt: "2018-01-07T22:37:19.572Z",
        createdAt: "2018-01-07T22:37:19.572Z",
        name: "john doe",
        email: "example@email.com",
        experts: []
    }
};

// Этот редюсер принимает initialState и action
// Возвращает state. В случае action.type === NEW_EXPERT возвращает новый, дополненый state
export default function reducer(state = initialState, action){
  switch (action.type) {
    case NEW_EXPERT:
      let newState = action.payload;

      return newState;
    case UPDATE_EXPERT:

      return state;
    default:
      return state;
  }
}
