var _event = require("./util/event");

var _event2 = _interopRequireDefault(_event);

var _core = require("./core");

var _core2 = _interopRequireDefault(_core);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

(0, _event2.default)(_core2.default.prototype, function (obj, name, on) {
  obj._flag(name, on);
});
