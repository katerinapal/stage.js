var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
};

var _core = require("./core");

var _core2 = _interopRequireDefault(_core);

var _texture = require("./texture");

var _texture2 = _interopRequireDefault(_texture);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

_core2.default.canvas = function (type, attributes, callback) {
  if (typeof type === 'string') {
    if ((typeof attributes === "undefined" ? "undefined" : _typeof(attributes)) === 'object') {} else {
      if (typeof attributes === 'function') {
        callback = attributes;
      }
      attributes = {};
    }
  } else {
    if (typeof type === 'function') {
      callback = type;
    }
    attributes = {};
    type = '2d';
  }

  var canvas = document.createElement('canvas');
  var context = canvas.getContext(type, attributes);
  var texture = new _texture2.default(canvas);

  texture.context = function () {
    return context;
  };

  texture.size = function (width, height, ratio) {
    ratio = ratio || 1;
    canvas.width = width * ratio;
    canvas.height = height * ratio;
    this.src(canvas, ratio);
    return this;
  };

  texture.canvas = function (fn) {
    if (typeof fn === 'function') {
      fn.call(this, context);
    } else if (typeof fn === 'undefined' && typeof callback === 'function') {
      callback.call(this, context);
    }
    return this;
  };

  if (typeof callback === 'function') {
    callback.call(texture, context);
  }

  return texture;
};
