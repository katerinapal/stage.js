var value;
var value;
var encapsulated_anonymus;
encapsulated_anonymus = function(fn) {
  var memory = {};
  return function(key) {
    if (key in memory) {
      return memory[key];
    }
    value = fn(key);
    if (typeof value !== 'undefined') {
      memory[key] = value;
    }
    return value;
  };
};