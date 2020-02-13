import { expect } from "./util/expect";
import sinon from "sinon";
import { indexjs as Stage } from "../lib/";

it('static methods', function() {
  expect.expect(Stage.config).be.a('function');
  expect.expect(Stage.preload).be.a('function');
  expect.expect(Stage.start).be.a('function');
  expect.expect(Stage.pause).be.a('function');
  expect.expect(Stage.resume).be.a('function');
  expect.expect(Stage.app).be.a('function');
  expect.expect(Stage.atlas).be.a('function');

  expect.expect(Stage.create).be.a('function');

  // expect(Stage.stage).be.a('function');
  // expect(Stage.image).be.a('function');
  // expect(Stage.anim).be.a('function');
  // expect(Stage.string).be.a('function');
  // expect(Stage.canvas).be.a('function');
});
