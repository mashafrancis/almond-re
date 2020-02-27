import { combineReducers } from 'redux';

// reducers
import device from '@modules/device';
import internalServerError from '@modules/internalServerError';
import people from '@modules/people';
import snack from '@modules/snack';
import socialAuth from '@modules/socialAuth';
import timeSchedules from '@modules/timeSchedules';
import user from '@modules/user';
import userRoles from '@modules/userRoles';

// types
import { LOG_OUT_USER } from '@modules/user/types';

const appReducer = combineReducers({
  internalServerError,
  timeSchedules,
  snack,
  socialAuth,
  user,
  device,
  userRoles,
  people,
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
