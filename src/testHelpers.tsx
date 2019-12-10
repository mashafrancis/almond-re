// react libraries
import * as React from 'react';

// third party libraries
import { mount } from 'enzyme';
import * as history from 'history';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

// helper functions
import http from '@utils/helpers/http';

import reducer from './store/rootReducer';

const tokenString = `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJVc2VySW5mbyI6
eyJpZCI6Ii1MTWJTR3A2UnZoUl9BOV8xQXJJIiwiZmlyc3RfbmFtZSI6Ikl2ZXJlbiIsImxhc3Rfbm
FtZSI6IlNoYWd1eSIsImZpcnN0TmFtZSI6Ikl2ZXJlbiIsImxhc3ROYW1lIjoiU2hhZ3V5IiwiZW1ha
WwiOiJpdmVyZW4uc2hhZ3V5QGFuZGVsYS5jb20iLCJuYW1lIjoiSXZlcmVuIFNoYWd1eSIsInBpY3R1
cmUiOiJodHRwczovL2xoNC5nb29nbGV1c2VyY29udGVudC5jb20vLWpndU9lMnJrbnkwL0FBQUFBQUF
BQUFJL0FBQUFBQUFBQUFjL2VWclJPa3Atei1VL3Bob3RvLmpwZz9zej01MCIsInJvbGVzIjp7IlRlY2
hub2xvZ3kiOiItS1hIN2lNRTRlYk1FWEFFYzdIUCIsIkFuZGVsYW4iOiItS2lpaGZab3NlUWVxQzZiV
1RhdSJ9fSwiaWF0IjoxNTM4NzAxNjczLCJleHAiOjMxNTM2MDAwMDAwLCJhdWQiOiJhbmRlbGEuY29t
IiwiaXNzIjoiYWNjb3VudHMuYW5kZWxhLmNvbSIsImp0aSI6IjJjMTUwNDdkLTk4NmMtNGMwNC04OTc
wLTY2OWY0MmEwZWVhMCJ9.snFzv7A7XYxedbnMD_cQMvBICXIXgWDMDf7KVCW2pis`;

const expiredTokenString = `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJVc2VySW5mby
I6eyJpZCI6Ii1MTWJTR3A2UnZoUl9BOV8xQXJJIiwiZmlyc3RfbmFtZSI6Ikl2ZXJlbiIsImxhc3Rfb
mFtZSI6IlNoYWd1eSIsImZpcnN0TmFtZSI6Ikl2ZXJlbiIsImxhc3ROYW1lIjoiU2hhZ3V5IiwiZW1h
aWwiOiJpdmVyZW4uc2hhZ3V5QGFuZGVsYS5jb20iLCJuYW1lIjoiSXZlcmVuIFNoYWd1eSIsInBpY3R
1cmUiOiJodHRwczovL2xoNC5nb29nbGV1c2VyY29udGVudC5jb20vLWpndU9lMnJrbnkwL0FBQUFBQU
FBQUFJL0FBQUFBQUFBQUFjL2VWclJPa3Atei1VL3Bob3RvLmpwZz9zej01MCIsInJvbGVzIjp7IlRlY
2hub2xvZ3kiOiItS1hIN2lNRTRlYk1FWEFFYzdIUCIsIkFuZGVsYW4iOiItS2lpaGZab3NlUWVxQzZi
V1RhdSJ9fSwiaWF0IjoxNTM4NzAxNjczLCJleHAiOjE1Mzg2MTUzNTUsImF1ZCI6ImFuZGVsYS5jb20
iLCJpc3MiOiJhY2NvdW50cy5hbmRlbGEuY29tIiwianRpIjoiMmMxNTA0N2QtOTg2Yy00YzA0LTg5Nz
AtNjY5ZjQyYTBlZWEwIn0.DJSK8H4OFucHfRY5xhX2M0T57LO9er7HIRJgYbqysCI`;

export const token = tokenString.replace(/(\r\n|\n|\r)/gm, '');

export const expiredToken = expiredTokenString.replace(/(\r\n|\n|\r)/gm, '');
/**
 * Utility mock store that can be used for all instances where one is required
 *
 * @param {object} initialState
 * @param {object} extraArgument 3rd argument to pass to thunks, after dispatch and getState
 */
export const mockStore = (extraArgument, initialState = {}) => createStore(
  reducer,
  initialState,
  applyMiddleware(thunk.withExtraArgument(extraArgument)
));

/**
 * Mock for axios request.
 */
export const axiosMock = (url, response, resolve = true) => new Proxy({}, {
  get(target, key) {
    return (url, payload) => resolve
      ? Promise.resolve(response)
      : Promise.reject(response);
  },
});

/**
 * Utility mock store that can be used for all instances where one is required
 *
 * @param mock
 * @param {Object} initialState
 */
export const reduxMockStore = (mock = axiosMock('', {}), initialState = {}) =>
  configureMockStore([thunk.withExtraArgument(mock)])(initialState);

export const mountWithRedux = (
  ui,
  {
    initialState = {},
    extraArgument = {},
    store = mockStore(extraArgument, initialState),
  } = {}
) => ({
  store,
  wrapper: mount(<Provider store={store}>{ ui }</Provider>),
});

/**
 * This helper function helps mock the dispatch action and returns jest.expect assertion
 *
 * @param store
 * @param thunk
 * @param expectedActions
 *
 * @returns {jest.Expect}
 */
export const dispatchMethodMock = (store, thunk, expectedActions) => (
  store.dispatch(thunk)
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    })
);

/**
 * Use this if you want to run assertions only after all promises have resolved.
 */
export const flushPromises = () => new Promise(resolve => setImmediate(resolve));

/**
 * Adds a mock adapter to the http axios instance
 *
 * @param {Object} response
 * @param {Object} error
 *
 * @returns {void}
 */
export const axiosMockAdapter = (response, error) => {
  http.defaults.adapter = config => new Promise((resolve, reject) => {
    if (error) {
      error.config = config;
      reject(error);
    }

    response.config = config;
    resolve(response);
  });
};

// mock router context instead of using Memory Router
export const routerContext = {
  context: {
    router: {
      history: history.createBrowserHistory(),
      route: {
        location: { pathname: '/' },
        match: { isExact: true },
      },
    },
  },
  childContextTypes: { router: () => null },
};
