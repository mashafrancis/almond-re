import { displaySnackMessage } from '@modules/snack';
import { Dispatch } from 'redux';

const errorOnSnack = (
	error: { response: any },
	dispatch: Dispatch,
	customMessage?: string,
) => {
	let errorMessage =
		'Failed to process request due to a network issue. Check your connectivity then reload page.';
	if (customMessage) {
		errorMessage = `An error occurred while ${customMessage}. Please try again`;
	}

	const { message } = error?.response?.data.errors;
	return dispatch(
		displaySnackMessage(error?.response ? message : errorMessage, 'error'),
	);
};

export default errorOnSnack;
