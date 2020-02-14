var _lib = require("../lib/");

var _image = require("../lib/image");

var _mouse = require("../lib/addon/mouse");

require("../lib/canvas");

require("../lib/anim");

require("../lib/str");

require("../lib/layout");

require("../lib/addon/tween");

require("../lib/loader/web");

module.exports = _lib.indexjs;

module.exports.internal = {};

module.exports.internal.Image = _image.Image;
module.exports.Mouse = _mouse.Mouse;
module.exports.Math = mathjs;
module.exports._extend = extendjs;
module.exports._create = createjs;
