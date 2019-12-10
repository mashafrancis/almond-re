import { combineReducers } from 'redux';

// reducers
import device from '@modules/device';
import internalServerError from '@modules/internalServerError';
import snack from '@modules/snack';
import socialAuth from '@modules/socialAuth';
import timeSchedules from '@modules/timeSchedules';
import user from '@modules/user';

// types
import { LOG_OUT_USER } from '@modules/user/types';

const appReducer = combineReducers({
  internalServerError,
  timeSchedules,
  snack,
  socialAuth,
  user,
  device,
});

const rootReducer = (state, action) => {
  if (action.type === LOG_OUT_USER) {
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
