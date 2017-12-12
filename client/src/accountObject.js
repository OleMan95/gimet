var accountObject = {
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
            answersString:'value 1, value 2',
            answers:['value 1' , 'value 2'],
          },
          {
            key:'q2',
            question:'question 2',
            answersString:'value 1, value 2',
            answers:['value 1' , 'value 2'],
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
      }
    ]
  }