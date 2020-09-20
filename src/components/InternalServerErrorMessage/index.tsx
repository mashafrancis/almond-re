// react libraries
import React from 'react';

// styles
import './InternalServerError.scss';

const InternalServerErrorMessage: (props: any) => any = (props) => (
	<div id="internal-server-error">
		<div className="server-error" data-testid="internal-server-error">
			<div className="server-error-500" />
			<h1>500</h1>
			<h2>Sorry. It is not you. It is us.</h2>
			<p data-testid="content">
				We are experiencing an internal server problem.
			</p>
			<p className="error-message">{`Error: ${props.message}`}</p>
			<p>
				Please try again later or contact support{' '}
				<span className="mail">mailto:almond.froyo@gmail.com</span>
			</p>
			{props.errorButton}
		</div>
	</div>
);
export default InternalServerErrorMessage;
