import {
	LoadingError,
	LoadingRequest,
	LoadingSuccess,
} from '@modules/loading/interfaces';

import {
	LOADING_ERROR,
	LOADING_REQUEST,
	LOADING_SUCCESS,
} from '@modules/loading/types';
import { AnyAction } from 'redux';

export const loadingRequest = (loading: string): LoadingRequest => ({
	loading,
	type: LOADING_REQUEST,
});

export const loadingSuccess = (loading: string): LoadingSuccess => ({
	loading,
	type: LOADING_SUCCESS,
});

export const loadingError = (loading: string): LoadingError => ({
	loading,
	type: LOADING_ERROR,
});

export const loadingInitialState = 'idle';

export const reducer = (
	state: string = loadingInitialState,
	action: AnyAction,
) => {
	switch (action.type) {
		case LOADING_REQUEST:
			return action.loading;
		case LOADING_SUCCESS:
			return action.loading;
		case LOADING_ERROR:
			return action.loading;
		default:
			return state;
	}
};

export default reducer;
