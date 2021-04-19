import InternalServerErrorMessage from '@components/molecules/InternalServerErrorMessage';
import { ArrowBackRounded } from '@material-ui/icons';

const ErrorFallback = ({ error, resetErrorBoundary }: any): JSX.Element => {
	return (
		<>
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
		</>
	);
};

export default ErrorFallback;
