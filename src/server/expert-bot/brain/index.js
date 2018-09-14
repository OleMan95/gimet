import brain from 'brain.js';
import mlData from './mlData.json';
import fs from 'fs';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
let knowledgeBase;

if(fs.existsSync('./knowledge-base.json')){
   knowledgeBase = require('./knowledge-base.json');
}

// let net = new brain.NeuralNetwork();
let net = new brain.recurrent.LSTM();
let mlArray = [];

for (let i = 0; i < mlData.length; i++){
  mlArray.push({
    input: mlData[i].text,
    output: mlData[i].intent
  });
}

/**
 * Check if knowledge base are exists.
 * If yes - load if to NN.
 * If no - learn the NN and save the knowledge base to json.
 */
if(knowledgeBase){
  net.fromJSON(knowledgeBase);
}else {
  net.train(mlArray, {iterations: mlArray.length * 50, log: true});

  let json = net.toJSON();
  fs.writeFile("knowledge-base.json", JSON.stringify(json), function(err) {
    if (err) console.log(err);
  });
}

// function learnNN(result){
//   const data = JSON.parse(mlData);  //parse the JSON
//   data.push({        //add the employee
//     firstName:"Mike",
//     lastName:"Rut",
//   });
//   txt = JSON.stringify(data);  //reserialize to JSON
// }

rl.question('Enter text ', (answer) => {
  let result = net.run(answer);

  if(result != 'find_expert' && result != 'about'){
    console.log(`Sorry, i can\'t understand: ${answer}`);

  }else{
    console.log(`Result for "${answer}":`);
    console.log(result);
  }

  rl.close();
});
