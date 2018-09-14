import brain from 'brain.js';
let mlData = require('./mlData.json');
import fs from 'fs';

const pathToKnowledgeBase = '../resources/knlgBase.json';
let net = new brain.recurrent.LSTM();
let mlArray = [];

export default class DialogNN {
  initialize(){
    try {
      if(fs.existsSync(pathToKnowledgeBase)){
        let knlgBase = require(pathToKnowledgeBase);
        net.fromJSON(knlgBase);
      }else {
        learnNN(mlData);
      }
    }catch (e) {
      console.error('Error: ',e);
    }
  };

  addCase({text, intent}){
    mlData.push({text, intent});

    fs.writeFile('./mlData.json', JSON.stringify(mlData), function(err) {
      if (err) console.log(err);
    });
    learnNN(mlData);
  };

  getIntent(string){
    return net.run(string);
  };
}

function learnNN(data){

  for (let i = 0; i < data.length; i++){
    mlArray.push({
      input: data[i].text,
      output: data[i].intent
    });
  }

  net.train(mlArray, {iterations: mlArray.length * 50, log: true});

  let json = net.toJSON();
  fs.writeFile(pathToKnowledgeBase, JSON.stringify(json), function(err) {
    if (err) console.log(err);
  });

  return net;
}