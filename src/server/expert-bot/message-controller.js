import Expert from '../models/expert';
import {initDialog} from "./dialog-handler";

const replies = {
  find_expert: ['With which expert do you want to talk?', 'What specialist are you looking for?',
		'What kind of problem do you have?', 'Describe your problem.'],
  scope: ['I can help you with: Interpretation, Prediction, Diagnosis, Design, Monitoring, ' +
    'Planning, Debugging, Repair, Instruction, Control.',
    'Describe your problem and I\'ll try to give you recommendations on how to solve it.',
    'I am a chat-bot, what can use all expert systems in the platform Gimet to solve your problem.',
    'Write "Find a computer expert" and you will see what i can.'],
  expert_object: ['Sorry, I can\'t find an expert in this field. Be the first - create such expert.']
};

initDialog('find_expert', [
  (send)=>{
    send(getRandomReply('find_expert'));
  },
  (send)=>{
    send('Sorry, I did not found an expert name.');
    send(getRandomReply('find_expert'));
  }
]);

function getRandomReply(intent) {
  return replies[intent][Math.floor((Math.random() * replies[intent].length-1) + 1)];
}
function firstEntity(entities, name) {
  return entities &&
    entities[name] &&
    Array.isArray(entities[name]) &&
    entities[name] &&
    entities[name][0];
}

