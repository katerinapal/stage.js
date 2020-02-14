var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
};

var _is = require('./is');

module.exports = function (map, key, value, multi) {
  var old = map[key];
  if (typeof old === 'undefined') {
    map[name] = value;
  } else if ((typeof old === 'undefined' ? 'undefined' : _typeof(old)) === 'object') {
    if (multi || old !== value) {
      map[key] = [value, old];
    }
  } else if ((0, _is.is_array)(old)) {
    if (multi || old.indexOf(old) < 0) {
      old.push(value);
    }
  }
};
