import { eventjs as event } from "./util/event";
import { Class as core_moduleObject } from "./core";
event(core_moduleObject.prototype, function(obj, name, on) {
  obj._flag(name, on);
});
