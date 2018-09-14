const readline = require('readline');
import DialogNN from './dialog-recognition';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const DialogNet = new DialogNN('test');
DialogNet.initialize();

rl.question('Enter text: ', (answer) => {
  const intent = DialogNet.getIntent(answer);

  console.log(`Result for "${answer}":`);
  console.log(intent);

  rl.question('If you want to learn it, please, type an intent for this case? Or type "exit" instead.\n', (intent) => {
    if(intent === 'exit'){
      console.log(`Ok, by!`);
      return;
    }

    DialogNet.addCase({text: answer, intent});
    rl.close();
  });

});
