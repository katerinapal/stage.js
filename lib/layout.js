var _core = require("./core");

var _core2 = _interopRequireDefault(_core);

var _create = require("./util/create");

var _create2 = _interopRequireDefault(_create);

require("./pin");

require("./loop");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

_core2.default.row = function (align) {
  return _core2.default.create().row(align).label('Row');
};

_core2.default.prototype.row = function (align) {
  this.sequence('row', align);
  return this;
};

_core2.default.column = function (align) {
  return _core2.default.create().column(align).label('Row');
};

_core2.default.prototype.column = function (align) {
  this.sequence('column', align);
  return this;
};

_core2.default.sequence = function (type, align) {
  return _core2.default.create().sequence(type, align).label('Sequence');
};

_core2.default.prototype.sequence = function (type, align) {

  this._padding = this._padding || 0;
  this._spacing = this._spacing || 0;

  this.untick(this._layoutTiker);
  this.tick(this._layoutTiker = function () {
    if (this._mo_seq == this._ts_touch) {
      return;
    }
    this._mo_seq = this._ts_touch;

    var alignChildren = this._mo_seqAlign != this._ts_children;
    this._mo_seqAlign = this._ts_children;

    var width = 0,
        height = 0;

    var child,
        next = this.first(true);
    var first = true;
    while (child = next) {
      next = child.next(true);

      child.matrix(true);
      var w = child.pin('boxWidth');
      var h = child.pin('boxHeight');

      if (type == 'column') {
        !first && (height += this._spacing);
        child.pin('offsetY') != height && child.pin('offsetY', height);
        width = Math.max(width, w);
        height = height + h;
        alignChildren && child.pin('alignX', align);
      } else if (type == 'row') {
        !first && (width += this._spacing);
        child.pin('offsetX') != width && child.pin('offsetX', width);
        width = width + w;
        height = Math.max(height, h);
        alignChildren && child.pin('alignY', align);
      }
      first = false;
    }
    width += 2 * this._padding;
    height += 2 * this._padding;
    this.pin('width') != width && this.pin('width', width);
    this.pin('height') != height && this.pin('height', height);
  });
  return this;
};

_core2.default.box = function () {
  return _core2.default.create().box().label('Box');
};

_core2.default.prototype.box = function () {
  this._padding = this._padding || 0;

  this.untick(this._layoutTiker);
  this.tick(this._layoutTiker = function () {
    if (this._mo_box == this._ts_touch) {
      return;
    }
    this._mo_box = this._ts_touch;

    var width = 0,
        height = 0;
    var child,
        next = this.first(true);
    while (child = next) {
      next = child.next(true);
      child.matrix(true);
      var w = child.pin('boxWidth');
      var h = child.pin('boxHeight');
      width = Math.max(width, w);
      height = Math.max(height, h);
    }
    width += 2 * this._padding;
    height += 2 * this._padding;
    this.pin('width') != width && this.pin('width', width);
    this.pin('height') != height && this.pin('height', height);
  });
  return this;
};

_core2.default.layer = function () {
  return _core2.default.create().layer().label('Layer');
};

_core2.default.prototype.layer = function () {

  this.untick(this._layoutTiker);
  this.tick(this._layoutTiker = function () {
    var parent = this.parent();
    if (parent) {
      var width = parent.pin('width');
      if (this.pin('width') != width) {
        this.pin('width', width);
      }
      var height = parent.pin('height');
      if (this.pin('height') != height) {
        this.pin('height', height);
      }
    }
  }, true);
  return this;
};

// TODO: move padding to pin
_core2.default.prototype.padding = function (pad) {
  this._padding = pad;
  return this;
};

_core2.default.prototype.spacing = function (space) {
  this._spacing = space;
  return this;
};
