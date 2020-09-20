import {
	GetEnvironmentDataFailure,
	GetEnvironmentDataSuccess,
	GetWaterDataFailure,
	GetWaterDataSuccess,
} from '@modules/sensorData/interfaces';

import {
	GET_ENVIRONMENT_DATA_FAILURE,
	GET_ENVIRONMENT_DATA_SUCCESS,
	GET_WATER_DATA_FAILURE,
	GET_WATER_DATA_SUCCESS,
} from '@modules/sensorData/types';

import { loadingError, loadingRequest, loadingSuccess } from '@modules/loading';
import { AnyAction } from 'redux';

export const getEnvironmentDataSuccess = (
	environmentData: any,
): GetEnvironmentDataSuccess => ({
	environmentData,
	type: GET_ENVIRONMENT_DATA_SUCCESS,
});

export const getEnvironmentDataFailure = (
	errors: any,
): GetEnvironmentDataFailure => ({
	errors,
	type: GET_ENVIRONMENT_DATA_FAILURE,
});

export const getWaterDataSuccess = (waterData: any): GetWaterDataSuccess => ({
	waterData,
	type: GET_WATER_DATA_SUCCESS,
});

export const getWaterDataFailure = (errors: any): GetWaterDataFailure => ({
	errors,
	type: GET_WATER_DATA_FAILURE,
});

// export const getEnvironmentData = () => (dispatch: any, getState: any, getFirebase: any) => {
//   dispatch(loadingRequest('requesting'));
//   // const firebase = getFirebase()
//   return firebase.database()
//     .ref('/environment')
//     .on('value', snapshot => {
//       dispatch(getEnvironmentDataSuccess(snapshot.val()));
//       dispatch(loadingSuccess('success'));
//     }, (error: { response: { data: { errors: { message: any; }; }; }; }) => {
//       const { message } = error.response.data.errors;
//       dispatch(loadingError('error'));
//       dispatch(getEnvironmentDataFailure(message));
//     });
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
// };

// export const getWaterData = () => (dispatch: any, getState: any, getFirebase: any) => {
//   dispatch(loadingRequest('requesting'));
//   // const firebase = getFirebase()
//   return firebase.database()
//     .ref('/water')
//     .on('value', snapshot => {
//       dispatch(getWaterDataSuccess(snapshot.val()));
//       dispatch(loadingSuccess('success'));
//     }, (error: { response: { data: { errors: { message: any; }; }; }; }) => {
//       const { message } = error.response.data.errors;
//       dispatch(loadingError('error'));
//       dispatch(getWaterDataFailure(message));
//     });
// };

export const sensorDataInitialState = {
	environmentData: [],
	waterData: [],
	errors: null,
};

export const reducer = (
	state: {
		environmentData: any[];
		waterData: any[];
		errors: null;
	} = sensorDataInitialState,
	action: AnyAction,
) => {
	switch (action.type) {
		case GET_ENVIRONMENT_DATA_SUCCESS:
			return {
				...state,
				environmentData: action.environmentData,
				errors: null,
			};
		case GET_ENVIRONMENT_DATA_FAILURE:
			return {
				...state,
				errors: action.errors,
			};
		case GET_WATER_DATA_SUCCESS:
			return {
				...state,
				waterData: action.waterData,
				errors: null,
			};
		case GET_WATER_DATA_FAILURE:
			return {
				...state,
				errors: action.errors,
			};
		default:
			return state;
	}
};

export default reducer;
