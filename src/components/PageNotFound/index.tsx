// react library
import React from 'react';
// third-party libraries
import { ArrowBackRounded } from '@material-ui/icons';
// components
import ActionButton from '@components/ActionButton';
// styles
import './PageNotFound.scss';
// Interfaces
import { PageNotFoundProps } from './interfaces';

/**
 * Renders the page not found error message
 * @returns {JSX}
 */
const PageNotFound = ({ history }: PageNotFoundProps): JSX.Element => (
	<div id="notfound">
		<div className="notfound" data-testid="notfound">
			<div className="notfound-404" />
			<h1>404</h1>
			<h2>Oops! Page Not Be Found</h2>
			<p>
				Sorry but the page you are looking for does not exist, have been
				removed. name changed or is temporarily unavailable
			</p>
			<ActionButton
				name="Back"
				variant="contained"
				startIcon={<ArrowBackRounded />}
				handleClick={history.goBack}
			/>
		</div>
	</div>
);
export default PageNotFound;
