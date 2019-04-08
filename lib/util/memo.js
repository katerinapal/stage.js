Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (fn) {
  var memory = {};
  return function (key) {
    if (key in memory) {
      return memory[key];
    }
    exports.value = value = fn(key);
    if (typeof value !== 'undefined') {
      memory[key] = value;
    }
    return value;
  };
};

var value = exports.value = undefined;
;;
