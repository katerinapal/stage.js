var _expect = require("./util/expect");

var expect = _interopRequireWildcard(_expect);

var _sinon = require("sinon");

var _sinon2 = _interopRequireDefault(_sinon);

var _tree = require("../lib/tree");

var _pin = require("../lib/pin");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

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

describe('Pin', function () {

  it('.set()/.get()', function () {
    var pin = {},
        set = {
      alpha: 0.8,
      width: 200,
      height: 300,
      scaleX: 2,
      scaleY: 3
    };
    for (var key in set) {
      _pin.Pin.prototype.set.call(pin, key, set[key]);
    }
    for (var key in set) {
      expect.expect(pin['_' + key]).be(set[key]);
      expect.expect(_pin.Pin.prototype.get.call(pin, key)).be(set[key]);
    }
  });

  it('.pin()', function () {
    var foo = _tree.Class.create();
    var pin = foo.pin();
    foo.pin('scale', 2);
    expect.expect(foo.pin('scaleX')).be(2);
    expect.expect(foo.pin('scaleY')).be(2);
    foo.pin({
      width: 200,
      height: 300
    });
    expect.expect(foo.pin('width')).be(200);
    expect.expect(foo.pin('height')).be(300);
  });

  it('.scaleTo()', function () {
    var node = _tree.Class.create();
    var pin = node.pin();
    node.pin({
      width: 100,
      height: 100
    });
    node.scaleTo(200, 300);
    expect.expect(node.pin('scaleX')).be(2);
    expect.expect(node.pin('scaleY')).be(3);
    expect.expect(node.pin('width')).be(100);
    expect.expect(node.pin('height')).be(100);

    node.scaleTo(200, 300, 'in');
    expect.expect(node.pin('scaleX')).be(2);
    expect.expect(node.pin('scaleY')).be(2);
    expect.expect(node.pin('width')).be(100);
    expect.expect(node.pin('height')).be(100);

    node.scaleTo(200, 300, 'out');
    expect.expect(node.pin('scaleX')).be(3);
    expect.expect(node.pin('scaleY')).be(3);
    expect.expect(node.pin('width')).be(100);
    expect.expect(node.pin('height')).be(100);

    node.scaleTo(200, 400, 'out-crop');
    expect.expect(node.pin('scaleX')).be(4);
    expect.expect(node.pin('scaleY')).be(4);
    expect.expect(node.pin('width')).be(50);
    expect.expect(node.pin('height')).be(100);

    node.scaleTo(200, 400, 'in-pad');
    expect.expect(node.pin('scaleX')).be(2);
    expect.expect(node.pin('scaleY')).be(2);
    expect.expect(node.pin('width')).be(100);
    expect.expect(node.pin('height')).be(200);
  });
});
