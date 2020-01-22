import { createjs as create } from "./create";
var native = Math;

var mathjs_obj = create(Math);

var exported_random = function(min, max) {
  if (typeof min === "undefined") {
    max = 1, min = 0;
  } else if (typeof max === "undefined") {
    max = min, min = 0;
  }
  return min == max ? min : native.random() * (max - min) + min;
};

var exported_rotate = function(num, min, max) {
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

var exported_limit = function(num, min, max) {
  if (num < min) {
    return min;
  } else if (num > max) {
    return max;
  } else {
    return num;
  }
};

var exported_length = function(x, y) {
  return native.sqrt(x * x + y * y);
};

export { exported_rotate as rotate, exported_limit as limit };