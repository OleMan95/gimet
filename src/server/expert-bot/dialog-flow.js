import {Wit, log} from 'node-wit';

const CONFIDENCE_NUM = process.env.CONFIDENCE_NUM;
const wit = new Wit({
  accessToken: process.env.WIT_TOKEN,
  logger: new log.Logger(log.DEBUG) // optional
});

const dialogStore = {};

export default class DialogFlow{
  constructor(props) {
    this.state = {
      id: props.id || '',
      expert: {},
      history:[/*intents from client and server*/],
      lastMessage: '',
      flow: [
        // {
        //   count: 0,
        //   intent: 'some_intent'
        // }
      ],
    };
  }

  onMessage=async (message, send) => {
    const {entities} = await wit.message(message, {});
    const intent = getIntent(entities);

		console.log('entities: ',entities);

    if(!intent){
      send('Sorry, I did not understand you.');
      return;
    }

		let flow = this.state.flow;
    const dialog = dialogStore[intent.value];
		const lastItem = flow.length-1;


    if(flow.length === 0){
			/** If flow is empty */
			flow.push({
        count: 0,
        intent: intent.value
      });

      dialog[flow[0].count](send, entities, nextReply, closeDialog);

    }else if(flow[lastItem].intent != intent.value){
      /** If the intent is not equal to the last intent in the flow */
			flow.push({
				count: 0,
				intent: intent.value
			});

      dialog[flow[flow.length-1].count](send, entities, nextReply, closeDialog);

    }else if(flow[lastItem].count+1 < dialog.length){
			/** Continue the last dialog in the flow */
			dialog[flow[lastItem].count](send, entities, nextReply, closeDialog);

    }else if(flow[lastItem].count+1 === dialog.length){
			/** If it is the last reply. Count must be lower than number of replies in the dialog. */
			dialog[flow[lastItem].count](send, entities, ()=>{}, closeDialog);
    }

    function nextReply() {
      flow[flow.length-1].count = flow[flow.length-1].count+1;
    }
    function closeDialog(nextIntent) {
      flow.splice(flow.length-1, 1);
      if(nextIntent){
        flow.push({
          count: 0,
          intent: nextIntent
        });
      }
    }

    this.state.flow = flow;
    this.state.lastMessage = message;
    console.log('\n==> flow: ',this.state.flow);
  };

}

export function initDialog(intent, args){
  dialogStore[intent] = args;
  console.log('dialog created: ', intent);
}

function getIntent(entities) {
  const intent = entities.intent || [];

  for(let i=0; i<intent.length; i++){
    if(intent && intent[i].confidence>CONFIDENCE_NUM){
      return intent[i]
    }
  }
}

