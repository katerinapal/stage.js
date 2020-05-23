import { is as is_isjs } from "./is";
var encapsulated_anonymus;

encapsulated_anonymus = function(map, key, value, multi) {
  var old = map[key];
  if (typeof old === 'undefined') {
    map[name] = value;
  } else if (typeof old === 'object') {
    if (multi || old !== value) {
      map[key] = [ value, old ];
    }
  } else if (is_isjs.array(old)) {
    if (multi || old.indexOf(old) < 0) {
      old.push(value);
    }
  }
};