const { JSDOM } = require('jsdom');

const jsdom = new JSDOM('<!doctype html><html lang="en"><body/></html>', { url: 'https://localhost' });
const { window } = jsdom;

function copyProps(src, target) {
  Object.defineProperties(target, {
    ...Object.getOwnPropertyDescriptors(src),
    ...Object.getOwnPropertyDescriptors(target),
  });
}

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

// Object.defineProperty(Cookies, 'remove', {
//   writable: true,
//   value: '',
// })

global.window = window;
global.document = window.document;
global.navigator = {
  userAgent: 'node.js',
};
global.requestAnimationFrame = function (callback) {
  return setTimeout(callback, 0);
};
global.cancelAnimationFrame = function (id) {
  clearTimeout(id);
};

copyProps(window, global);

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
