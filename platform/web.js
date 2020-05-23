import { indexjs as index_indexjsjs } from "../lib/";
import { Image as libimage_Imagejs } from "../lib/image";
import { Mouse as libaddonmouse_Mousejs } from "../lib/addon/mouse";
import { mathjs as libutilmath_mathjsjs } from "../lib/util/math";
import { extendjs as libutilextend_extendjsjs } from "../lib/util/extend";
import { createjs as libutilcreate_createjsjs } from "../lib/util/create";
import "../lib/canvas";
import "../lib/anim";
import "../lib/str";
import "../lib/layout";
import "../lib/addon/tween";
import "../lib/loader/web";
var webjs;
webjs = index_indexjsjs;

module.exports.internal = {};

module.exports.internal.Image = libimage_Imagejs;
module.exports.Mouse = libaddonmouse_Mousejs;
module.exports.Math = libutilmath_mathjsjs;
module.exports._extend = libutilextend_extendjsjs;
module.exports._create = libutilcreate_createjsjs;