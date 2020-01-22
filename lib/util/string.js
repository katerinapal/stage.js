Object.defineProperty(exports, "__esModule", {
  value: true
});
var startsWith = function startsWith(str, sub) {
  return typeof str === 'string' && typeof sub === 'string' && str.substring(0, sub.length) == sub;
};

exports.startsWith = startsWith;
;
