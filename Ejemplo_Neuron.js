const Neuron = require("./neuron")

// AND Logic Gate
const dataset = [
  { inputs: [0,0], outputs: [0] },
  { inputs: [0,1], outputs: [0] },
  { inputs: [1,0], outputs: [0] },
  { inputs: [1,1], outputs: [1] }
]

// Neural Network Layers
const inputs = [new Neuron(), new Neuron()];
const hiddens = [new Neuron(), new Neuron()];
const outputs = [new Neuron()];

// Connect Neural Network
inputs[0].connect(hiddens[0]);
inputs[0].connect(hiddens[1]);
inputs[1].connect(hiddens[0]);
inputs[1].connect(hiddens[1]);
hiddens[0].connect(outputs[0]);
hiddens[1].connect(outputs[0]);

// Utility Functions
const activate = (input) => {
  inputs.forEach((neuron, i) => neuron.activate(input[i]));
  hiddens.forEach(neuron => neuron.activate());
  return outputs.map(neuron => neuron.activate());
};
const propagate = (target) => {
  outputs.forEach((neuron, t) => neuron.propagate(target[t]));
  hiddens.forEach(neuron => neuron.propagate());
  return inputs.forEach(neuron => neuron.propagate());
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