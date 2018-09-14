# GIMET expertbot
## Dialogs

* Make a `Dialog` class, that contains arrays with dialogs, replies and word recognitions.

### Waterflow

    1. Find out what user wants.
        - find an expert
        - get info about expert-bot
        - get help in using GIMET
    2. `if find an expert`
        - find out what expert to look for
        - find similar experts and ask what to start
        - begin the consultation
        - display the consultation results
        - go to step 1
    3. `if get info about expert-bot`
        - display the main capabilities
        - go to step 1
    4. `if get help in using GIMET`
        - display topics which user can ask
        - tell about that topic
        - go to step 1

### Architecture

    1. User connects:
        * Set the DialogFlow object to user with config (which is a dialog object).
        The object contains a dialog flow.

    2. User sends the message:
        * Recognise the intent and entities with wit.ai.
        * Get dialog by intent, entities and context. Use neural network.

## brain.js

### example
```javascript
// provide optional config object (or undefined). Defaults shown.
const config = {
    binaryThresh: 0.5,     // ¯\_(ツ)_/¯
    hiddenLayers: [3],     // array of ints for the sizes of the hidden layers in the network
    activation: 'sigmoid'  // supported activation types: ['sigmoid', 'relu', 'leaky-relu', 'tanh']
};

// create a simple feed forward neural network with backpropagation
const net = new brain.NeuralNetwork(config);

net.train([{input: [0, 0], output: [0]},
           {input: [0, 1], output: [1]},
           {input: [1, 0], output: [1]},
           {input: [1, 1], output: [0]}]);

const output = net.run([1, 0]);  // [0.987]
```




* find_expert

    `getDialog('FE')`

* find_expert: expert_object (create)

    `getExpert('expert_object')`

* find_expert: expert_object, done

    `getExpertResult('expert_object')`


