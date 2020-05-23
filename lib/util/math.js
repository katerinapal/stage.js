import { createjs as create_createjsjs } from "./create";
var native = Math;

var mathjs_mathjs;

mathjs_mathjs = create_createjsjs(Math);

mathjs_mathjs.random = function(min, max) {
  if (typeof min === 'undefined') {
    max = 1, min = 0;
  } else if (typeof max === 'undefined') {
    max = min, min = 0;
  }
  return min == max ? min : native.random() * (max - min) + min;
};

mathjs_mathjs.rotate = function(num, min, max) {
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

mathjs_mathjs.limit = function(num, min, max) {
  if (num < min) {
    return min;
  } else if (num > max) {
    return max;
  } else {
    return num;
  }
};

mathjs_mathjs.length = function(x, y) {
  return native.sqrt(x * x + y * y);
};
export { mathjs_mathjs as mathjs };