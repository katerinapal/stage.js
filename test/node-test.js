var _expect = require("./util/expect");

var _sinon = require("sinon");

var _sinon2 = _interopRequireDefault(_sinon);

var _memo = require("./util/memo");

var _tree = require("../lib/tree");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

it('label', function () {
  var foo = _tree.Class.create();
  (0, _expect.expect)(foo.label('label')).be(foo);
  (0, _expect.expect)(foo.label()).be('label');
});

it('attr', function () {
  var foo = _tree.Class.create();
  (0, _expect.expect)(foo.attr('name')).not.ok();
  (0, _expect.expect)(foo.attr('string', 'Name')).equal(foo);
  (0, _expect.expect)(foo.attr('number', 9876543210)).equal(foo);
  (0, _expect.expect)(foo.attr('string')).equal('Name');
  (0, _expect.expect)(foo.attr('number')).equal(9876543210);
});

it('append', function () {
  var foo = _tree.Class.create(),
      bar = _tree.Class.create(),
      baz = _tree.Class.create();
  foo.append(bar);
  (0, _expect.expect)(foo.first()).be(bar);
  (0, _expect.expect)(foo.last()).be(bar);
  foo.append(baz);
  (0, _expect.expect)(foo.first()).be(bar);
  (0, _expect.expect)(foo.last()).be(baz);

  var foo = _tree.Class.create(),
      bar = _tree.Class.create(),
      baz = _tree.Class.create();
  foo.append([bar, baz]);
  (0, _expect.expect)(foo.first()).be(bar);
  (0, _expect.expect)(foo.last()).be(baz);
});

it('prepend', function () {
  var foo = _tree.Class.create(),
      bar = _tree.Class.create(),
      baz = _tree.Class.create();
  foo.prepend(bar);
  (0, _expect.expect)(foo.first()).be(bar);
  (0, _expect.expect)(foo.last()).be(bar);
  foo.prepend(baz);
  (0, _expect.expect)(foo.first()).be(baz);
  (0, _expect.expect)(foo.last()).be(bar);

  var foo = _tree.Class.create(),
      bar = _tree.Class.create(),
      baz = _tree.Class.create();
  foo.prepend([bar, baz]);
  (0, _expect.expect)(foo.first()).be(bar);
  (0, _expect.expect)(foo.last()).be(baz);
});

it('appendTo', function () {
  var foo = _tree.Class.create(),
      bar = _tree.Class.create(),
      baz = _tree.Class.create();
  bar.appendTo(foo);
  (0, _expect.expect)(foo.first()).be(bar);
  (0, _expect.expect)(foo.last()).be(bar);
  baz.appendTo(foo);
  (0, _expect.expect)(foo.first()).be(bar);
  (0, _expect.expect)(foo.last()).be(baz);
});

it('prependTo', function () {
  var foo = _tree.Class.create(),
      bar = _tree.Class.create(),
      baz = _tree.Class.create();
  bar.prependTo(foo);
  (0, _expect.expect)(foo.first()).be(bar);
  (0, _expect.expect)(foo.last()).be(bar);
  baz.prependTo(foo);
  (0, _expect.expect)(foo.first()).be(baz);
  (0, _expect.expect)(foo.last()).be(bar);
});

it('insertAfter', function () {
  var foo = _tree.Class.create(),
      bar = _tree.Class.create(),
      baz = _tree.Class.create();
  bar.prependTo(foo);
  baz.insertAfter(bar);
  (0, _expect.expect)(foo.first()).be(bar);
  (0, _expect.expect)(foo.last()).be(baz);
});

it('insertBefore', function () {
  var foo = _tree.Class.create(),
      bar = _tree.Class.create(),
      baz = _tree.Class.create();
  bar.prependTo(foo);
  baz.insertBefore(bar);
  (0, _expect.expect)(foo.first()).be(baz);
  (0, _expect.expect)(foo.last()).be(bar);
});

it('insertNext', function () {
  var foo = _tree.Class.create(),
      bar = _tree.Class.create(),
      baz = _tree.Class.create();
  bar.prependTo(foo);
  bar.insertNext(baz);
  (0, _expect.expect)(foo.first()).be(bar);
  (0, _expect.expect)(foo.last()).be(baz);
});

it('insertPrev', function () {
  var foo = _tree.Class.create(),
      bar = _tree.Class.create(),
      baz = _tree.Class.create();
  bar.prependTo(foo);
  bar.insertPrev(baz);
  (0, _expect.expect)(foo.first()).be(baz);
  (0, _expect.expect)(foo.last()).be(bar);
});

it('visit', function () {
  var node = (0, _memo.memojs)(function (id) {
    return _tree.Class.create().label(id);
  });
  var visitor, data;
  var stage = node(1).append(node(11), node(12).append(node(121).hide(), node(122), node(123)), node(13));

  stage.visit(visitor = {
    start: _sinon2.default.stub(),
    end: _sinon2.default.stub()
  }, data = {});
  (0, _expect.expect)(visitor.start.args.pluck(0)).list(node([1, 11, 12, 121, 122, 123, 13]), 'id');
  (0, _expect.expect)(visitor.start.alwaysCalledWithMatch(_sinon2.default.match.object, data)).ok();
  (0, _expect.expect)(visitor.start.alwaysCalledOn(visitor)).ok();

  stage.visit(visitor = {
    visible: true,
    start: _sinon2.default.stub(),
    end: _sinon2.default.stub()
  }, data = {});
  (0, _expect.expect)(visitor.start.args.pluck(0)).list(node([1, 11, 12, 122, 123, 13]), 'id');
  (0, _expect.expect)(visitor.start.alwaysCalledWithMatch(_sinon2.default.match.object, data)).ok();
  (0, _expect.expect)(visitor.start.alwaysCalledOn(visitor)).ok();

  stage.visit(visitor = {
    reverse: true,
    start: _sinon2.default.stub(),
    end: _sinon2.default.stub()
  }, data = {});
  (0, _expect.expect)(visitor.start.args.pluck(0)).list(node([1, 13, 12, 123, 122, 121, 11]), 'id');
  (0, _expect.expect)(visitor.start.alwaysCalledWithMatch(_sinon2.default.match.object, data)).ok();
  (0, _expect.expect)(visitor.start.alwaysCalledOn(visitor)).ok();
});
