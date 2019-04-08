Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Image;

var _core = require("./core");

var _core2 = _interopRequireDefault(_core);

var _repeat = require("./util/repeat");

var _repeat2 = _interopRequireDefault(_repeat);

var _create = require("./util/create");

var _create2 = _interopRequireDefault(_create);

require("./pin");

require("./loop");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

_core2.default.image = function (image) {
  var img = new Image();
  image && img.image(image);
  return img;
};

Image._super = _core2.default;
Image.prototype = (0, _create2.default)(Image._super.prototype);

function Image() {
  Image._super.call(this);
  this.label('Image');
  this._textures = [];
  this._image = null;
}

/**
 * @deprecated Use image
 */
Image.prototype.setImage = function (a, b, c) {
  return this.image(a, b, c);
};

Image.prototype.image = function (image) {
  this._image = _core2.default.texture(image).one();
  this.pin('width', this._image ? this._image.width : 0);
  this.pin('height', this._image ? this._image.height : 0);
  this._textures[0] = this._image.pipe();
  this._textures.length = 1;
  return this;
};

Image.prototype.tile = function (inner) {
  this._repeat(false, inner);
  return this;
};

Image.prototype.stretch = function (inner) {
  this._repeat(true, inner);
  return this;
};

Image.prototype._repeat = function (stretch, inner) {
  var self = this;
  this.untick(this._repeatTicker);
  this.tick(this._repeatTicker = function () {
    if (this._mo_stretch == this._pin._ts_transform) {
      return;
    }
    this._mo_stretch = this._pin._ts_transform;
    var width = this.pin('width');
    var height = this.pin('height');
    this._textures.length = (0, _repeat2.default)(this._image, width, height, stretch, inner, insert);
  });

  function insert(i, sx, sy, sw, sh, dx, dy, dw, dh) {
    _repeat2.default.src(sx, sy, sw, sh);
    _repeat2.default.dest(dx, dy, dw, dh);
  }
};
module.exports = exports.default;
