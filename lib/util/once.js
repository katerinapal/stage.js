var exportedObject = function(fn, ctx) {
  var called = false;
  return function() {
    if (!called) {
      called = true;
      fn.apply(ctx, arguments);
    }
  };
};

export { exportedObject as oncejs };