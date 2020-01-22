var _expect = require("./util/expect");

var expect = _interopRequireWildcard(_expect);

var _sinon = require("sinon");

var _sinon2 = _interopRequireDefault(_sinon);

var _lib = require("../lib");

var Stage = _interopRequireWildcard(_lib);

var _tween = require("../lib/addon/tween");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

describe('Tween', function () {

  it('node.tween()', function () {
    var node = Stage.create();
    var m = node.tween();
    expect.expect(node._tweens[0]).be(m);
    expect.expect(m._duration).be(400);
    expect.expect(m._delay).be(0);

    var n = node.tween(500, 100);
    expect.expect(node._tweens[0]).be(n);
    expect.expect(n._duration).be(500);
    expect.expect(n._delay).be(100);

    var o = node.tween(true);
    expect.expect(node._tweens[0]).be(n);
    expect.expect(node._tweens[1]).be(o);
  });

  it('tween.tween()', function () {
    var node = Stage.create();
    var m = node.tween();

    var n = m.tween();
    expect.expect(m._next).be(n);
    expect.expect(n._duration).be(400);
    expect.expect(n._delay).be(0);

    var n = m.tween(500, 100);
    expect.expect(m._next).be(n);
    expect.expect(n._duration).be(500);
    expect.expect(n._delay).be(100);
  });
});
