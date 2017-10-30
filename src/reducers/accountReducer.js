import {NEW_EXPERT, ADD_QUESTION} from '../constants/types.js';

const initialState = [
  {
    username:'John Smith',
    email:'aom-95@live.com',
    password:'qwerty',
    experts:[
      {
        name:'Medicine expert',
        description: 'This is a medicine expert and he will helps you solve your health problem!',
        questions:[
          {
            key:'q1',
            question:'question 1',
            answer:'value 1, value 2',
          },
          {
            key:'q2',
            question:'question 2',
            answer:'value 1, value 2',
          }
        ]
      },
      {
        name:'Notebook expert',
        description: 'This expert will helps you choose a notebook!',
        questions:[
          {
            key:'q1',
            question:'question 1',
            answer:'value 1, value 2',
          }
        ]
      },
    ]
  }
];

// Этот редюсер принимает initialState и action
// Возвращает state. В случае action.type === ADD_TO_STORE возвращает новый, дополненый state
export default function reducer(state = initialState, action){
  switch (action.type) {
    case NEW_EXPERT:
      let experts = [
        ...state[0].experts,
        action.payload
      ];

      state[0].experts = experts;

      return state;

    case ADD_QUESTION:
      let id=state[0].experts.length-1;

      let arr = state[0].experts[id].questions;
      let question = [
        ...arr,
        action.payload
      ];


      state[0].experts[id].questions = question;


      console.log('expert after:',state[0].experts[id]);
      return state;
    default:
      return state;
  }
}
