var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
};

/**
 * ! is the definitive JavaScript type testing library
 * 
 * @copyright 2013-2014 Enrico Marino / Jordan Harband
 * @license MIT
 */

var objProto = Object.prototype;
var owns = objProto.hasOwnProperty;
var toStr = objProto.toString;

var NON_HOST_TYPES = {
  'boolean': 1,
  'number': 1,
  'string': 1,
  'undefined': 1
};

var hexRegex = /^[A-Fa-f0-9]+$/;

var is_a = function is_a(value, type) {
  return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === type;
};

var is_an = function is_an(value, type) {
  return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === type;
};

var is_type = function is_type(value, type) {
  return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === type;
};

var is_defined = function is_defined(value) {
  return typeof value !== "undefined";
};

var is_empty = function is_empty(value) {
  var type = toStr.call(value);
  var key;

  if ("[object Array]" === type || "[object Arguments]" === type || "[object String]" === type) {
    return value.length === 0;
  }

  if ("[object Object]" === type) {
    for (key in value) {
      if (owns.call(value, key)) {
        return false;
      }
    }
    return true;
  }

  return !value;
};

var is_equal = function is_equal(value, other) {
  if (value === other) {
    return true;
  }

  var type = toStr.call(value);
  var key;

  if (type !== toStr.call(other)) {
    return false;
  }

  if ("[object Object]" === type) {
    for (key in value) {
      if (!is_equal(value[key], other[key]) || !(key in other)) {
        return false;
      }
    }
    for (key in other) {
      if (!is_equal(value[key], other[key]) || !(key in value)) {
        return false;
      }
    }
    return true;
  }

  if ("[object Array]" === type) {
    key = value.length;
    if (key !== other.length) {
      return false;
    }
    while (--key) {
      if (!is_equal(value[key], other[key])) {
        return false;
      }
    }
    return true;
  }

  if ("[object Function]" === type) {
    return value.prototype === other.prototype;
  }

  if ("[object Date]" === type) {
    return value.getTime() === other.getTime();
  }

  return false;
};

var is_instance = function is_instance(value, constructor) {
  return value instanceof constructor;
};

var is_nil = function is_nil(value) {
  return value === null;
};

var is_undef = function is_undef(value) {
  return typeof value === "undefined";
};

var is_array = function is_array(value) {
  return "[object Array]" === toStr.call(value);
};

var is_emptyarray = function is_emptyarray(value) {
  return is_array(value) && value.length === 0;
};

var is_arraylike = function is_arraylike(value) {
  return !!value && !is_boolean(value) && owns.call(value, "length") && isFinite(value.length) && is_number(value.length) && value.length >= 0;
};

var is_boolean = function is_boolean(value) {
  return "[object Boolean]" === toStr.call(value);
};

var is_element = function is_element(value) {
  return value !== undefined && typeof HTMLElement !== "undefined" && value instanceof HTMLElement && value.nodeType === 1;
};

var is_fn = function is_fn(value) {
  return "[object Function]" === toStr.call(value);
};

var is_number = function is_number(value) {
  return "[object Number]" === toStr.call(value);
};

var is_nan = function is_nan(value) {
  return !is_number(value) || value !== value;
};

var is_object = function is_object(value) {
  return "[object Object]" === toStr.call(value);
};

var is_hash = function is_hash(value) {
  return is_object(value) && value.constructor === Object && !value.nodeType && !value.setInterval;
};

var is_regexp = function is_regexp(value) {
  return "[object RegExp]" === toStr.call(value);
};

var is_string = function is_string(value) {
  return "[object String]" === toStr.call(value);
};

var is_hex = function is_hex(value) {
  return is_string(value) && (!value.length || hexRegex.test(value));
};

exports.is_defined = is_defined;
exports.is_array = is_array;
exports.is_fn = is_fn;
exports.is_number = is_number;
exports.is_object = is_object;
exports.is_hash = is_hash;
exports.is_string = is_string;
