// thunks
import { displaySnackMessage, reducer } from './index';

describe('The Toast Reducer', () => {
  const snackMessageDefaultState = {};
  const snackMessage = 'Trip created successfully';

  it('should return initial state', () => {
    expect(reducer(undefined, {} as any)).toEqual(snackMessageDefaultState);
  });

  it('should handle DISPLAY_SNACK_MESSAGE', () => {
    const displaySnackMessageAction = displaySnackMessage(snackMessage);
    const newSnackMessageState = reducer(snackMessageDefaultState, displaySnackMessageAction) as any;

    expect(newSnackMessageState.message).toEqual('Trip created successfully');
  });
});
