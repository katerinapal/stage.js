import { expect as utilexpect_expectjs } from "./util/expect";
import ext_sinon_sinon from "sinon";
import { memojs as utilmemo_memojsjs } from "./util/memo";
import { Class as libtree_Classjs } from "../lib/tree";

it('label', function() {
  var foo = libtree_Classjs.create();
  utilexpect_expectjs(foo.label('label')).be(foo);
  utilexpect_expectjs(foo.label()).be('label');
});

it('attr', function() {
  var foo = libtree_Classjs.create();
  utilexpect_expectjs(foo.attr('name')).not.ok();
  utilexpect_expectjs(foo.attr('string', 'Name')).equal(foo);
  utilexpect_expectjs(foo.attr('number', 9876543210)).equal(foo);
  utilexpect_expectjs(foo.attr('string')).equal('Name');
  utilexpect_expectjs(foo.attr('number')).equal(9876543210);
});

it('append', function() {
  var foo = libtree_Classjs.create(), bar = libtree_Classjs.create(), baz = libtree_Classjs.create();
  foo.append(bar);
  utilexpect_expectjs(foo.first()).be(bar);
  utilexpect_expectjs(foo.last()).be(bar);
  foo.append(baz);
  utilexpect_expectjs(foo.first()).be(bar);
  utilexpect_expectjs(foo.last()).be(baz);

  var foo = libtree_Classjs.create(), bar = libtree_Classjs.create(), baz = libtree_Classjs.create();
  foo.append([ bar, baz ]);
  utilexpect_expectjs(foo.first()).be(bar);
  utilexpect_expectjs(foo.last()).be(baz);
});

it('prepend', function() {
  var foo = libtree_Classjs.create(), bar = libtree_Classjs.create(), baz = libtree_Classjs.create();
  foo.prepend(bar);
  utilexpect_expectjs(foo.first()).be(bar);
  utilexpect_expectjs(foo.last()).be(bar);
  foo.prepend(baz);
  utilexpect_expectjs(foo.first()).be(baz);
  utilexpect_expectjs(foo.last()).be(bar);

  var foo = libtree_Classjs.create(), bar = libtree_Classjs.create(), baz = libtree_Classjs.create();
  foo.prepend([ bar, baz ]);
  utilexpect_expectjs(foo.first()).be(bar);
  utilexpect_expectjs(foo.last()).be(baz);
});

it('appendTo', function() {
  var foo = libtree_Classjs.create(), bar = libtree_Classjs.create(), baz = libtree_Classjs.create();
  bar.appendTo(foo);
  utilexpect_expectjs(foo.first()).be(bar);
  utilexpect_expectjs(foo.last()).be(bar);
  baz.appendTo(foo);
  utilexpect_expectjs(foo.first()).be(bar);
  utilexpect_expectjs(foo.last()).be(baz);
});

it('prependTo', function() {
  var foo = libtree_Classjs.create(), bar = libtree_Classjs.create(), baz = libtree_Classjs.create();
  bar.prependTo(foo);
  utilexpect_expectjs(foo.first()).be(bar);
  utilexpect_expectjs(foo.last()).be(bar);
  baz.prependTo(foo);
  utilexpect_expectjs(foo.first()).be(baz);
  utilexpect_expectjs(foo.last()).be(bar);
});

it('insertAfter', function() {
  var foo = libtree_Classjs.create(), bar = libtree_Classjs.create(), baz = libtree_Classjs.create();
  bar.prependTo(foo);
  baz.insertAfter(bar);
  utilexpect_expectjs(foo.first()).be(bar);
  utilexpect_expectjs(foo.last()).be(baz);
});

it('insertBefore', function() {
  var foo = libtree_Classjs.create(), bar = libtree_Classjs.create(), baz = libtree_Classjs.create();
  bar.prependTo(foo);
  baz.insertBefore(bar);
  utilexpect_expectjs(foo.first()).be(baz);
  utilexpect_expectjs(foo.last()).be(bar);
});

it('insertNext', function() {
  var foo = libtree_Classjs.create(), bar = libtree_Classjs.create(), baz = libtree_Classjs.create();
  bar.prependTo(foo);
  bar.insertNext(baz);
  utilexpect_expectjs(foo.first()).be(bar);
  utilexpect_expectjs(foo.last()).be(baz);
});

it('insertPrev', function() {
  var foo = libtree_Classjs.create(), bar = libtree_Classjs.create(), baz = libtree_Classjs.create();
  bar.prependTo(foo);
  bar.insertPrev(baz);
  utilexpect_expectjs(foo.first()).be(baz);
  utilexpect_expectjs(foo.last()).be(bar);
});

it('visit', function() {
  var node = utilmemo_memojsjs(function(id) {
    return libtree_Classjs.create().label(id);
  });
  var visitor, data;
  var stage = node(1).append(node(11),
      node(12).append(node(121).hide(), node(122), node(123)), node(13));

  stage.visit(visitor = {
    start : ext_sinon_sinon.stub(),
    end : ext_sinon_sinon.stub()
  }, data = {});
  utilexpect_expectjs(visitor.start.args.pluck(0)).list(
      node([ 1, 11, 12, 121, 122, 123, 13 ]), 'id');
  utilexpect_expectjs(visitor.start.alwaysCalledWithMatch(ext_sinon_sinon.match.object, data)).ok();
  utilexpect_expectjs(visitor.start.alwaysCalledOn(visitor)).ok();

  stage.visit(visitor = {
    visible : true,
    start : ext_sinon_sinon.stub(),
    end : ext_sinon_sinon.stub()
  }, data = {});
  utilexpect_expectjs(visitor.start.args.pluck(0)).list(node([ 1, 11, 12, 122, 123, 13 ]),
      'id');
  utilexpect_expectjs(visitor.start.alwaysCalledWithMatch(ext_sinon_sinon.match.object, data)).ok();
  utilexpect_expectjs(visitor.start.alwaysCalledOn(visitor)).ok();

  stage.visit(visitor = {
    reverse : true,
    start : ext_sinon_sinon.stub(),
    end : ext_sinon_sinon.stub()
  }, data = {});
  utilexpect_expectjs(visitor.start.args.pluck(0)).list(
      node([ 1, 13, 12, 123, 122, 121, 11 ]), 'id');
  utilexpect_expectjs(visitor.start.alwaysCalledWithMatch(ext_sinon_sinon.match.object, data)).ok();
  utilexpect_expectjs(visitor.start.alwaysCalledOn(visitor)).ok();
});
