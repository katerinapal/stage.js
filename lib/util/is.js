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

var objectLiteral_a = function objectLiteral_a(value, type) {
  return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === type;
};

var objectLiteral_an = function objectLiteral_an(value, type) {
  return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === type;
};

var objectLiteral_type = function objectLiteral_type(value, type) {
  return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === type;
};

var objectLiteral_defined = function objectLiteral_defined(value) {
  return typeof value !== "undefined";
};

var objectLiteral_empty = function objectLiteral_empty(value) {
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

var objectLiteral_equal = function objectLiteral_equal(value, other) {
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
      if (!objectLiteral_equal(value[key], other[key]) || !(key in other)) {
        return false;
      }
    }
    for (key in other) {
      if (!objectLiteral_equal(value[key], other[key]) || !(key in value)) {
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
      if (!objectLiteral_equal(value[key], other[key])) {
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

var objectLiteral_instance = function objectLiteral_instance(value, constructor) {
  return value instanceof constructor;
};

var objectLiteral_nil = function objectLiteral_nil(value) {
  return value === null;
};

var objectLiteral_undef = function objectLiteral_undef(value) {
  return typeof value === "undefined";
};

var objectLiteral_array = function objectLiteral_array(value) {
  return "[object Array]" === toStr.call(value);
};

var objectLiteral_emptyarray = function objectLiteral_emptyarray(value) {
  return objectLiteral_array(value) && value.length === 0;
};

var objectLiteral_arraylike = function objectLiteral_arraylike(value) {
  return !!value && !objectLiteral_boolean(value) && owns.call(value, "length") && isFinite(value.length) && objectLiteral_number(value.length) && value.length >= 0;
};

var objectLiteral_boolean = function objectLiteral_boolean(value) {
  return "[object Boolean]" === toStr.call(value);
};

var objectLiteral_element = function objectLiteral_element(value) {
  return value !== undefined && typeof HTMLElement !== "undefined" && value instanceof HTMLElement && value.nodeType === 1;
};

var objectLiteral_fn = function objectLiteral_fn(value) {
  return "[object Function]" === toStr.call(value);
};

var objectLiteral_number = function objectLiteral_number(value) {
  return "[object Number]" === toStr.call(value);
};

var objectLiteral_nan = function objectLiteral_nan(value) {
  return !objectLiteral_number(value) || value !== value;
};

var objectLiteral_object = function objectLiteral_object(value) {
  return "[object Object]" === toStr.call(value);
};

var objectLiteral_hash = function objectLiteral_hash(value) {
  return objectLiteral_object(value) && value.constructor === Object && !value.nodeType && !value.setInterval;
};

var objectLiteral_regexp = function objectLiteral_regexp(value) {
  return "[object RegExp]" === toStr.call(value);
};

var objectLiteral_string = function objectLiteral_string(value) {
  return "[object String]" === toStr.call(value);
};

var objectLiteral_hex = function objectLiteral_hex(value) {
  return objectLiteral_string(value) && (!value.length || hexRegex.test(value));
};

exports.defined = objectLiteral_defined;
exports.array = objectLiteral_array;
exports.fn = objectLiteral_fn;
exports.number = objectLiteral_number;
exports.object = objectLiteral_object;
exports.hash = objectLiteral_hash;
exports.string = objectLiteral_string;
