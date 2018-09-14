import brain from 'brain.js';
import mlData from './mlData.json';
import fs from 'fs';

let net = new brain.recurrent.LSTM();

/**
 * Check if knowledge base exists.
 * If yes - load if to NN.
 * If no - learn the NN and save the knowledge base to json.
 * @return net - neural network
 */
export async function initNN() {
    let knlgBase;

    if(fs.existsSync('./knlgBase.json')){
      knlgBase = require('./knlgBase.json');
      net.fromJSON(knlgBase);
      return net;

    }else {
      return await learnNN(mlData);
    }
}

async function learnNN(data){
  let mlArray = [];

  for (let i = 0; i < data.length; i++){
    mlArray.push({
      input: data[i].text,
      output: data[i].intent
    });
  }

  net.train(mlArray, {iterations: mlArray.length * 50, log: true});

  let json = net.toJSON();
  fs.writeFile("knlgBase.json", JSON.stringify(json), function(err) {
    if (err) console.log(err);
  });

  return net;
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
