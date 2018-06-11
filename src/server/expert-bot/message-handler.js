import {Wit, log} from 'node-wit';

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
	help: ['With which expert do you want to talk?',
	'What specialist are you looking for?']
};

function recognitionHelper(res, id, sendMessage){


	if(res.entities.hasOwnProperty('find_expert')){
		const index = Math.floor(Math.random() * state.help.length);

			sendMessage(id, {
				message: state.help[index],
				isClient: false
			});
	}

}


