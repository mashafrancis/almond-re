import { DisplaySnackMessageAction } from './interfaces';
import { DISPLAY_SNACK_MESSAGE } from './types';

// action creators

/**
 * Display snack message action creator.
 *
 *
 * @returns {DisplaySnackMessageAction}
 * @param message
 * @param withName
 */
export const displaySnackMessage = (
  message: string,
  withName: boolean = false
): DisplaySnackMessageAction => ({
  snack: {
    message,
    withName,
  },
  type: DISPLAY_SNACK_MESSAGE,
});

/**
 * The snack reducer
 *
 * @param {Object} state
 * @param {DisplaySnackMessageAction} action
 */
export const reducer = (
  state = {},
  action: DisplaySnackMessageAction
) => {
  switch (action.type) {
    case DISPLAY_SNACK_MESSAGE:
      return action.snack;
    default:
      return state;
  }
};

export default reducer;
