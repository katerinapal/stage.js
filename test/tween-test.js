import { expect as utilexpect_expectjs } from "./util/expect";
import ext_sinon_sinon from "sinon";
import { indexjs as index_indexjsjs } from "../lib";

describe('Tween', function() {

  it('node.tween()', function() {
    var node = index_indexjsjs.create();
    var m = node.tween();
    utilexpect_expectjs(node._tweens[0]).be(m);
    utilexpect_expectjs(m._duration).be(400);
    utilexpect_expectjs(m._delay).be(0);

    var n = node.tween(500, 100);
    utilexpect_expectjs(node._tweens[0]).be(n);
    utilexpect_expectjs(n._duration).be(500);
    utilexpect_expectjs(n._delay).be(100);

    var o = node.tween(true);
    utilexpect_expectjs(node._tweens[0]).be(n);
    utilexpect_expectjs(node._tweens[1]).be(o);
  });

  it('tween.tween()', function() {
    var node = index_indexjsjs.create();
    var m = node.tween();

    var n = m.tween();
    utilexpect_expectjs(m._next).be(n);
    utilexpect_expectjs(n._duration).be(400);
    utilexpect_expectjs(n._delay).be(0);

    var n = m.tween(500, 100);
    utilexpect_expectjs(m._next).be(n);
    utilexpect_expectjs(n._duration).be(500);
    utilexpect_expectjs(n._delay).be(100);
  });

});