Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.limit = exports.rotate = undefined;

var _create = require("./create");

var native = Math;

var mathjs_obj = (0, _create.createjs)(Math);

var exported_random = function exported_random(min, max) {
  if (typeof min === "undefined") {
    max = 1, min = 0;
  } else if (typeof max === "undefined") {
    max = min, min = 0;
  }
  return min == max ? min : native.random() * (max - min) + min;
};

var exported_rotate = function exported_rotate(num, min, max) {
  if (typeof min === "undefined") {
    max = 1, min = 0;
  } else if (typeof max === "undefined") {
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

var exported_limit = function exported_limit(num, min, max) {
  if (num < min) {
    return min;
  } else if (num > max) {
    return max;
  } else {
    return num;
  }
};

var exported_length = function exported_length(x, y) {
  return native.sqrt(x * x + y * y);
};

exports.rotate = exported_rotate;
exports.limit = exported_limit;
