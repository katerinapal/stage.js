Object.defineProperty(exports, "__esModule", {
  value: true
});
var exportedObject;
if (typeof performance !== 'undefined' && performance.now) {
  exportedObject = function exportedObject() {
    return performance.now();
  };
} else if (Date.now) {
  exportedObject = function exportedObject() {
    return Date.now();
  };
} else {
  exportedObject = function exportedObject() {
    return new Date().getTime();
  };
}
exports.default = exportedObject;
module.exports = exports.default;
