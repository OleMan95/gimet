import {NEW_EXPERT, ADD_QUESTION, UPDATE_EXPERT} from '../constants/types.js';


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
        ],
        conditions:[
          {
            pairs:[
              ["key",'val'],
              ["key2","val2"]
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

      console.log('NEW_EXPERT: ',state);
      return state;

    case ADD_QUESTION:
      let id=state[0].experts.length-1;


      // var newState = Object.assign({}, state);
      // newState[0].experts[id].questions.unshift(action.payload);
      //
      // console.log('ADD_QUESTION: ',newState);
      // return newState;

      // return Object.assign(state, {questions:[...state[0].experts[id].questions, action.payload]});
      // return state.map((s, index) => {
      //   if (index === 0) {
      //     return s.experts.map((expert, index) => {
      //       if (index === id) {
      //         return Object.assign({}, expert, {
      //           questions: action.payload
      //         });
      //       }
      //     };
      //   }
      //   return state;
      // });

    case UPDATE_EXPERT:

      return state;
    default:
      return state;
  }
}
