var exportedObject;
if (typeof performance !== 'undefined' && performance.now) {
  exportedObject = function() {
    return performance.now();
  };
} else if (Date.now) {
  exportedObject = function() {
    return Date.now();
  };
} else {
  exportedObject = function() {
    return new Date().getTime();
  };
}
export default exportedObject;
