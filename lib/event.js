import utilevent_moduleDefault from "./util/event";
import core_moduleObject from "./core";
utilevent_moduleDefault(core_moduleObject.prototype, function(obj, name, on) {
  obj._flag(name, on);
});
