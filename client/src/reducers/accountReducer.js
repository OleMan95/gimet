import {NEW_EXPERT, UPDATE_EXPERT} from '../constants/types.js';


const initialState = [
  {
    username:'John Doe',
    email:'john_doe@example.com',
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
        ],
        conditions:[
          {
            pairs:[
              {
                key:'key',
                answer:'val'
              },
              {
                key:'key2',
                answer:'val2'
              }
            ],
            result:'res'
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

      console.log('NEW_EXPERT: ', state);
      return state;

    case UPDATE_EXPERT:

      return state;
    default:
      return state;
  }
}
