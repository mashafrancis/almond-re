import { Card } from '@material-ui/core';
// interfaces
import { DashboardCardProps } from './interfaces';
// styles
import './DashboardCard.scss';

const DashboardCard = ({
	classes,
	heading,
	actionItem,
	body,
}: DashboardCardProps): JSX.Element => {
	return (
		<Card variant="outlined">
			<div className="dashboard-card">
				<div className="card-header">
					<h5 data-testid="heading" className="card-header__title">
						{heading}
					</h5>
					<div className="card-header__right-header">{actionItem}</div>
				</div>
				<div data-testid="body" className={`${classes} card-body`}>
					{body}
				</div>
			</div>
		</Card>
	);
};

export default DashboardCard;
