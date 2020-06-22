import { displaySnackMessage } from '@modules/snack';

const errorOnSnack = (error, dispatch, customMessage) => {
  const errorMessage = `An error occurred while ${customMessage}. Please try again`;
  const { response: { data: { message } } } = error;
  return error && error.response
    ? dispatch(displaySnackMessage(message))
    : dispatch(displaySnackMessage(errorMessage));
};

export default errorOnSnack;
