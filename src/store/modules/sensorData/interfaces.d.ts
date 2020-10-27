import {
	GET_SENSOR_DATA_FAILURE,
	GET_SENSOR_DATA_REQUEST,
	GET_SENSOR_DATA_SUCCESS,
} from '@modules/sensorData/types';

export interface GetSensorDataRequest {
	type: GET_SENSOR_DATA_REQUEST;
}

export interface GetSensorDataSuccess {
	type: GET_SENSOR_DATA_SUCCESS;
	sensorData: SensorData;
}

export interface GetSensorDataFailure {
	type: GET_SENSOR_DATA_FAILURE;
	errors: any;
}

export interface SensorData {
	humidity: number;
	temperature: number;
	waterLevel: number;
}
