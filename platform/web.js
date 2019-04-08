import lib from "../lib/";
import Image from "../lib/image";
import Mouse from "../lib/addon/mouse";
import Math from "../lib/util/math";
import _extend from "../lib/util/extend";
import _create from "../lib/util/create";
import "../lib/canvas";
import "../lib/anim";
import "../lib/str";
import "../lib/layout";
import "../lib/addon/tween";
import "../lib/loader/web";
export default lib;

lib.internal = {};

lib.internal.Image = Image;
lib.Mouse = Mouse;
lib.Math = Math;
lib._extend = _extend;
lib._create = _create;