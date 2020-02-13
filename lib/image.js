Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Image = undefined;

var _core = require("./core");

var _repeat = require("./util/repeat");

var _create = require("./util/create");

require("./pin");

require("./loop");

var image__super;

_core.Class.image = function (image) {
  var img = new Image();
  image && img.image(image);
  return img;
};

image__super = _core.Class;
Image.prototype = (0, _create.createjs)(image__super.prototype);

function Image() {
  image__super.call(this);
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
  this._image = _core.Class.texture(image).one();
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
    this._textures.length = (0, _repeat.repeatjs)(this._image, width, height, stretch, inner, insert);
  });

  function insert(i, sx, sy, sw, sh, dx, dy, dw, dh) {
    var repeat = self._textures.length > i ? self._textures[i] : self._textures[i] = self._image.pipe();
    repeat.src(sx, sy, sw, sh);
    repeat.dest(dx, dy, dw, dh);
  }
};
var exported_Image = Image;
exports.Image = exported_Image;
