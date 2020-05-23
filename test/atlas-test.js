import { expect as utilexpect_expectjs } from "./util/expect";
import ext_sandboxedmodule_sandboxed from "sandboxed-module";
import ext_sinon_sinon from "sinon";
import { Atlas as libatlas_Atlasjs } from "../lib/atlas";

var mario = {
  x : 1,
  y : 2,
  width : 3,
  height : 4
};

function bemario(obj) {

  utilexpect_expectjs(obj.draw).be.a('function');

  utilexpect_expectjs(obj.width).be(mario.width);
  utilexpect_expectjs(obj.height).be(mario.height);

  utilexpect_expectjs(obj._sx).be(mario.x);
  utilexpect_expectjs(obj._sy).be(mario.y);
  utilexpect_expectjs(obj._sw).be(mario.width);
  utilexpect_expectjs(obj._sh).be(mario.height);

  utilexpect_expectjs(obj._dx).be(0);
  utilexpect_expectjs(obj._dy).be(0);
  utilexpect_expectjs(obj._dw).be(mario.width);
  utilexpect_expectjs(obj._dh).be(mario.height);
}

it('Atlas', function() {
  var selected;

  selected = new libatlas_Atlasjs({
    textures : {
      mario : mario
    }
  }).select('mario').one();
  bemario(selected);

  selected = new libatlas_Atlasjs({
    textures : {
      mario : function() {
        return mario;
      }
    }
  }).select('mario').one();
  bemario(selected);

  selected = new libatlas_Atlasjs({
    textures : {
      mario : mario,
      him : 'mario'
    }
  }).select('mario').one();
  bemario(selected);

  selected = new libatlas_Atlasjs({
    textures : {
      mario : mario,
      him : function() {
        return 'mario';
      }
    }
  }).select('mario').one();
  bemario(selected);

  selected = new libatlas_Atlasjs({
    textures : {
      char : {
        mario : mario
      }
    }
  }).select('char').one('mario');
  bemario(selected);

  selected = new libatlas_Atlasjs({
    textures : {
      mario : mario,
      char : {
        mario : 'mario'
      }
    }
  }).select('char').one('mario');
  bemario(selected);

  selected = new libatlas_Atlasjs({
    textures : {
      walk : [ mario, mario, mario ]
    }
  }).select('walk').array();
  utilexpect_expectjs(selected.length).be(3);
  bemario(selected[0]);

  selected = new libatlas_Atlasjs({
    textures : {
      mario : mario,
      walk : [ 'mario', 'mario', 'mario' ]
    }
  }).select('walk').array();
  utilexpect_expectjs(selected.length).be(3);
  bemario(selected[0]);
});

describe('Stage.texture()', function() {
  it('atlas.textures', function() {
    var Stage = ext_sandboxedmodule_sandboxed.require('../lib/');

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
    utilexpect_expectjs(selected).be(obj);
    utilexpect_expectjs(selected.length).be(1);
    bemario(selected[0]);

    selected = Stage.indexjs.texture('walk').array(obj = []);
    utilexpect_expectjs(selected).be(obj);
    utilexpect_expectjs(selected.length).be(3);
    bemario(selected[0]);
  });

  it('atlas.cutouts', function() {
    var Stage = ext_sandboxedmodule_sandboxed.require('../lib/');

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

    utilexpect_expectjs(dark).be.an('object');
    utilexpect_expectjs(both).be.an('array');
    utilexpect_expectjs(both.length).be(2);
    utilexpect_expectjs(both[0]).be.an('object');
    utilexpect_expectjs(both[1]).be.an('object');
  });
});
