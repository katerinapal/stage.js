var _expect = require("./util/expect");

var _sinon = require("sinon");

var _sinon2 = _interopRequireDefault(_sinon);

var _lib = require("../lib");

var Stage = _interopRequireWildcard(_lib);

var _tween = require("../lib/addon/tween");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Tween', function () {

  it('node.tween()', function () {
    var node = Stage.create();
    var m = node.tween();
    (0, _expect.expect)(node._tweens[0]).be(m);
    (0, _expect.expect)(m._duration).be(400);
    (0, _expect.expect)(m._delay).be(0);

    var n = node.tween(500, 100);
    (0, _expect.expect)(node._tweens[0]).be(n);
    (0, _expect.expect)(n._duration).be(500);
    (0, _expect.expect)(n._delay).be(100);

    var o = node.tween(true);
    (0, _expect.expect)(node._tweens[0]).be(n);
    (0, _expect.expect)(node._tweens[1]).be(o);
  });

  it('tween.tween()', function () {
    var node = Stage.create();
    var m = node.tween();

    var n = m.tween();
    (0, _expect.expect)(m._next).be(n);
    (0, _expect.expect)(n._duration).be(400);
    (0, _expect.expect)(n._delay).be(0);

    var n = m.tween(500, 100);
    (0, _expect.expect)(m._next).be(n);
    (0, _expect.expect)(n._duration).be(500);
    (0, _expect.expect)(n._delay).be(100);
  });
});
