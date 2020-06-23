import { LogActivity } from '@modules/activityLogs/interfaces';
import { LOG_ACTIVITY } from '@modules/activityLogs/types';
import { AnyAction } from 'redux';

/**
 * Log activities
 *
 * @returns {LogActivity}
 */
export const logActivity = (activityLogs: any): LogActivity => ({
  activityLogs,
  type: LOG_ACTIVITY,
});

export const activityLogsInitialState = [];

const reducer = (state: never[] = activityLogsInitialState, action: AnyAction) => {
  if (action.type === LOG_ACTIVITY) {
    return [
      ...state,
      ...action.activityLogs,
    ]
  }
  return state;
};

export default reducer;
