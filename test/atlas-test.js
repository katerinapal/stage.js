import { expect } from "./util/expect";
import sandboxed from "sandboxed-module";
import sinon from "sinon";
import { Class as Stage } from "../lib/tree";
import { Texture } from "../lib/texture";
import { Atlas } from "../lib/atlas";

var mario = {
  x : 1,
  y : 2,
  width : 3,
  height : 4
};

function bemario(obj) {

  expect.expect(obj.draw).be.a('function');

  expect.expect(obj.width).be(mario.width);
  expect.expect(obj.height).be(mario.height);

  expect.expect(obj._sx).be(mario.x);
  expect.expect(obj._sy).be(mario.y);
  expect.expect(obj._sw).be(mario.width);
  expect.expect(obj._sh).be(mario.height);

  expect.expect(obj._dx).be(0);
  expect.expect(obj._dy).be(0);
  expect.expect(obj._dw).be(mario.width);
  expect.expect(obj._dh).be(mario.height);
}

it('Atlas', function() {
  var selected;

  selected = new Atlas({
    textures : {
      mario : mario
    }
  }).select('mario').one();
  bemario(selected);

  selected = new Atlas({
    textures : {
      mario : function() {
        return mario;
      }
    }
  }).select('mario').one();
  bemario(selected);

  selected = new Atlas({
    textures : {
      mario : mario,
      him : 'mario'
    }
  }).select('mario').one();
  bemario(selected);

  selected = new Atlas({
    textures : {
      mario : mario,
      him : function() {
        return 'mario';
      }
    }
  }).select('mario').one();
  bemario(selected);

  selected = new Atlas({
    textures : {
      char : {
        mario : mario
      }
    }
  }).select('char').one('mario');
  bemario(selected);

  selected = new Atlas({
    textures : {
      mario : mario,
      char : {
        mario : 'mario'
      }
    }
  }).select('char').one('mario');
  bemario(selected);

  selected = new Atlas({
    textures : {
      walk : [ mario, mario, mario ]
    }
  }).select('walk').array();
  expect.expect(selected.length).be(3);
  bemario(selected[0]);

  selected = new Atlas({
    textures : {
      mario : mario,
      walk : [ 'mario', 'mario', 'mario' ]
    }
  }).select('walk').array();
  expect.expect(selected.length).be(3);
  bemario(selected[0]);
});

describe('Stage.texture()', function() {
  it('atlas.textures', function() {
    var Stage = sandboxed.require('../lib/');

    Stage.indexjs.atlas({
      name : 'name',
      textures : {
        'mario' : mario,
        'walk' : [ 'mario', 'mario', 'mario' ]
      }
    });

    var obj, selected;

    selected = Stage.indexjs.texture('name:mario').one();
    bemario(selected);

    selected = Stage.indexjs.texture('mario').one();
    bemario(selected);

    selected = Stage.indexjs.texture('walk').one();
    bemario(selected);

    selected = Stage.indexjs.texture('mario').array(obj = []);
    expect.expect(selected).be(obj);
    expect.expect(selected.length).be(1);
    bemario(selected[0]);

    selected = Stage.indexjs.texture('walk').array(obj = []);
    expect.expect(selected).be(obj);
    expect.expect(selected.length).be(3);
    bemario(selected[0]);
  });

  it('atlas.cutouts', function() {
    var Stage = sandboxed.require('../lib/');

    Stage.indexjs.atlas({
      name : "main",
      // imagePath : "main.png",
      // imageRatio : 4,
      trim : 0.1,
      cutouts : [ {
        name : "color_dark",
        x : 0,
        y : 0,
        width : 16,
        height : 16
      }, {
        name : "color_light",
        x : 16,
        y : 16,
        width : 16,
        height : 16
      } ]
    });

    var dark = Stage.indexjs.texture("main:color_dark").one();
    var both = Stage.indexjs.texture("main:color_").array();

    expect.expect(dark).be.an('object');
    expect.expect(both).be.an('array');
    expect.expect(both.length).be(2);
    expect.expect(both[0]).be.an('object');
    expect.expect(both[1]).be.an('object');
  });
});
