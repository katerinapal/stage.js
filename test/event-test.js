import { expect as utilexpect_expectjs } from "./util/expect";
import ext_sinon_sinon from "sinon";
import { Class as libtree_Classjs } from "../lib/tree";
import "../lib/event";

describe('Event', function() {

  it('on/off', function() {
    var hello = ext_sinon_sinon.stub();
    var open = ext_sinon_sinon.stub();

    var door = libtree_Classjs.create();

    utilexpect_expectjs(door.listeners('knock')).not.ok();

    door.on('knock', hello);
    utilexpect_expectjs(door.listeners('knock')).eql([ hello ]);

    door.on('knock', open);
    utilexpect_expectjs(door.listeners('knock')).eql([ hello, open ]);

    door.off('knock', open);
    utilexpect_expectjs(door.listeners('knock')).eql([ hello ]);

    door.off('knock', hello);
    utilexpect_expectjs(door.listeners('knock')).not.ok();

    door.on('knock ring', open);
    utilexpect_expectjs(door.listeners('knock')).eql([ open ]);
    utilexpect_expectjs(door.listeners('ring')).eql([ open ]);

    door.off('knock ring', open);

    utilexpect_expectjs(door.listeners('knock')).not.ok();
    utilexpect_expectjs(door.listeners('ring')).not.ok();
  });

  it('flag', function() {
    var foo = libtree_Classjs.create();
    var bar = libtree_Classjs.create();
    var baz = libtree_Classjs.create();
    var qux = libtree_Classjs.create();

    var ring = ext_sinon_sinon.stub();
    baz.on('ring', ring);
    utilexpect_expectjs(baz._flag('ring')).equal(1);

    baz.off('ring', ring);
    utilexpect_expectjs(baz._flag('ring')).equal(0);

    baz.on('knock', ext_sinon_sinon.stub());
    utilexpect_expectjs(baz._flag('knock')).equal(1);

    qux.on('knock', ext_sinon_sinon.stub());
    qux.on('knock', ext_sinon_sinon.stub());
    utilexpect_expectjs(qux._flag('knock')).equal(2);

    bar.appendTo(foo);

    baz.appendTo(bar);
    qux.appendTo(bar);

    utilexpect_expectjs(bar._flag('knock')).equal(2);
    utilexpect_expectjs(foo._flag('knock')).equal(1);

    baz.remove();
    utilexpect_expectjs(bar._flag('knock')).equal(1);
    utilexpect_expectjs(foo._flag('knock')).equal(1);

    qux.remove();
    utilexpect_expectjs(bar._flag('knock')).equal(0);
    utilexpect_expectjs(foo._flag('knock')).equal(0);

    bar.remove();

    foo.append(bar, baz, qux);
    utilexpect_expectjs(foo._flag('knock')).equal(2);

    foo.empty();
    utilexpect_expectjs(foo._flag('knock')).equal(0);
  });

});