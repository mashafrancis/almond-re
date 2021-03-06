// unmock store instance before each test suite
import store from '../src/store';

jest.unmock('../src/store/');

store.dispatch = jest.fn();

jest.mock('file-saver', () => ({ saveAs: jest.fn() }));
