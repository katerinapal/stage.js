var _event = require("./util/event");

var _core = require("./core");

(0, _event.eventjs)(_core.Class.prototype, function (obj, name, on) {
  obj._flag(name, on);
});
