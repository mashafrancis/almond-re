import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';

import thunk from 'redux-thunk';

import cacheAxiosInstance from 'utils/cacheAxiosInstance';
import http from 'utils/helpers/http';

import rootReducer from './rootReducer';

const initialState = {};
// default cache ttl is set to 20 mins
const cachedHttp = cacheAxiosInstance(http, 1200000);

const devMiddleware = composeWithDevTools(
  applyMiddleware(
    thunk.withExtraArgument(cachedHttp),
    reduxImmutableStateInvariant()
  )
);
const prodMiddleware = applyMiddleware(thunk.withExtraArgument(cachedHttp));

const middleware = process.env.NODE_ENV === 'development' ? devMiddleware : prodMiddleware;

const store = createStore(
  rootReducer,
  initialState,
  middleware
);

export default store;
