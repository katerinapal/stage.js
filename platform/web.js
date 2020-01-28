var _lib = require("../lib/");

var _image = require("../lib/image");

var _mouse = require("../lib/addon/mouse");

var _math = require("../lib/util/math");

var mathjs = _interopRequireWildcard(_math);

var _extend = require("../lib/util/extend");

var _create = require("../lib/util/create");

require("../lib/canvas");

require("../lib/anim");

require("../lib/str");

require("../lib/layout");

require("../lib/addon/tween");

require("../lib/loader/web");

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

module.exports = _lib.indexjs;

module.exports.internal = {};

module.exports.internal.Image = _image.Image;
module.exports.Mouse = _mouse.Mouse;
module.exports.Math = mathjs;
module.exports._extend = _extend.extendjs;
module.exports._create = _create.createjs;
