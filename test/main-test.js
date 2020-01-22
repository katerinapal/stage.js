var _expect = require("./util/expect");

var _sinon = require("sinon");

var _sinon2 = _interopRequireDefault(_sinon);

var _lib = require("../lib/");

var Stage = _interopRequireWildcard(_lib);

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }newObj.default = obj;return newObj;
  }
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

it('static methods', function () {
  (0, _expect.expect)(Stage.config).be.a('function');
  (0, _expect.expect)(Stage.preload).be.a('function');
  (0, _expect.expect)(Stage.start).be.a('function');
  (0, _expect.expect)(Stage.pause).be.a('function');
  (0, _expect.expect)(Stage.resume).be.a('function');
  (0, _expect.expect)(Stage.app).be.a('function');
  (0, _expect.expect)(Stage.atlas).be.a('function');

  (0, _expect.expect)(Stage.create).be.a('function');

  // expect(Stage.stage).be.a('function');
  // expect(Stage.image).be.a('function');
  // expect(Stage.anim).be.a('function');
  // expect(Stage.string).be.a('function');
  // expect(Stage.canvas).be.a('function');
});
