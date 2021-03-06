const uid = require("cuid");
const Group = require("./group");

function Network(sizes, biases, weights) {
  let self = this;
  
  this.id = uid();
  
  this.groups = sizes == undefined ? [] : sizes.map(function(size, index) {
    if(biases == undefined) return new Group(size);
    else return new Group(size, biases[index]);
  });
  
  this.groups.slice(0, this.groups.length - 1).forEach(function(group, index) {
    if(weights) group.connect(self.groups[index + 1], weights[index]);
    else group.connect(self.groups[index + 1]);
  })
  
  this.activate = function(inputs) {
    const outputs = this.groups.map(function(group, index) {
      if(index === 0) return group.activate(inputs);
      else return group.activate();
    });
    
    return outputs[outputs.length - 1];
  }
  
  this.propagate= function(targets) {
    const error = this.groups[this.groups.length - 1].neurons.map(function(neuron, index) {
      return 0.5 * Math.pow(targets[index] - neuron.output, 2);
    }).reduce((a,b) => a + b);
    
    this.groups.reverse().forEach(function(group, index) {
      if(index === 0) group.propagate(targets);
      else return group.propagate();
    }); this.groups.reverse();
    
    return error;
  }
}

module.exports = Network;