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

var is_a = function(value, type) {
  return typeof value === type;
};

var is_an = function(value, type) {
  return typeof value === type;
};

var is_type = function(value, type) {
  return typeof value === type;
};

var is_defined = function(value) {
  return typeof value !== "undefined";
};

var is_empty = function(value) {
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

var is_equal = function(value, other) {
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

var is_instance = function(value, constructor) {
  return value instanceof constructor;
};

var is_nil = function(value) {
  return value === null;
};

var is_undef = function(value) {
  return typeof value === "undefined";
};

var is_array = function(value) {
  return "[object Array]" === toStr.call(value);
};

var is_emptyarray = function(value) {
  return is_array(value) && value.length === 0;
};

var is_arraylike = function(value) {
  return !!value && !is_boolean(value) && owns.call(value, "length") && isFinite(value.length) && is_number(value.length) && value.length >= 0;
};

var is_boolean = function(value) {
  return "[object Boolean]" === toStr.call(value);
};

var is_element = function(value) {
  return value !== undefined && typeof HTMLElement !== "undefined" && value instanceof HTMLElement && value.nodeType === 1;
};

var is_fn = function(value) {
  return "[object Function]" === toStr.call(value);
};

var is_number = function(value) {
  return "[object Number]" === toStr.call(value);
};

var is_nan = function(value) {
  return !is_number(value) || value !== value;
};

var is_object = function(value) {
  return "[object Object]" === toStr.call(value);
};

var is_hash = function(value) {
  return is_object(value) && value.constructor === Object && !value.nodeType && !value.setInterval;
};

var is_regexp = function(value) {
  return "[object RegExp]" === toStr.call(value);
};

var is_string = function(value) {
  return "[object String]" === toStr.call(value);
};

var is_hex = function(value) {
  return is_string(value) && (!value.length || hexRegex.test(value));
};

export { is_defined, is_array, is_fn, is_number, is_object, is_hash, is_string };
