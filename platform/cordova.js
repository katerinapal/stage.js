import { indexjs } from "../lib/";
import { Image } from "../lib/image";
import { Mouse } from "../lib/addon/mouse";
import "../lib/canvas";
import "../lib/anim";
import "../lib/str";
import "../lib/layout";
import "../lib/addon/tween";
import "../lib/loader/cordova";
module.exports = indexjs;

module.exports.internal = {};

module.exports.internal.Image = Image;
module.exports.Mouse = Mouse;
module.exports.Math = mathjs;
module.exports._extend = extendjs;
module.exports._create = createjs;