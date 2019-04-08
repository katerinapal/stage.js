Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lib = require("../lib/");

var _lib2 = _interopRequireDefault(_lib);

var _image = require("../lib/image");

var _image2 = _interopRequireDefault(_image);

var _mouse = require("../lib/addon/mouse");

var _mouse2 = _interopRequireDefault(_mouse);

var _math = require("../lib/util/math");

var _math2 = _interopRequireDefault(_math);

var _extend2 = require("../lib/util/extend");

var _extend3 = _interopRequireDefault(_extend2);

var _create2 = require("../lib/util/create");

var _create3 = _interopRequireDefault(_create2);

require("../lib/canvas");

require("../lib/anim");

require("../lib/str");

require("../lib/layout");

require("../lib/addon/tween");

require("../lib/loader/web");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _lib2.default;


_lib2.default.internal = {};

_lib2.default.internal.Image = _image2.default;
_lib2.default.Mouse = _mouse2.default;
_lib2.default.Math = _math2.default;
_lib2.default._extend = _extend3.default;
_lib2.default._create = _create3.default;
module.exports = exports.default;
