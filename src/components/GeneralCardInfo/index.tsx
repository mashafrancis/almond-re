import React from 'react';
// interfaces
import { GeneralCardInfoProps } from './interfaces';
// styles
import './GeneralCardInfo.scss';

const GeneralCardInfo = ({
	mainHeader,
	subHeader,
	actionItem,
	icon,
}: GeneralCardInfoProps): JSX.Element => {
	return (
		<div className="general-info-card">
			<div className="card-content">
				{icon}
				<div className="card-content__body">
					<div data-testid="heading" className="main">
						{mainHeader}
					</div>
					<div data-testid="sub-heading" className="sub-main">
						{subHeader}
					</div>
				</div>
				<div className="card-content__button">{actionItem}</div>
			</div>
		</div>
	);
};

export default GeneralCardInfo;
