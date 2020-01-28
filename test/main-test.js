var _expect = require("./util/expect");

var _sinon = require("sinon");

var _sinon2 = _interopRequireDefault(_sinon);

var _lib = require("../lib/");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

it('static methods', function () {
  (0, _expect.expect)(_lib.indexjs.config).be.a('function');
  (0, _expect.expect)(_lib.indexjs.preload).be.a('function');
  (0, _expect.expect)(_lib.indexjs.start).be.a('function');
  (0, _expect.expect)(_lib.indexjs.pause).be.a('function');
  (0, _expect.expect)(_lib.indexjs.resume).be.a('function');
  (0, _expect.expect)(_lib.indexjs.app).be.a('function');
  (0, _expect.expect)(_lib.indexjs.atlas).be.a('function');

  (0, _expect.expect)(_lib.indexjs.create).be.a('function');

  // expect(Stage.stage).be.a('function');
  // expect(Stage.image).be.a('function');
  // expect(Stage.anim).be.a('function');
  // expect(Stage.string).be.a('function');
  // expect(Stage.canvas).be.a('function');
});
