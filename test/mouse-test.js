var _expect = require("./util/expect");

var _sinon = require("sinon");

var _sinon2 = _interopRequireDefault(_sinon);

var _sandboxedModule = require("sandboxed-module");

var _sandboxedModule2 = _interopRequireDefault(_sandboxedModule);

var _memo = require("./util/memo");

var _lib = require("../lib/");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

it('Mouse', function () {
  var event, elem, elemOn, doc, docOn, win, winOn;

  var Mouse = _sandboxedModule2.default.require('../lib/addon/mouse', {
    locals: {
      document: doc = {
        addEventListener: docOn = _sinon2.default.stub()
      },
      window: win = {
        document: doc,
        addEventListener: winOn = _sinon2.default.stub()
      }
    }
  });

  var node = (0, _memo.memojs)(function (id) {
    return _lib.indexjs.create().label(id).pin({
      width: 400,
      height: 300
    });
  });
  var listener = (0, _memo.memojs)(function (id) {
    return _sinon2.default.spy();
  });
  var stage = node(1).append(node(11), node(12).append(node(121).hide(), node(122), node(123)), node(13));

  stage.viewport = function () {
    return {
      ratio: 1
    };
  };

  node(1).on(Mouse.CLICK, listener('click-' + 1));
  node(1).on(Mouse.START, listener('start-' + 1));
  node(1).on(Mouse.END, listener('end-' + 1));
  node(1).on(Mouse.MOVE, listener('move-' + 1));

  Mouse.subscribe(stage, elem = {
    addEventListener: elemOn = _sinon2.default.stub(),
    getBoundingClientRect: function getBoundingClientRect() {
      return {
        left: 0,
        top: 0
      };
    },
    clientLeft: 0,
    clientTop: 0
  });

  (0, _expect.expect)(elemOn.args.pluck(0)).list(['touchstart', 'touchend', 'touchmove', 'touchcancel', 'mousedown', 'mouseup', 'mousemove']);
  (0, _expect.expect)(elemOn.alwaysCalledOn(elem)).ok();

  var down = elemOn.args[0][1],
      up = elemOn.args[1][1],
      move;

  down.call(elem, event = Event('mousedown', 40, 30));
  (0, _expect.expect)(listener('start-' + 1).callCount).be(1);
  (0, _expect.expect)(listener('end-' + 1).callCount).be(0);
  (0, _expect.expect)(listener('click-' + 1).callCount).be(0);

  up.call(elem, event = Event('mouseup', 40, 30));
  (0, _expect.expect)(listener('start-' + 1).callCount).be(1);
  (0, _expect.expect)(listener('end-' + 1).callCount).be(1);
  (0, _expect.expect)(listener('click-' + 1).callCount).be(1);

  listener('start-' + 1).reset();
  listener('end-' + 1).reset();
  listener('click-' + 1).reset();

  down.call(elem, event = Event('mousedown', 40, 30));
  move = elemOn.lastCall.args[1];
  move.call(elem, event = Event('mousemove', 30, 20));
  up.call(elem, event = Event('mouseup'));
  (0, _expect.expect)(listener('start-' + 1).callCount).be(1);
  (0, _expect.expect)(listener('end-' + 1).callCount).be(1);
  (0, _expect.expect)(listener('click-' + 1).callCount).be(1);
  (0, _expect.expect)(listener('click-' + 1).callCount).be(1);
});

function Event(type, x, y) {
  return {
    pageX: x,
    pageY: y,
    type: type,
    preventDefault: _sinon2.default.stub()
  };
}
