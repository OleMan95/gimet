import {Wit, log} from 'node-wit';

const CONFIDENCE_NUM = process.env.CONFIDENCE_NUM;
const wit = new Wit({
  accessToken: process.env.WIT_TOKEN,
  logger: new log.Logger(log.DEBUG) // optional
});

const dialogsFlow = {};

export default class DialogFlow{
  constructor(props) {
    console.log(dialogsFlow);
    this.state = {
      id: props.id || '',
      expert: {},
      history:[/*message object from client and server*/],
      lastMessage: '',
      flow: [
        // {
        //   count: 0,
        //   intent: 'some_intent'
        // }
      ],
    };
  }

  dialog = (intent, args)=>{
    dialogsFlow[intent] = args;
    console.log('dialog created: ', dialogsFlow);
  };

  onMessage=async (message, send) => {
    const {entities} = await wit.message(message, {});
    const intent = getIntent(entities) || {};

    let flow = this.state.flow;
    const dialogs = dialogsFlow[intent.value];

    if(flow.length === 0){
      flow.push({
        count: 0,
        intent: intent.value
      });

      dialogs[flow[flow.length-1].count](send);

    }else if(flow[flow.length-1].intent != intent.value){
      flow.push({
        count: 0,
        intent: intent.value
      });

      dialogs[flow[flow.length-1].count](send);
    }else{
      const i = flow.length-1;

      if(++flow[i].count === dialogs.length){
        dialogs[count-1](send);
      }else if(++flow[i].count < dialogs.length){
        dialogs[flow[i].count](send);
      }
    }

    this.state.flow = flow;
    this.state.lastMessage = message;
  };
}

export function initDialog(intent, args){
  dialogsFlow[intent] = args;
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

