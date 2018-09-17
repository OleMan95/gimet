const readline = require('readline');
import StringNN from './string-neural-net';
import intentMLData from './mlData';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const IntentNN = new StringNN('IntentNN', intentMLData, '../resources/');
// const DialogNet2 = new StringNN('name2');
// IntentNN.initialize();

rl.question('Enter text: ', (answer) => {
  const result = IntentNN.run(answer);

  console.log(`Result for "${answer}":\n`, result);
  console.log(`=====================================================`);

  rl.question('Type intent: ', (intent) => {

    rl.question('Type entity: ', (entity) => {
      IntentNN.addCase({text: answer, intent, entity});
      rl.close();
    });
  });

});
