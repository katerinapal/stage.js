import { anonymus } from "../lib/";
import { Image } from "../lib/image";
import { Mouse } from "../lib/addon/mouse";
import { anonymus } from "../lib/util/math";
import { createjs } from "../lib/util/create";
import "../lib/canvas";
import "../lib/anim";
import "../lib/str";
import "../lib/layout";
import "../lib/addon/tween";
import "../lib/loader/cordova";
var anonymusBinding = anonymus;
module.anonymusBinding = anonymus;

module.anonymusBinding.internal = {};

module.anonymusBinding.internal.Image = Image;
module.anonymusBinding.Mouse = Mouse;
module.anonymusBinding.Math = anonymus;
module.anonymusBinding._extend = require('../lib/util/extend');
module.anonymusBinding._create = createjs;