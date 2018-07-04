import {Wit, log} from 'node-wit';

const CONFIDENCE_NUM = process.env.CONFIDENCE_NUM;
const wit = new Wit({
  accessToken: process.env.WIT_TOKEN,
  logger: new log.Logger(log.DEBUG) // optional
});

const dialogList = {};

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
    const intent = getIntent(entities) || {};

		console.log('entities: ',entities);

		let flow = this.state.flow;
    const dialogs = dialogList[intent.value];

		const lastItem = flow.length-1;


    if(flow.length === 0){
			/** if flow is empty */
			flow.push({
        count: 0,
        intent: intent.value
      });

      dialogs[flow[0].count](send, entities);

    }else if(flow[lastItem].intent != intent.value){
      /** if the intent is not equal to the last intent in the flow */
			flow.push({
				count: 0,
				intent: intent.value
			});

			dialogs[flow[lastItem].count](send, entities);

    }else if(flow[lastItem].count+1 < dialogs.length){
			/** continue the last dialog */
			flow[lastItem].count = flow[lastItem].count+1;
			dialogs[flow[lastItem].count](send, entities);

    }else if(flow[lastItem].count+1 === dialogs.length){
			/** finish the last dialog */
			dialogs[flow[lastItem].count](send, entities);
    }

    this.state.flow = flow;
    this.state.lastMessage = message;
  };
}

export function initDialog(intent, args){
  dialogList[intent] = args;
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

