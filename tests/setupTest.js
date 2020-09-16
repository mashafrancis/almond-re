import '@testing-library/react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect'
import matchMediaPolyfill from 'mq-polyfill'

Object.defineProperty(global, 'Node', {
  value: {firstElementChild: 'firstElementChild'}
})

matchMediaPolyfill(window)
window.resizeTo = function resizeTo(width, height) {
  Object.assign(this, {
    innerWidth: width,
    innerHeight: height,
    outerWidth: width,
    outerHeight: height,
  }).dispatchEvent(new this.Event('resize'))
}

// const { JSDOM } = require('jsdom');
//
// const jsdom = new JSDOM('<!doctype html><html lang="en"><body/></html>', { url: 'https://localhost' });
// const { window } = jsdom;
//
// function copyProps(src, target) {
//   Object.defineProperties(target, {
//     ...Object.getOwnPropertyDescriptors(src),
//     ...Object.getOwnPropertyDescriptors(target),
//   });
// }
//
// Object.defineProperty(window, 'innerWidth', {
//   writable: true,
//   configurable: true,
//   value: 200,
// });
//
// // Object.defineProperty(window, 'replace', {
// //   configurable: true,
// // });
// // window.location.replace = jest.fn();
//
// Object.defineProperty(window, 'matchMedia', {
//   writable: true,
//   value: jest.fn().mockImplementation(query => ({
//     matches: false,
//     media: query,
//     onchange: null,
//     addListener: jest.fn(), // deprecated
//     removeListener: jest.fn(), // deprecated
//     addEventListener: jest.fn(),
//     removeEventListener: jest.fn(),
//     dispatchEvent: jest.fn(),
//   })),
// });
//
// // Object.defineProperty(Cookies, 'remove', {
// //   writable: true,
// //   value: '',
// // })
//
// global.window = window;
// global.document = window.document;
// global.navigator = {
//   userAgent: 'node.js',
// };
// global.requestAnimationFrame = function(callback) {
//   return setTimeout(callback, 0);
// };
//
// global.cancelAnimationFrame = function(id) {
//   clearTimeout(id);
// };
//
// copyProps(window, global);

// beforeAll(() => {
//   jest.spyOn(console, 'error').mockImplementation(() => {})
//   jest.spyOn(console, 'warn').mockImplementation(() => {})
// });
//
// afterAll(() => {
//   console.error.mockRestore()
//   console.warn.mockRestore()
// });
//
// afterEach((done) => {
//   done();
// });
