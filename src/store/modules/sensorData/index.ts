import * as firebase from 'firebase/app';
import { getFirebase } from "react-redux-firebase";
import {
  GetEnvironmentDataFailure,
  GetEnvironmentDataRequest,
  GetEnvironmentDataSuccess,
  GetWaterDataFailure,
  GetWaterDataRequest,
  GetWaterDataSuccess
} from "@modules/sensorData/interfaces";

import {
  GET_ENVIRONMENT_DATA_FAILURE,
  GET_ENVIRONMENT_DATA_REQUEST,
  GET_ENVIRONMENT_DATA_SUCCESS,
  GET_WATER_DATA_FAILURE,
  GET_WATER_DATA_REQUEST,
  GET_WATER_DATA_SUCCESS
} from "@modules/sensorData/types";

import {
  loadingError,
  loadingRequest,
  loadingSuccess
} from "@modules/loading";
import { AnyAction } from "redux";

export const getEnvironmentDataRequest = (): GetEnvironmentDataRequest => ({
  type: GET_ENVIRONMENT_DATA_REQUEST
});

export const getEnvironmentDataSuccess = (environmentData): GetEnvironmentDataSuccess => ({
  environmentData,
  type: GET_ENVIRONMENT_DATA_SUCCESS
});

export const getEnvironmentDataFailure = (errors): GetEnvironmentDataFailure => ({
  errors,
  type: GET_ENVIRONMENT_DATA_FAILURE
});

export const getWaterDataRequest = (): GetWaterDataRequest => ({
  type: GET_WATER_DATA_REQUEST
});

export const getWaterDataSuccess = (waterData): GetWaterDataSuccess => ({
  waterData,
  type: GET_WATER_DATA_SUCCESS
});

export const getWaterDataFailure = (errors): GetWaterDataFailure => ({
  errors,
  type: GET_WATER_DATA_FAILURE
});

export const getEnvironmentData = () => (dispatch, getState, getFirebase) => {
  dispatch(loadingRequest('requesting'));
  // const firebase = getFirebase()
  return firebase.database()
    .ref('/environment')
    .on('value', snapshot => {
      dispatch(getEnvironmentDataSuccess(snapshot.val()));
      dispatch(loadingSuccess('success'));
    }, error => {
      const message = error.response.data.errors.message;
      dispatch(loadingError('error'));
      dispatch(getEnvironmentDataFailure(message));
    });
    // .once('value',snapshot => snapshot)
    // .then(snapshot => {
    //   dispatch(loadingSuccess('success'));
    //   dispatch(getEnvironmentDataSuccess(snapshot.val()));
    // })
    // .catch(error => {
    //   const message = error.response.data.errors.message;
    //   dispatch(loadingError('error'));
    //   dispatch(getEnvironmentDataFailure(message));
    // });
}

export const getWaterData = () => (dispatch, getState, getFirebase) => {
  dispatch(loadingRequest('requesting'));
  return firebase.database()
    .ref('/water')
    .on('value', snapshot => {
      dispatch(getWaterDataSuccess(snapshot.val()));
      dispatch(loadingSuccess('success'));
    }, error => {
      const message = error.response.data.errors.message;
      dispatch(loadingError('error'));
      dispatch(getWaterDataFailure(message));
    })
}

const environmentDataInitialState = {
  environmentData: [],
  waterData: [],
  errors: null
}

const reducer = (state: {
  environmentData: any[], waterData: any[], errors: null
} = environmentDataInitialState, action: AnyAction) => {
  switch (action.type) {
    case GET_ENVIRONMENT_DATA_REQUEST:
      return {
        ...state,
      };
    case GET_ENVIRONMENT_DATA_SUCCESS:
      return {
        ...state,
        environmentData: action.environmentData,
      };
    case GET_ENVIRONMENT_DATA_FAILURE:
      return {
        ...state,
        errors: action.errors
      };
    case GET_WATER_DATA_REQUEST:
      return {
        ...state,
      }
    case GET_WATER_DATA_SUCCESS:
      return {
        ...state,
        waterData: action.waterData,
      }
    case GET_WATER_DATA_FAILURE:
      return {
        ...state,
        errors: action.errors
      }
    default:
      return state;
  }
};

export default reducer;
