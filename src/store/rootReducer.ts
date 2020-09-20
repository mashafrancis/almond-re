import { combineReducers } from 'redux';

// reducers
import activityLogs from '@modules/activityLogs';
import device from '@modules/device';
import internalServerError from '@modules/internalServerError';
import loading from '@modules/loading';
import people from '@modules/people';
import sensorData from '@modules/sensorData';
import snack from '@modules/snack';
import timeSchedules from '@modules/timeSchedules';
import user from '@modules/user';
import userRoles from '@modules/userRoles';

// types
import { LOG_OUT_USER } from '@modules/user/types';
import { State as TimeSchedules } from './modules/timeSchedules/types';
import { State as User } from './modules/user/types';

export type State = {
	internalServerError: any;
	timeSchedules: TimeSchedules;
	snack: any;
	user: User;
	device: any;
	userRoles: any;
	people: any;
	activityLogs: any;
	loading: any;
	sensorData: any;
};

const appReducer = combineReducers({
	internalServerError,
	timeSchedules,
	snack,
	user,
	device,
	userRoles,
	people,
	activityLogs,
	loading,
	sensorData,
});

const rootReducer = (state: any, action: any) => {
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
