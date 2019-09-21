import { DISPLAY_SNACK_MESSAGE } from 'modules/snack/types';

export interface DisplaySnackMessageAction {
  type: DISPLAY_SNACK_MESSAGE;
  snack: SnackMessage;
}

export interface SnackMessage {
  message: string;
  withName: boolean;
}
