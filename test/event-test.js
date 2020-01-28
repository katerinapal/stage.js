var _expect = require("./util/expect");

var _sinon = require("sinon");

var _sinon2 = _interopRequireDefault(_sinon);

var _tree = require("../lib/tree");

require("../lib/event");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Event', function () {

    it('on/off', function () {
        var hello = _sinon2.default.stub();
        var open = _sinon2.default.stub();

        var door = _tree.Class.create();

        (0, _expect.expect)(door.listeners('knock')).not.ok();

        door.on('knock', hello);
        (0, _expect.expect)(door.listeners('knock')).eql([hello]);

        door.on('knock', open);
        (0, _expect.expect)(door.listeners('knock')).eql([hello, open]);

        door.off('knock', open);
        (0, _expect.expect)(door.listeners('knock')).eql([hello]);

        door.off('knock', hello);
        (0, _expect.expect)(door.listeners('knock')).not.ok();

        door.on('knock ring', open);
        (0, _expect.expect)(door.listeners('knock')).eql([open]);
        (0, _expect.expect)(door.listeners('ring')).eql([open]);

        door.off('knock ring', open);

        (0, _expect.expect)(door.listeners('knock')).not.ok();
        (0, _expect.expect)(door.listeners('ring')).not.ok();
    });

    it('flag', function () {
        var foo = _tree.Class.create();
        var bar = _tree.Class.create();
        var baz = _tree.Class.create();
        var qux = _tree.Class.create();

        var ring = _sinon2.default.stub();
        baz.on('ring', ring);
        (0, _expect.expect)(baz._flag('ring')).equal(1);

        baz.off('ring', ring);
        (0, _expect.expect)(baz._flag('ring')).equal(0);

        baz.on('knock', _sinon2.default.stub());
        (0, _expect.expect)(baz._flag('knock')).equal(1);

        qux.on('knock', _sinon2.default.stub());
        qux.on('knock', _sinon2.default.stub());
        (0, _expect.expect)(qux._flag('knock')).equal(2);

        bar.appendTo(foo);

        baz.appendTo(bar);
        qux.appendTo(bar);

        (0, _expect.expect)(bar._flag('knock')).equal(2);
        (0, _expect.expect)(foo._flag('knock')).equal(1);

        baz.remove();
        (0, _expect.expect)(bar._flag('knock')).equal(1);
        (0, _expect.expect)(foo._flag('knock')).equal(1);

        qux.remove();
        (0, _expect.expect)(bar._flag('knock')).equal(0);
        (0, _expect.expect)(foo._flag('knock')).equal(0);

        bar.remove();

        foo.append(bar, baz, qux);
        (0, _expect.expect)(foo._flag('knock')).equal(2);

        foo.empty();
        (0, _expect.expect)(foo._flag('knock')).equal(0);
    });
});
