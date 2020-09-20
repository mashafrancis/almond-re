import {
	reducer,
	loadingInitialState,
	loadingRequest,
	loadingSuccess,
	loadingError,
} from '@modules/loading';

describe('Loading reducer', () => {
	it("should return initial state if action type doesn't match", () => {
		const newState = reducer(loadingInitialState, { type: 'fakeType' });
		expect(newState).toEqual(loadingInitialState);
	});

	it('should dispatch LOADING_REQUEST', () => {
		const loadingRequestAction = loadingRequest('requesting');
		const loadingState = reducer(loadingInitialState, loadingRequestAction);

		expect(loadingState).toEqual('requesting');
	});

	it('should dispatch LOADING_SUCCESS', () => {
		const loadingSuccessAction = loadingSuccess('success');
		const loadingState = reducer(loadingInitialState, loadingSuccessAction);

		expect(loadingState).toEqual('success');
	});

	it('should dispatch LOADING_ERROR', () => {
		const loadingErrorAction = loadingError('error');
		const loadingState = reducer(loadingInitialState, loadingErrorAction);

		expect(loadingState).toEqual('error');
	});
});
