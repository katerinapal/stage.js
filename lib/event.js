import { eventjs } from "./util/event";
import { Class as core_moduleObject } from "./core";
eventjs(core_moduleObject.prototype, function(obj, name, on) {
  obj._flag(name, on);
});
