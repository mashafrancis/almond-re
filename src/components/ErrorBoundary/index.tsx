import React from 'react';

import InternalServerErrorMessage from '@components/InternalServerErrorMessage';
import { ArrowBackRounded } from '@material-ui/icons';

const ErrorFallback = ({ error, resetErrorBoundary }: any): JSX.Element => (
	<InternalServerErrorMessage
		message={error.message}
		errorButton={
			<button
				onClick={resetErrorBoundary}
				className="mdc-button mdc-button--raised"
				type="button"
			>
				<ArrowBackRounded />
				<span className="mdc-button__label">Back</span>
			</button>
		}
	/>
);
export default ErrorFallback;
