import { combineReducers } from 'redux';

// reducers
import internalServerError from './modules/internalServerError';
import snack from './modules/snack';
import socialAuth from './modules/socialAuth';
import timeSchedules from './modules/timeSchedules';
import user from './modules/user';

// types
import { LOG_OUT_USER } from './modules/user/types';

const appReducer = combineReducers({
  internalServerError,
  timeSchedules,
  snack,
  socialAuth,
  user,
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
