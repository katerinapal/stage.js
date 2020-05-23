import { Class as core_Classjs } from "./core";
import "./pin";
import "./loop";

core_Classjs.row = function(align) {
  return core_Classjs.create().row(align).label('Row');
};

core_Classjs.prototype.row = function(align) {
  this.sequence('row', align);
  return this;
};

core_Classjs.column = function(align) {
  return core_Classjs.create().column(align).label('Row');
};

core_Classjs.prototype.column = function(align) {
  this.sequence('column', align);
  return this;
};

core_Classjs.sequence = function(type, align) {
  return core_Classjs.create().sequence(type, align).label('Sequence');
};

core_Classjs.prototype.sequence = function(type, align) {

  this._padding = this._padding || 0;
  this._spacing = this._spacing || 0;

  this.untick(this._layoutTiker);
  this.tick(this._layoutTiker = function() {
    if (this._mo_seq == this._ts_touch) {
      return;
    }
    this._mo_seq = this._ts_touch;

    var alignChildren = (this._mo_seqAlign != this._ts_children);
    this._mo_seqAlign = this._ts_children;

    var width = 0, height = 0;

    var child, next = this.first(true);
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

core_Classjs.box = function() {
  return core_Classjs.create().box().label('Box');
};

core_Classjs.prototype.box = function() {
  this._padding = this._padding || 0;

  this.untick(this._layoutTiker);
  this.tick(this._layoutTiker = function() {
    if (this._mo_box == this._ts_touch) {
      return;
    }
    this._mo_box = this._ts_touch;

    var width = 0, height = 0;
    var child, next = this.first(true);
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

core_Classjs.layer = function() {
  return core_Classjs.create().layer().label('Layer');
};

core_Classjs.prototype.layer = function() {

  this.untick(this._layoutTiker);
  this.tick(this._layoutTiker = function() {
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
core_Classjs.prototype.padding = function(pad) {
  this._padding = pad;
  return this;
};

core_Classjs.prototype.spacing = function(space) {
  this._spacing = space;
  return this;
};
