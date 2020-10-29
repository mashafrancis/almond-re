import { SensorData } from '@modules/sensorData/interfaces';

export interface State {
	sensorData: SensorData;
	errors: null;
}

export const GET_SENSOR_DATA_REQUEST = 'almond/sensor/GET_SENSOR_DATA_REQUEST';
export type GET_SENSOR_DATA_REQUEST = typeof GET_SENSOR_DATA_REQUEST;

export const GET_SENSOR_DATA_SUCCESS = 'almond/sensor/GET_SENSOR_DATA_SUCCESS';
export type GET_SENSOR_DATA_SUCCESS = typeof GET_SENSOR_DATA_SUCCESS;

export const GET_SENSOR_DATA_FAILURE = 'almond/sensor/GET_SENSOR_DATA_FAILURE';
export type GET_SENSOR_DATA_FAILURE = typeof GET_SENSOR_DATA_FAILURE;
