import brain from 'brain.js';
import fs from 'fs';

let intentNet = new brain.NeuralNetwork();
let entityNet = new brain.NeuralNetwork();

export default class DialogNN {
  constructor(name, mlData, pathToKnlgBase){
    this.mlData = mlData || require('./mlData.json');
    this.intentKnlgBase = pathToKnlgBase + 'knlgBase-01.json' || '../resources/knlgBase-01.json';
    this.entityKnlgBase = pathToKnlgBase + 'knlgBase-02.json' || '../resources/knlgBase-02.json';

    if(fs.existsSync(this.intentKnlgBase) && fs.existsSync(this.entityKnlgBase)){
      let knlgBase1 = require(this.intentKnlgBase),
        knlgBase2 = require(this.entityKnlgBase);
      intentNet.fromJSON(knlgBase1);
      entityNet.fromJSON(knlgBase2);
    }else {
      learn(this.mlData, {
        intentKnlgBase: this.intentKnlgBase,
        entityKnlgBase: this.entityKnlgBase
      });
    }
  }

  addCase({text, intent, entity}){
    this.mlData.push({text, intent, entity});

    fs.writeFile('./mlData.json', JSON.stringify(this.mlData), function(err) {
      if (err) console.log(err);
    });
    learn(this.mlData, {
      intentKnlgBase: this.intentKnlgBase,
      entityKnlgBase: this.entityKnlgBase
    });
  };

  run(string){
    return {
      intent: intentNet.run(encodeBin(string)),
      entities: entityNet.run(encodeBin(string))
    };
  };
}

function learn(data, path){
  let intentML = [];
  let entityML = [];

  for (let i = 0; i < data.length; i++){
    let output = {};
    output[data[i].intent] = 1;

    intentML.push({
      input: encodeBin(data[i].text),
      output
    });

    if(data[i].entity){
      output = {};
      output[data[i].entity] = 1;

      entityML.push({
        input: encodeBin(data[i].text),
        output
      });
    }
  }

  intentNet.train(intentML, {log: true});
  entityNet.train(entityML, {log: true});

  fs.writeFile(path.intentKnlgBase, JSON.stringify(intentNet.toJSON()), function(err) {
    if (err) console.log(err);
  });

  fs.writeFile(path.entityKnlgBase, JSON.stringify(entityNet.toJSON()), function(err) {
    if (err) console.log(err);
  });
}

function encodeBin(string) {
  let numbers = [];

  for (let i = 0; i < string.length; i++)
    numbers.push(
      parseInt(string.charCodeAt(i).toString(2))
    );

  return numbers;
}
