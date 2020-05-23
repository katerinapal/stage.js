import { expect as utilexpect_expectjs } from "./util/expect";
import ext_sinon_sinon from "sinon";
import ext_sandboxedmodule_sandboxed from "sandboxed-module";
import { memojs as utilmemo_memojsjs } from "./util/memo";
import { indexjs as index_indexjsjs } from "../lib/";

it('Mouse', function() {
  var event, elem, elemOn, doc, docOn, win, winOn;

  var Mouse = ext_sandboxedmodule_sandboxed.require('../lib/addon/mouse', {
    locals : {
      document : doc = {
        addEventListener : docOn = ext_sinon_sinon.stub()
      },
      window : win = {
        document : doc,
        addEventListener : winOn = ext_sinon_sinon.stub()
      }
    }
  });

  var node = utilmemo_memojsjs(function(id) {
    return index_indexjsjs.create().label(id).pin({
      width : 400,
      height : 300
    });
  });
  var listener = utilmemo_memojsjs(function(id) {
    return ext_sinon_sinon.spy();
  });
  var stage = node(1).append(node(11),
      node(12).append(node(121).hide(), node(122), node(123)), node(13));

  stage.viewport = function() {
    return {
      ratio : 1
    };
  };

  node(1).on(Mouse.Mouse.CLICK, listener('click-' + 1));
  node(1).on(Mouse.Mouse.START, listener('start-' + 1));
  node(1).on(Mouse.Mouse.END, listener('end-' + 1));
  node(1).on(Mouse.Mouse.MOVE, listener('move-' + 1));

  Mouse.Mouse.subscribe(stage, elem = {
    addEventListener : elemOn = ext_sinon_sinon.stub(),
    getBoundingClientRect : function() {
      return {
        left : 0,
        top : 0
      };
    },
    clientLeft : 0,
    clientTop : 0
  });

  utilexpect_expectjs(elemOn.args.pluck(0)).list(
      [ 'touchstart', 'touchend', 'touchmove', 'touchcancel', 'mousedown',
          'mouseup', 'mousemove' ]);
  utilexpect_expectjs(elemOn.alwaysCalledOn(elem)).ok();

  var down = elemOn.args[0][1], up = elemOn.args[1][1], move;

  down.call(elem, event = Event('mousedown', 40, 30));
  utilexpect_expectjs(listener('start-' + 1).callCount).be(1);
  utilexpect_expectjs(listener('end-' + 1).callCount).be(0);
  utilexpect_expectjs(listener('click-' + 1).callCount).be(0);

  up.call(elem, event = Event('mouseup', 40, 30));
  utilexpect_expectjs(listener('start-' + 1).callCount).be(1);
  utilexpect_expectjs(listener('end-' + 1).callCount).be(1);
  utilexpect_expectjs(listener('click-' + 1).callCount).be(1);

  listener('start-' + 1).reset();
  listener('end-' + 1).reset();
  listener('click-' + 1).reset();

  down.call(elem, event = Event('mousedown', 40, 30));
  move = elemOn.lastCall.args[1];
  move.call(elem, event = Event('mousemove', 30, 20));
  up.call(elem, event = Event('mouseup'));
  utilexpect_expectjs(listener('start-' + 1).callCount).be(1);
  utilexpect_expectjs(listener('end-' + 1).callCount).be(1);
  utilexpect_expectjs(listener('click-' + 1).callCount).be(1);
  utilexpect_expectjs(listener('click-' + 1).callCount).be(1);
});

function Event(type, x, y) {
  return {
    pageX : x,
    pageY : y,
    type : type,
    preventDefault : ext_sinon_sinon.stub()
  };
}
