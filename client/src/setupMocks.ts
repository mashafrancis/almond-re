// unmock store instance before each test suite
jest.unmock('../src/store/');

import store from '../src/store/';

store.dispatch = jest.fn();

jest.mock('file-saver', () => ({ saveAs: jest.fn() }));
