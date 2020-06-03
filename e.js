const Network = require("./network");


// AND Logic Gate
const dataset = [
  { inputs: [0,0], outputs: [0] },
  { inputs: [0,1], outputs: [0] },
  { inputs: [1,0], outputs: [0] },
  { inputs: [1,1], outputs: [1] }
]

// Neural Network
const network = new Network([2,2,1]);


// Utility Functions
const train = (iterations=1) => {
  while(iterations > 0) {
    dataset.map(datum => {
      network.activate(datum.inputs);
      network.propagate(datum.outputs);
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