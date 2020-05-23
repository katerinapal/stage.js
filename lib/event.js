import { eventjs as utilevent_eventjs } from "./util/event";
import { Class as core_Class } from "./core";
utilevent_eventjs(core_Class.prototype, function(obj, name, on) {
  obj._flag(name, on);
});
