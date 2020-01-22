import * as expect from "./util/expect";
import sinon from "sinon";
import * as Stage from "../lib";
import { Tween } from "../lib/addon/tween";

describe('Tween', function() {

  it('node.tween()', function() {
    var node = Stage.create();
    var m = node.tween();
    expect.expect(node._tweens[0]).be(m);
    expect.expect(m._duration).be(400);
    expect.expect(m._delay).be(0);

    var n = node.tween(500, 100);
    expect.expect(node._tweens[0]).be(n);
    expect.expect(n._duration).be(500);
    expect.expect(n._delay).be(100);

    var o = node.tween(true);
    expect.expect(node._tweens[0]).be(n);
    expect.expect(node._tweens[1]).be(o);
  });

  it('tween.tween()', function() {
    var node = Stage.create();
    var m = node.tween();

    var n = m.tween();
    expect.expect(m._next).be(n);
    expect.expect(n._duration).be(400);
    expect.expect(n._delay).be(0);

    var n = m.tween(500, 100);
    expect.expect(m._next).be(n);
    expect.expect(n._duration).be(500);
    expect.expect(n._delay).be(100);
  });

});