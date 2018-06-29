import {Wit, log} from 'node-wit';
import Expert from '../models/expert';

const CONFIDENCE_NUM = process.env.CONFIDENCE_NUM;

const wit = new Wit({
	accessToken: process.env.WIT_TOKEN,
	logger: new log.Logger(log.DEBUG) // optional
});

const state = {
	expert: {},
	history:[/*message object from client and server*/],
};

export default class Dialog{
	constructor(id) {
		state.id = id;
	}

	handleMessage = ({message}, sendMessage)=>{
		wit.message(message, {})
			.then(({entities}) => {
				handleDialog(entities, sendMessage);
			})
			.catch(console.error);
	};


}

const vocabulary = {
  find_expert: ['With which expert do you want to talk?', 'What specialist are you looking for?',
		'What kind of problem do you have?', 'Describe your problem.'],
  scope: ['I can help you with: Interpretation, Prediction, Diagnosis, Design, Monitoring, ' +
    'Planning, Debugging, Repair, Instruction, Control.',
    'Describe your problem and I\'ll try to give you recommendations on how to solve it.',
    'I am a chat-bot, what can use all expert systems in the platform Gimet to solve your problem.',
    'Write "Find a computer expert" and you will see what i can.'],
  expert_object: ['Sorry, I can\'t find an expert in this field. Be the first - create such expert.']
};

function handleDialog(entities, sendMessage){
	const intent = firstEntity(entities, 'intent');
	if (!intent) {
		sendMessage({
			message: 'Try something else. I got no intent :)',
			isClient: false
		});
		return;
	}

	switch (intent.value) {
		case 'find_expert':
			findExpertDialog(entities, sendMessage);
			break;
		case 'bot_scope':
			console.log('bot_scope');
			break;
		default:
			console.log(`${intent.value}`);
			break;
	}
}

async function findExpertDialog(entities, sendMessage) {
	const expertObject = firstEntity(entities, 'expert_object') || {};

	if (expertObject.confidence > CONFIDENCE_NUM) {

		const filter = {name: new RegExp(expertObject.value, 'ig')};
		const experts = await Expert.find(filter);

		console.log('==> expert: ', experts);
		if(experts.length>0){
			let names = [];

			experts.forEach(expert=>{
				names.push(expert.name);
			});

			names = names.join();

			sendMessage({
				message: `Here is what i've found: ${names}`,
				isClient: false
			});

		}else{
			sendMessage({
				message: `Sorry, I can\'t find ${expertObject.value} expert. Be the first - create such expert.`,
				isClient: false
			});
		}

		return;
	}

	const index = Math.floor(Math.random() * vocabulary.find_expert.length);
	sendMessage({
		message: vocabulary.find_expert[index],
		isClient: false
	});
}

function firstEntity(entities, name) {
	return entities &&
		entities[name] &&
		Array.isArray(entities[name]) &&
		entities[name] &&
		entities[name][0];
}
