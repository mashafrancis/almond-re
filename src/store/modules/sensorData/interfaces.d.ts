import {
  GET_ENVIRONMENT_DATA_FAILURE,
  GET_ENVIRONMENT_DATA_SUCCESS,
  GET_WATER_DATA_FAILURE,
  GET_WATER_DATA_SUCCESS,
} from '@modules/sensorData/types';

export interface GetEnvironmentDataSuccess {
  type: GET_ENVIRONMENT_DATA_SUCCESS;
  environmentData: EnvironmentData;
}

export interface GetEnvironmentDataFailure {
  type: GET_ENVIRONMENT_DATA_FAILURE;
  errors: any;
}

export interface GetWaterDataSuccess {
  type: GET_WATER_DATA_SUCCESS;
  waterData: WaterData;
}

export interface GetWaterDataFailure {
  type: GET_WATER_DATA_FAILURE;
  errors: null;
}

export interface EnvironmentData {
  currentTemperature: number;
  currentHumidity: number;
  humidity: any;
  temperature: any;
}

export interface WaterData {
  waterLevel: number;
}
