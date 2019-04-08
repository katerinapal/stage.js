Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (fn, ctx) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(ctx, arguments);
    }
  };
};

;;
module.exports = exports.default;
