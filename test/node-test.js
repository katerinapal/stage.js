var _expect = require("./util/expect");

var expect = _interopRequireWildcard(_expect);

var _sinon = require("sinon");

var _sinon2 = _interopRequireDefault(_sinon);

var _memo = require("./util/memo");

var memo = _interopRequireWildcard(_memo);

var _tree = require("../lib/tree");

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

it('label', function () {
  var foo = _tree.Class.create();
  expect.expect(foo.label('label')).be(foo);
  expect.expect(foo.label()).be('label');
});

it('attr', function () {
  var foo = _tree.Class.create();
  expect.expect(foo.attr('name')).not.ok();
  expect.expect(foo.attr('string', 'Name')).equal(foo);
  expect.expect(foo.attr('number', 9876543210)).equal(foo);
  expect.expect(foo.attr('string')).equal('Name');
  expect.expect(foo.attr('number')).equal(9876543210);
});

it('append', function () {
  var foo = _tree.Class.create(),
      bar = _tree.Class.create(),
      baz = _tree.Class.create();
  foo.append(bar);
  expect.expect(foo.first()).be(bar);
  expect.expect(foo.last()).be(bar);
  foo.append(baz);
  expect.expect(foo.first()).be(bar);
  expect.expect(foo.last()).be(baz);

  var foo = _tree.Class.create(),
      bar = _tree.Class.create(),
      baz = _tree.Class.create();
  foo.append([bar, baz]);
  expect.expect(foo.first()).be(bar);
  expect.expect(foo.last()).be(baz);
});

it('prepend', function () {
  var foo = _tree.Class.create(),
      bar = _tree.Class.create(),
      baz = _tree.Class.create();
  foo.prepend(bar);
  expect.expect(foo.first()).be(bar);
  expect.expect(foo.last()).be(bar);
  foo.prepend(baz);
  expect.expect(foo.first()).be(baz);
  expect.expect(foo.last()).be(bar);

  var foo = _tree.Class.create(),
      bar = _tree.Class.create(),
      baz = _tree.Class.create();
  foo.prepend([bar, baz]);
  expect.expect(foo.first()).be(bar);
  expect.expect(foo.last()).be(baz);
});

it('appendTo', function () {
  var foo = _tree.Class.create(),
      bar = _tree.Class.create(),
      baz = _tree.Class.create();
  bar.appendTo(foo);
  expect.expect(foo.first()).be(bar);
  expect.expect(foo.last()).be(bar);
  baz.appendTo(foo);
  expect.expect(foo.first()).be(bar);
  expect.expect(foo.last()).be(baz);
});

it('prependTo', function () {
  var foo = _tree.Class.create(),
      bar = _tree.Class.create(),
      baz = _tree.Class.create();
  bar.prependTo(foo);
  expect.expect(foo.first()).be(bar);
  expect.expect(foo.last()).be(bar);
  baz.prependTo(foo);
  expect.expect(foo.first()).be(baz);
  expect.expect(foo.last()).be(bar);
});

it('insertAfter', function () {
  var foo = _tree.Class.create(),
      bar = _tree.Class.create(),
      baz = _tree.Class.create();
  bar.prependTo(foo);
  baz.insertAfter(bar);
  expect.expect(foo.first()).be(bar);
  expect.expect(foo.last()).be(baz);
});

it('insertBefore', function () {
  var foo = _tree.Class.create(),
      bar = _tree.Class.create(),
      baz = _tree.Class.create();
  bar.prependTo(foo);
  baz.insertBefore(bar);
  expect.expect(foo.first()).be(baz);
  expect.expect(foo.last()).be(bar);
});

it('insertNext', function () {
  var foo = _tree.Class.create(),
      bar = _tree.Class.create(),
      baz = _tree.Class.create();
  bar.prependTo(foo);
  bar.insertNext(baz);
  expect.expect(foo.first()).be(bar);
  expect.expect(foo.last()).be(baz);
});

it('insertPrev', function () {
  var foo = _tree.Class.create(),
      bar = _tree.Class.create(),
      baz = _tree.Class.create();
  bar.prependTo(foo);
  bar.insertPrev(baz);
  expect.expect(foo.first()).be(baz);
  expect.expect(foo.last()).be(bar);
});

it('visit', function () {
  var node = memo.memo(function (id) {
    return _tree.Class.create().label(id);
  });
  var visitor, data;
  var stage = node(1).append(node(11), node(12).append(node(121).hide(), node(122), node(123)), node(13));

  stage.visit(visitor = {
    start: _sinon2.default.stub(),
    end: _sinon2.default.stub()
  }, data = {});
  expect.expect(visitor.start.args.pluck(0)).list(node([1, 11, 12, 121, 122, 123, 13]), 'id');
  expect.expect(visitor.start.alwaysCalledWithMatch(_sinon2.default.match.object, data)).ok();
  expect.expect(visitor.start.alwaysCalledOn(visitor)).ok();

  stage.visit(visitor = {
    visible: true,
    start: _sinon2.default.stub(),
    end: _sinon2.default.stub()
  }, data = {});
  expect.expect(visitor.start.args.pluck(0)).list(node([1, 11, 12, 122, 123, 13]), 'id');
  expect.expect(visitor.start.alwaysCalledWithMatch(_sinon2.default.match.object, data)).ok();
  expect.expect(visitor.start.alwaysCalledOn(visitor)).ok();

  stage.visit(visitor = {
    reverse: true,
    start: _sinon2.default.stub(),
    end: _sinon2.default.stub()
  }, data = {});
  expect.expect(visitor.start.args.pluck(0)).list(node([1, 13, 12, 123, 122, 121, 11]), 'id');
  expect.expect(visitor.start.alwaysCalledWithMatch(_sinon2.default.match.object, data)).ok();
  expect.expect(visitor.start.alwaysCalledOn(visitor)).ok();
});
