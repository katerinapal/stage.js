import { expect as utilexpect_expectjs } from "./util/expect";
import ext_sinon_sinon from "sinon";
import { Class as libtree_Classjs } from "../lib/tree";
import { Pin as libpin_Pinjs } from "../lib/pin";

describe('Pin', function() {

  it('.set()/.get()', function() {
    var pin = {}, set = {
      alpha : 0.8,
      width : 200,
      height : 300,
      scaleX : 2,
      scaleY : 3,
    };
    for ( var key in set) {
      libpin_Pinjs.prototype.set.call(pin, key, set[key]);
    }
    for ( var key in set) {
      utilexpect_expectjs(pin['_' + key]).be(set[key]);
      utilexpect_expectjs(libpin_Pinjs.prototype.get.call(pin, key)).be(set[key]);
    }
  });

  it('.pin()', function() {
    var foo = libtree_Classjs.create();
    var pin = foo.pin();
    foo.pin('scale', 2);
    utilexpect_expectjs(foo.pin('scaleX')).be(2);
    utilexpect_expectjs(foo.pin('scaleY')).be(2);
    foo.pin({
      width : 200,
      height : 300
    });
    utilexpect_expectjs(foo.pin('width')).be(200);
    utilexpect_expectjs(foo.pin('height')).be(300);
  });

  it('.scaleTo()', function() {
    var node = libtree_Classjs.create();
    var pin = node.pin();
    node.pin({
      width : 100,
      height : 100
    });
    node.scaleTo(200, 300);
    utilexpect_expectjs(node.pin('scaleX')).be(2);
    utilexpect_expectjs(node.pin('scaleY')).be(3);
    utilexpect_expectjs(node.pin('width')).be(100);
    utilexpect_expectjs(node.pin('height')).be(100);

    node.scaleTo(200, 300, 'in');
    utilexpect_expectjs(node.pin('scaleX')).be(2);
    utilexpect_expectjs(node.pin('scaleY')).be(2);
    utilexpect_expectjs(node.pin('width')).be(100);
    utilexpect_expectjs(node.pin('height')).be(100);

    node.scaleTo(200, 300, 'out');
    utilexpect_expectjs(node.pin('scaleX')).be(3);
    utilexpect_expectjs(node.pin('scaleY')).be(3);
    utilexpect_expectjs(node.pin('width')).be(100);
    utilexpect_expectjs(node.pin('height')).be(100);

    node.scaleTo(200, 400, 'out-crop');
    utilexpect_expectjs(node.pin('scaleX')).be(4);
    utilexpect_expectjs(node.pin('scaleY')).be(4);
    utilexpect_expectjs(node.pin('width')).be(50);
    utilexpect_expectjs(node.pin('height')).be(100);

    node.scaleTo(200, 400, 'in-pad');
    utilexpect_expectjs(node.pin('scaleX')).be(2);
    utilexpect_expectjs(node.pin('scaleY')).be(2);
    utilexpect_expectjs(node.pin('width')).be(100);
    utilexpect_expectjs(node.pin('height')).be(200);
  });

});