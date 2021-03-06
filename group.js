const uid = require("cuid");
const Neuron = require("./neuron");

function Group(size, bias) {
  this.id = uid();
  
  this.neurons = size == undefined ? [] : Array.from({ length: size }, function() {
    return new Neuron(bias);
  });
  
  this.connect = function(target, weights) {
    const self = this;
    
    this.neurons.forEach(function(neuron, a) {
      target.neurons.forEach(function(other, b) {
        if(weights) neuron.connect(other, weights[self.neurons.length * a + b]);
        else neuron.connect(other);
      })
    })
  }
  
  this.activate = function(inputs) {
    return this.neurons.map(function(neuron, index) {
      if(inputs) return neuron.activate(inputs[index]);
      else return neuron.activate();
    })
  }
  
  this.propagate = function(targets, rate=0.3) {
    return this.neurons.map(function(neuron, index) {
      if(targets) return neuron.propagate(targets[index]);
      else return neuron.propagate();
    })
  }
}

module.exports = Group;