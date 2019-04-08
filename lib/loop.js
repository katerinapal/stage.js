var _core = require("./core");

var _core2 = _interopRequireDefault(_core);

var _stats = require("./util/stats");

var _stats2 = _interopRequireDefault(_stats);

require("./pin");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

_core2.default.prototype._textures = null;
_core2.default.prototype._alpha = 1;

_core2.default.prototype.render = function (context) {
  if (!this._visible) {
    return;
  }
  _stats2.default.node++;

  var m = this.matrix();
  context.setTransform(m.a, m.b, m.c, m.d, m.e, m.f);

  // move this elsewhere!
  this._alpha = this._pin._alpha * (this._parent ? this._parent._alpha : 1);
  var alpha = this._pin._textureAlpha * this._alpha;

  if (context.globalAlpha != alpha) {
    context.globalAlpha = alpha;
  }

  if (this._textures !== null) {
    for (var i = 0, n = this._textures.length; i < n; i++) {
      this._textures[i].draw(context);
    }
  }

  if (context.globalAlpha != this._alpha) {
    context.globalAlpha = this._alpha;
  }

  var child,
      next = this._first;
  while (child = next) {
    next = child._next;
    child.render(context);
  }
};

_core2.default.prototype._tickBefore = null;
_core2.default.prototype._tickAfter = null;
_core2.default.prototype.MAX_ELAPSE = Infinity;

_core2.default.prototype._tick = function (elapsed, now, last) {
  if (!this._visible) {
    return;
  }

  if (elapsed > this.MAX_ELAPSE) {
    elapsed = this.MAX_ELAPSE;
  }

  var ticked = false;

  if (this._tickBefore !== null) {
    for (var i = 0; i < this._tickBefore.length; i++) {
      _stats2.default.tick++;
      var tickFn = this._tickBefore[i];
      ticked = tickFn.call(this, elapsed, now, last) === true || ticked;
    }
  }

  var child,
      next = this._first;
  while (child = next) {
    next = child._next;
    if (child._flag('_tick')) {
      ticked = child._tick(elapsed, now, last) === true ? true : ticked;
    }
  }

  if (this._tickAfter !== null) {
    for (var i = 0; i < this._tickAfter.length; i++) {
      _stats2.default.tick++;
      var tickFn = this._tickAfter[i];
      ticked = tickFn.call(this, elapsed, now, last) === true || ticked;
    }
  }

  return ticked;
};

_core2.default.prototype.tick = function (ticker, before) {
  if (typeof ticker !== 'function') {
    return;
  }
  if (before) {
    if (this._tickBefore === null) {
      this._tickBefore = [];
    }
    this._tickBefore.push(ticker);
  } else {
    if (this._tickAfter === null) {
      this._tickAfter = [];
    }
    this._tickAfter.push(ticker);
  }
  this._flag('_tick', this._tickAfter !== null && this._tickAfter.length > 0 || this._tickBefore !== null && this._tickBefore.length > 0);
};

_core2.default.prototype.untick = function (ticker) {
  if (typeof ticker !== 'function') {
    return;
  }
  var i;
  if (this._tickBefore !== null && (i = this._tickBefore.indexOf(ticker)) >= 0) {
    this._tickBefore.splice(i, 1);
  }
  if (this._tickAfter !== null && (i = this._tickAfter.indexOf(ticker)) >= 0) {
    this._tickAfter.splice(i, 1);
  }
};

_core2.default.prototype.timeout = function (fn, time) {
  this.setTimeout(fn, time);
};

_core2.default.prototype.setTimeout = function (fn, time) {
  function timer(t) {
    if ((time -= t) < 0) {
      this.untick(timer);
      fn.call(this);
    } else {
      return true;
    }
  }
  this.tick(timer);
  return timer;
};

_core2.default.prototype.clearTimeout = function (timer) {
  this.untick(timer);
};
