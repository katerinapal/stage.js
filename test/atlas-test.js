var _expect = require("./util/expect");

var _sandboxedModule = require("sandboxed-module");

var _sandboxedModule2 = _interopRequireDefault(_sandboxedModule);

var _sinon = require("sinon");

var _sinon2 = _interopRequireDefault(_sinon);

var _tree = require("../lib/tree");

var _texture = require("../lib/texture");

var _atlas = require("../lib/atlas");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var _mario = {
  x: 1,
  y: 2,
  width: 3,
  height: 4
};

function bemario(obj) {

  (0, _expect.expect)(obj.draw).be.a('function');

  (0, _expect.expect)(obj.width).be(_mario.width);
  (0, _expect.expect)(obj.height).be(_mario.height);

  (0, _expect.expect)(obj._sx).be(_mario.x);
  (0, _expect.expect)(obj._sy).be(_mario.y);
  (0, _expect.expect)(obj._sw).be(_mario.width);
  (0, _expect.expect)(obj._sh).be(_mario.height);

  (0, _expect.expect)(obj._dx).be(0);
  (0, _expect.expect)(obj._dy).be(0);
  (0, _expect.expect)(obj._dw).be(_mario.width);
  (0, _expect.expect)(obj._dh).be(_mario.height);
}

it('Atlas', function () {
  var selected;

  selected = new _atlas.Atlas({
    textures: {
      mario: _mario
    }
  }).select('mario').one();
  bemario(selected);

  selected = new _atlas.Atlas({
    textures: {
      mario: function mario() {
        return _mario;
      }
    }
  }).select('mario').one();
  bemario(selected);

  selected = new _atlas.Atlas({
    textures: {
      mario: _mario,
      him: 'mario'
    }
  }).select('mario').one();
  bemario(selected);

  selected = new _atlas.Atlas({
    textures: {
      mario: _mario,
      him: function him() {
        return 'mario';
      }
    }
  }).select('mario').one();
  bemario(selected);

  selected = new _atlas.Atlas({
    textures: {
      char: {
        mario: _mario
      }
    }
  }).select('char').one('mario');
  bemario(selected);

  selected = new _atlas.Atlas({
    textures: {
      mario: _mario,
      char: {
        mario: 'mario'
      }
    }
  }).select('char').one('mario');
  bemario(selected);

  selected = new _atlas.Atlas({
    textures: {
      walk: [_mario, _mario, _mario]
    }
  }).select('walk').array();
  (0, _expect.expect)(selected.length).be(3);
  bemario(selected[0]);

  selected = new _atlas.Atlas({
    textures: {
      mario: _mario,
      walk: ['mario', 'mario', 'mario']
    }
  }).select('walk').array();
  (0, _expect.expect)(selected.length).be(3);
  bemario(selected[0]);
});

describe('Stage.texture()', function () {
  it('atlas.textures', function () {
    var Stage = _sandboxedModule2.default.require('../lib/');

    Stage.atlas({
      name: 'name',
      textures: {
        'mario': _mario,
        'walk': ['mario', 'mario', 'mario']
      }
    });

    var obj, selected;

    selected = Stage.texture('name:mario').one();
    bemario(selected);

    selected = Stage.texture('mario').one();
    bemario(selected);

    selected = Stage.texture('walk').one();
    bemario(selected);

    selected = Stage.texture('mario').array(obj = []);
    (0, _expect.expect)(selected).be(obj);
    (0, _expect.expect)(selected.length).be(1);
    bemario(selected[0]);

    selected = Stage.texture('walk').array(obj = []);
    (0, _expect.expect)(selected).be(obj);
    (0, _expect.expect)(selected.length).be(3);
    bemario(selected[0]);
  });

  it('atlas.cutouts', function () {
    var Stage = _sandboxedModule2.default.require('../lib/');

    Stage.atlas({
      name: "main",
      // imagePath : "main.png",
      // imageRatio : 4,
      trim: 0.1,
      cutouts: [{
        name: "color_dark",
        x: 0,
        y: 0,
        width: 16,
        height: 16
      }, {
        name: "color_light",
        x: 16,
        y: 16,
        width: 16,
        height: 16
      }]
    });

    var dark = Stage.texture("main:color_dark").one();
    var both = Stage.texture("main:color_").array();

    (0, _expect.expect)(dark).be.an('object');
    (0, _expect.expect)(both).be.an('array');
    (0, _expect.expect)(both.length).be(2);
    (0, _expect.expect)(both[0]).be.an('object');
    (0, _expect.expect)(both[1]).be.an('object');
  });
});
