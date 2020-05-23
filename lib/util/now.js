if (typeof performance !== 'undefined' && performance.now) {
  var encapsulated_anonymus;
  encapsulated_anonymus = function() {
    return performance.now();
  };
} else if (Date.now) {
  var encapsulated_anonymus;
  encapsulated_anonymus = function() {
    return Date.now();
  };
} else {
  var encapsulated_anonymus;
  encapsulated_anonymus = function() {
    return new Date().getTime();
  };
}
