const Group = require("./group")

// AND Logic Gate
const dataset = [
  { inputs: [0,0], outputs: [0] },
  { inputs: [0,1], outputs: [0] },
  { inputs: [1,0], outputs: [0] },
  { inputs: [1,1], outputs: [1] }
]

// Neural Network Layers
const inputs = new Group(2);
const hiddens = new Group(2);
const outputs = new Group(1);

// Connect Neural Network
inputs.connect(hiddens);
hiddens.connect(outputs);

// Utility Functions
const activate = (input) => {
  inputs.activate(input);
  hiddens.activate();
  return outputs.activate();
};
const propagate = (target) => {
  outputs.propagate(target);
  hiddens.propagate();
  return inputs.propagate();
};
const train = (iterations=1) => {
  while(iterations > 0) {
    dataset.map(datum => {
      activate(datum.inputs);
      propagate(datum.outputs);
    });
    iterations--;
  }
};

// Train Network (10,000 Iterations)
train(10000);

// Test Network
console.log(activate([0,0])); // ~0 (0.01214291222508886)
console.log(activate([0,1])); // ~0 (0.08100696632854297)
console.log(activate([1,0])); // ~0 (0.07793351045035582)
console.log(activate([1,1])); // ~1 (0.8780115291725155)