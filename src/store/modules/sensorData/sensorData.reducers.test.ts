import {
  getEnvironmentDataFailure,
  getEnvironmentDataSuccess,
  getWaterDataFailure,
  getWaterDataSuccess,
  reducer,
  sensorDataInitialState,
} from '@modules/sensorData';
import { errorMessage } from '../../../testHelpers';

describe('Sensor data reducer:', () => {
  it('should return initial state if action type doesn\'t match', () => {
    const newState = reducer(sensorDataInitialState, { type: 'fakeRoot' });
    expect(newState).toEqual(sensorDataInitialState);
  });

  describe('Get environment data', () => {
    const responseData = {};
    it('should dispatch GET_ENVIRONMENT_DATA_SUCCESS', () => {
      const getSensorDataSuccess = getEnvironmentDataSuccess(responseData as any);
      const sensorDataState = reducer(sensorDataInitialState, getSensorDataSuccess);

      expect(sensorDataState.errors).toBe(null);
    });

    it('should dispatch GET_ENVIRONMENT_DATA_FAILURE', () => {
      const getSensorDataFailure = getEnvironmentDataFailure(errorMessage);
      const sensorDataState = reducer(sensorDataInitialState, getSensorDataFailure);

      expect(sensorDataState.errors).toBe(errorMessage);
    });
  });

  describe('Get water data', () => {
    const responseData = {};
    it('should dispatch GET_WATER_DATA_SUCCESS', () => {
      const getWaterDataSuccessAction = getWaterDataSuccess(responseData as any);
      const sensorDataState = reducer(sensorDataInitialState, getWaterDataSuccessAction);

      expect(sensorDataState.errors).toBe(null);
    });

    it('should dispatch GET_WATER_DATA_FAILURE', () => {
      const getWaterDataFailureAction = getWaterDataFailure(errorMessage);
      const sensorDataState = reducer(sensorDataInitialState, getWaterDataFailureAction);

      expect(sensorDataState.errors).toBe(errorMessage);
    });
  });
});
