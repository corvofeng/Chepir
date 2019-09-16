
// This is used for unittest:
// ./node_modules/.bin/mocha -r ts-node/register --require ./src/test/dom.js ./src/**/*.test.ts
// copy from
// https://github.com/airbnb/enzyme/blob/master/docs/guides/jsdom.md

const { JSDOM } = require('jsdom');
const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
const { window } = jsdom;

// function copyProps(src, target) {
//   Object.defineProperties(target, {
//     ...Object.getOwnPropertyDescriptors(src),
//     ...Object.getOwnPropertyDescriptors(target),
//   });
// }

global.window = window;
global.document = window.document;
global.navigator = {
  userAgent: 'node.js',
};
// global.requestAnimationFrame = function (callback) {
//   return setTimeout(callback, 0);
// };
// global.cancelAnimationFrame = function (id) {
//   clearTimeout(id);
// };
// copyProps(window, global);