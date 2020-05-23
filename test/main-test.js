import { expect as utilexpect_expectjs } from "./util/expect";
import ext_sinon_sinon from "sinon";
import { indexjs as index_indexjsjs } from "../lib/";

it('static methods', function() {
  utilexpect_expectjs(index_indexjsjs.config).be.a('function');
  utilexpect_expectjs(index_indexjsjs.preload).be.a('function');
  utilexpect_expectjs(index_indexjsjs.start).be.a('function');
  utilexpect_expectjs(index_indexjsjs.pause).be.a('function');
  utilexpect_expectjs(index_indexjsjs.resume).be.a('function');
  utilexpect_expectjs(index_indexjsjs.app).be.a('function');
  utilexpect_expectjs(index_indexjsjs.atlas).be.a('function');

  utilexpect_expectjs(index_indexjsjs.create).be.a('function');

  // expect(Stage.stage).be.a('function');
  // expect(Stage.image).be.a('function');
  // expect(Stage.anim).be.a('function');
  // expect(Stage.string).be.a('function');
  // expect(Stage.canvas).be.a('function');
});
