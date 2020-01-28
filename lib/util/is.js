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
  'boolean' : 1,
  'number' : 1,
  'string' : 1,
  'undefined' : 1
};

var hexRegex = /^[A-Fa-f0-9]+$/;

var objectLiteral_a = function(value, type) {
  return typeof value === type;
};

var objectLiteral_an = function(value, type) {
  return typeof value === type;
};

var objectLiteral_type = function(value, type) {
  return typeof value === type;
};

var objectLiteral_defined = function(value) {
  return typeof value !== "undefined";
};

var objectLiteral_empty = function(value) {
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

var objectLiteral_equal = function(value, other) {
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

var objectLiteral_instance = function(value, constructor) {
  return value instanceof constructor;
};

var objectLiteral_nil = function(value) {
  return value === null;
};

var objectLiteral_undef = function(value) {
  return typeof value === "undefined";
};

var objectLiteral_array = function(value) {
  return "[object Array]" === toStr.call(value);
};

var objectLiteral_emptyarray = function(value) {
  return objectLiteral_array(value) && value.length === 0;
};

var objectLiteral_arraylike = function(value) {
  return !!value && !objectLiteral_boolean(value) && owns.call(value, "length") && isFinite(value.length) && objectLiteral_number(value.length) && value.length >= 0;
};

var objectLiteral_boolean = function(value) {
  return "[object Boolean]" === toStr.call(value);
};

var objectLiteral_element = function(value) {
  return value !== undefined && typeof HTMLElement !== "undefined" && value instanceof HTMLElement && value.nodeType === 1;
};

var objectLiteral_fn = function(value) {
  return "[object Function]" === toStr.call(value);
};

var objectLiteral_number = function(value) {
  return "[object Number]" === toStr.call(value);
};

var objectLiteral_nan = function(value) {
  return !objectLiteral_number(value) || value !== value;
};

var objectLiteral_object = function(value) {
  return "[object Object]" === toStr.call(value);
};

var objectLiteral_hash = function(value) {
  return objectLiteral_object(value) && value.constructor === Object && !value.nodeType && !value.setInterval;
};

var objectLiteral_regexp = function(value) {
  return "[object RegExp]" === toStr.call(value);
};

var objectLiteral_string = function(value) {
  return "[object String]" === toStr.call(value);
};

var objectLiteral_hex = function(value) {
  return objectLiteral_string(value) && (!value.length || hexRegex.test(value));
};

export { objectLiteral_defined as defined, objectLiteral_array as array, objectLiteral_fn as fn, objectLiteral_number as number, objectLiteral_object as object, objectLiteral_hash as hash, objectLiteral_string as string };
