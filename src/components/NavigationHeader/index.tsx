import React from 'react';
// components
import { ArrowForwardRounded, ArrowBackRounded } from '@material-ui/icons';
// third-party
import { NavLink } from 'react-router-dom';
// interfaces
import { NavigationHeaderProps } from './interfaces';
// styles
import './NavigationHeader.scss';

export const NavigationHeader = ({
	forwardButtonName,
	backwardButtonName,
	backwardLink,
	forwardLink,
}: NavigationHeaderProps): JSX.Element => {
	const forwardArrow = () => (
		<NavLink to={forwardLink}>
			<span className="register-toolbar-actions">
				<div className="register__logo">
					<span className="product-logo-text">{forwardButtonName}</span>
				</div>
				<ArrowForwardRounded />
			</span>
		</NavLink>
	);

	const backArrow = () => (
		<NavLink to={backwardLink}>
			<span className="register-toolbar-actions">
				<ArrowBackRounded />
				<div className="register__logo">
					<span className="product-logo-text">{backwardButtonName}</span>
				</div>
			</span>
		</NavLink>
	);

	return (
		<div className="navigation-header">
			<header>
				{backArrow()}
				<div className="mini-account-menu">
					<div className="mini-account-menu--desktop">{forwardArrow()}</div>
					<div className="mini-account-menu--mobile">{forwardArrow()}</div>
				</div>
			</header>
		</div>
	);
};

export default NavigationHeader;
