import { AnyAction, combineReducers } from 'redux';
// reducers
import activityLogs from '@modules/activityLogs';
import analytics from '@modules/analytics';
import authentication from '@modules/authentication';
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
import { State as TimeSchedules } from '@modules/timeSchedules/types';
import { State as User, LOG_OUT_USER } from '@modules/user/types';
import { State as Authentication } from '@modules/authentication/types';
import { State as Analytics } from '@modules/analytics/types';
import { State as Devices } from '@modules/device/types';
import { State as SensorData } from '@modules/sensorData/types';
import { State as People } from '@modules/people/types';

export type IRootState = {
	internalServerError: any;
	timeSchedules: TimeSchedules;
	snack: any;
	user: User;
	device: Devices;
	userRoles: any;
	people: People;
	activityLogs: any;
	loading: any;
	sensorData: SensorData;
	authentication: Authentication;
	analytics: Analytics;
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
	authentication,
	analytics,
});

const rootReducer = (state: Partial<IRootState> | any, action: AnyAction) => {
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
