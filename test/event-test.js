var _expect = require("./util/expect");

var expect = _interopRequireWildcard(_expect);

var _sinon = require("sinon");

var _sinon2 = _interopRequireDefault(_sinon);

var _tree = require("../lib/tree");

require("../lib/event");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

describe('Event', function () {

    it('on/off', function () {
        var hello = _sinon2.default.stub();
        var open = _sinon2.default.stub();

        var door = _tree.Class.create();

        expect.expect(door.listeners('knock')).not.ok();

        door.on('knock', hello);
        expect.expect(door.listeners('knock')).eql([hello]);

        door.on('knock', open);
        expect.expect(door.listeners('knock')).eql([hello, open]);

        door.off('knock', open);
        expect.expect(door.listeners('knock')).eql([hello]);

        door.off('knock', hello);
        expect.expect(door.listeners('knock')).not.ok();

        door.on('knock ring', open);
        expect.expect(door.listeners('knock')).eql([open]);
        expect.expect(door.listeners('ring')).eql([open]);

        door.off('knock ring', open);

        expect.expect(door.listeners('knock')).not.ok();
        expect.expect(door.listeners('ring')).not.ok();
    });

    it('flag', function () {
        var foo = _tree.Class.create();
        var bar = _tree.Class.create();
        var baz = _tree.Class.create();
        var qux = _tree.Class.create();

        var ring = _sinon2.default.stub();
        baz.on('ring', ring);
        expect.expect(baz._flag('ring')).equal(1);

        baz.off('ring', ring);
        expect.expect(baz._flag('ring')).equal(0);

        baz.on('knock', _sinon2.default.stub());
        expect.expect(baz._flag('knock')).equal(1);

        qux.on('knock', _sinon2.default.stub());
        qux.on('knock', _sinon2.default.stub());
        expect.expect(qux._flag('knock')).equal(2);

        bar.appendTo(foo);

        baz.appendTo(bar);
        qux.appendTo(bar);

        expect.expect(bar._flag('knock')).equal(2);
        expect.expect(foo._flag('knock')).equal(1);

        baz.remove();
        expect.expect(bar._flag('knock')).equal(1);
        expect.expect(foo._flag('knock')).equal(1);

        qux.remove();
        expect.expect(bar._flag('knock')).equal(0);
        expect.expect(foo._flag('knock')).equal(0);

        bar.remove();

        foo.append(bar, baz, qux);
        expect.expect(foo._flag('knock')).equal(2);

        foo.empty();
        expect.expect(foo._flag('knock')).equal(0);
    });
});
