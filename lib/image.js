import Class from "./core";
import repeat from "./util/repeat";
import create from "./util/create";
import "./pin";
import "./loop";

Class.image = function(image) {
  var img = new Image();
  image && img.image(image);
  return img;
};

Image._super = Class;
Image.prototype = create(Image._super.prototype);

export default function Image() {
  Image._super.call(this);
  this.label('Image');
  this._textures = [];
  this._image = null;
}

/**
 * @deprecated Use image
 */
Image.prototype.setImage = function(a, b, c) {
  return this.image(a, b, c);
};

Image.prototype.image = function(image) {
  this._image = Class.texture(image).one();
  this.pin('width', this._image ? this._image.width : 0);
  this.pin('height', this._image ? this._image.height : 0);
  this._textures[0] = this._image.pipe();
  this._textures.length = 1;
  return this;
};

Image.prototype.tile = function(inner) {
  this._repeat(false, inner);
  return this;
};

Image.prototype.stretch = function(inner) {
  this._repeat(true, inner);
  return this;
};

Image.prototype._repeat = function(stretch, inner) {
  var self = this;
  this.untick(this._repeatTicker);
  this.tick(this._repeatTicker = function() {
    if (this._mo_stretch == this._pin._ts_transform) {
      return;
    }
    this._mo_stretch = this._pin._ts_transform;
    var width = this.pin('width');
    var height = this.pin('height');
    this._textures.length = repeat(this._image, width, height, stretch, inner,
        insert);
  });

  function insert(i, sx, sy, sw, sh, dx, dy, dw, dh) {
    repeat.src(sx, sy, sw, sh);
    repeat.dest(dx, dy, dw, dh);
  }
};
