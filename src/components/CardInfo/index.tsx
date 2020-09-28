import React from 'react';
// components
import { Fab } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import ActionButton from '@components/ActionButton';
import useViewport from '../../hooks/useViewport';
// interfaces
import { CardInfoProps } from './interfaces';
// styles
import './CardInfo.scss';

const CardInfo = ({
	mainHeader,
	subHeader,
	buttonName,
	onClick,
	icon,
}: CardInfoProps): JSX.Element => {
	const cardButton = () => (
		<div className="card-content__button">
			{width > breakpoint ? (
				<ActionButton
					name={buttonName as string}
					variant="contained"
					handleClick={onClick}
				/>
			) : (
				<Fab
					size="small"
					style={{ backgroundColor: '#1967D2', color: '#eaeaea' }}
					aria-label="add"
					onClick={onClick}
					data-testid="fab"
				>
					<Add />
				</Fab>
			)}
		</div>
	);
	const { width } = useViewport();
	const breakpoint = 539;

	return (
		<div className="info-card">
			<div className="card-content">
				{icon}
				<div className="card-content__body">
					<div className="main" data-testid="header">
						{mainHeader}
					</div>
					<div className="sub-main">{subHeader}</div>
				</div>
				{cardButton()}
			</div>
		</div>
	);
};

export default CardInfo;
