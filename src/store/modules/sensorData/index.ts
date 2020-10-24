import {
	GetSensorDataFailure,
	GetSensorDataSuccess,
	SensorData,
} from '@modules/sensorData/interfaces';

import {
	GET_SENSOR_DATA_FAILURE,
	GET_SENSOR_DATA_SUCCESS,
	State,
} from '@modules/sensorData/types';

import { Action, AnyAction, Reducer } from 'redux';

export const getSensorDataSuccess = (
	sensorData: SensorData,
): GetSensorDataSuccess => ({
	sensorData,
	type: GET_SENSOR_DATA_SUCCESS,
});

export const getSensorDataFailure = (errors: any): GetSensorDataFailure => ({
	errors,
	type: GET_SENSOR_DATA_FAILURE,
});

export const getSensorData = (data: SensorData): GetSensorDataSuccess =>
	getSensorDataSuccess(data);

export const sensorDataInitialState = {
	sensorData: {
		humidity: 0,
		temperature: 0,
		waterLevel: 0,
	},
	errors: null,
};

export const reducer: Reducer<State, Action> = (
	state: State = sensorDataInitialState,
	action: AnyAction,
) => {
	switch (action.type) {
		case GET_SENSOR_DATA_SUCCESS:
			return {
				...state,
				sensorData: { ...state.sensorData, ...action.sensorData },
				errors: null,
			};
		case GET_SENSOR_DATA_FAILURE:
			return {
				...state,
				errors: action.errors,
			};
		default:
			return state;
	}
};

export default reducer;
