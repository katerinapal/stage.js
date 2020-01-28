var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
};

var _core = require("./core");

var _create = require("./util/create");

var _is = require("./util/is");

var is = _interopRequireWildcard(_is);

require("./pin");

require("./loop");

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }newObj.default = obj;return newObj;
  }
}

var ClassBinding = _core.Class;

ClassBinding.string = function (frames) {
  return new Str().frames(frames);
};

Str._super = ClassBinding;
Str.prototype = (0, _create.createjs)(Str._super.prototype);

function Str() {
  Str._super.call(this);
  this.label('String');
  this._textures = [];
}

/**
 * @deprecated Use frames
 */
Str.prototype.setFont = function (a, b, c) {
  return this.frames(a, b, c);
};

Str.prototype.frames = function (frames) {
  this._textures = [];
  if (typeof frames == 'string') {
    frames = ClassBinding.texture(frames);
    this._item = function (value) {
      return frames.one(value);
    };
  } else if ((typeof frames === "undefined" ? "undefined" : _typeof(frames)) === 'object') {
    this._item = function (value) {
      return frames[value];
    };
  } else if (typeof frames === 'function') {
    this._item = frames;
  }
  return this;
};

/**
 * @deprecated Use value
 */
Str.prototype.setValue = function (a, b, c) {
  return this.value(a, b, c);
};

Str.prototype.value = function (value) {
  if (typeof value === 'undefined') {
    return this._value;
  }
  if (this._value === value) {
    return this;
  }
  this._value = value;

  if (value === null) {
    value = '';
  } else if (typeof value !== 'string' && !is.array(value)) {
    value = value.toString();
  }

  this._spacing = this._spacing || 0;

  var width = 0,
      height = 0;
  for (var i = 0; i < value.length; i++) {
    var image = this._textures[i] = this._item(value[i]);
    width += i > 0 ? this._spacing : 0;
    image.dest(width, 0);
    width = width + image.width;
    height = Math.max(height, image.height);
  }
  this.pin('width', width);
  this.pin('height', height);
  this._textures.length = value.length;
  return this;
};
