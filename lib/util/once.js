Object.defineProperty(exports, "__esModule", {
  value: true
});
var exportedObject = function exportedObject(fn, ctx) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(ctx, arguments);
    }
  };
};

exports.oncejs = exportedObject;
;
