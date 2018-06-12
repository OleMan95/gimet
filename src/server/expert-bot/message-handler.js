import {Wit, log} from 'node-wit';
const CONFIDENCE_NUM = process.env.CONFIDENCE_NUM;

const wit = new Wit({
	accessToken: process.env.WIT_TOKEN,
	logger: new log.Logger(log.DEBUG) // optional
});

export function handleMessage({message, id}, sendMessage){

		wit.message(message, {})
			.then((res) => {
				recognitionHelper(res, id, sendMessage);
			})
			.catch(console.error);

}

const state = {
  find_expert: ['With which expert do you want to talk?', 'What specialist are you looking for?',
		'What kind of problem do you have?', 'Describe your problem.'],
  scope: ['I can help you with: Interpretation, Prediction, Diagnosis, Design, Monitoring, ' +
    'Planning, Debugging, Repair, Instruction, Control.',
    'Describe your problem and I\'ll try to give you recommendations on how to solve it.',
    'I am a chat-bot, what can use all expert systems in the platform Gimet to solve your problem.',
    'Write "Find a computer expert" and you will see what i can.'],
  expert_object: ['Sorry, I can\'t find an expert in this field. Be the first - create such expert.']
};

function recognitionHelper(res, id, sendMessage){


	if(res.entities.find_expert && res.entities.find_expert[0].confidence>CONFIDENCE_NUM){
    console.log(res.entities.expert_object);
    if(res.entities.expert_object && res.entities.expert_object[0].confidence>CONFIDENCE_NUM) {
      sendMessage(id, {
        message: `Sorry, I can\'t find ${res.entities.expert_object[0].value} expert. Be the first - create such expert.`,
        isClient: false
      });
      return;
    }

    const index = Math.floor(Math.random() * state.find_expert.length);
    sendMessage(id, {
      message: state.find_expert[index],
      isClient: false
    });
	}else if(res.entities.scope && res.entities.scope[0].confidence>CONFIDENCE_NUM){
    const index = Math.floor(Math.random() * state.scope.length);

    sendMessage(id, {
      message: state.scope[index],
      isClient: false
    });
	}else{
    if(res.entities.expert_object && res.entities.expert_object[0].confidence>CONFIDENCE_NUM) {
      sendMessage(id, {
        message: `Sorry, I can\'t find ${res.entities.expert_object[0].value} expert. Be the first - create such expert.`,
        isClient: false
      });
      return;
    }
    sendMessage(id, {
      message: 'Can you repeat please?',
      isClient: false
    });
  }

}


