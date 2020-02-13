Object.defineProperty(exports, "__esModule", {
  value: true
});
var exportedObject = function exportedObject(base) {
  for (var i = 1; i < arguments.length; i++) {
    var obj = arguments[i];
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        base[key] = obj[key];
      }
    }
  }
  return base;
};

exports.extendjs = exportedObject;
;
