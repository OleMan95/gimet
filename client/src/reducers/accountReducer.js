import {NEW_EXPERT, UPDATE_EXPERT} from '../constants/types.js';


// {
//     token: "eyJhbGciOiJIUzI1NiJ9.ZXhhbXBsZUBlbWFpbC5jb20.LsOtkPXqPJxs92hQvmNC3Mf33UHNjTPxI9YUaAdb07g",
//     user: {
//         _id: "5a52a11f41f5721c61d309fe",
//         updatedAt: "2018-01-07T22:37:19.572Z",
//         createdAt: "2018-01-07T22:37:19.572Z",
//         name: "john doe",
//         email: "example@email.com",
//         experts: []
//     }
// }
const initialState = {};

// Этот редюсер принимает initialState и action
// Возвращает state. В случае action.type === NEW_EXPERT возвращает новый, дополненый state
export default function reducer(state = initialState, action){
  switch (action.type) {
    case 'SET_USER':
      let newState = action.payload;

      return newState;
    case UPDATE_EXPERT:

      return state;
    default:
      return state;
  }
}
