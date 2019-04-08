Object.defineProperty(exports, "__esModule", {
  value: true
});

var _create = require('./create');

var _create2 = _interopRequireDefault(_create);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var native = Math;

var exportedObject = (0, _create2.default)(Math);;

exportedObject.random = function (min, max) {
  if (typeof min === 'undefined') {
    max = 1, min = 0;
  } else if (typeof max === 'undefined') {
    max = min, min = 0;
  }
  return min == max ? min : native.random() * (max - min) + min;
};

exportedObject.rotate = function (num, min, max) {
  if (typeof min === 'undefined') {
    max = 1, min = 0;
  } else if (typeof max === 'undefined') {
    max = min, min = 0;
  }
  if (max > min) {
    num = (num - min) % (max - min);
    return num + (num < 0 ? max : min);
  } else {
    num = (num - max) % (min - max);
    return num + (num <= 0 ? min : max);
  }
};

exportedObject.limit = function (num, min, max) {
  if (num < min) {
    return min;
  } else if (num > max) {
    return max;
  } else {
    return num;
  }
};

exportedObject.length = function (x, y) {
  return native.sqrt(x * x + y * y);
};
exports.default = exportedObject;
module.exports = exports.default;
