import { combineReducers } from 'redux';

// reducers
import internalServerError from './modules/internalServerError';

// types
import { LOG_OUT_USER } from './modules/user/types';

const appReducer = combineReducers({
  internalServerError,
});

const rootReducer = (state, action) => {
  switch (action.type) {
    case LOG_OUT_USER:
      return {
        ...state,
        internalServerError: {
          error: false,
        },
      };
  }

  return appReducer(state, action);
};

export default rootReducer;
