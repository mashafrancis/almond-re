import { Card } from '@material-ui/core';
import dayjs from 'dayjs';
// interfaces
import { ActivityLogCardProps } from './interfaces';
// styles
import './ActivityLogCard.scss';

const ActivityLogCard = ({
	log,
	date,
	type,
}: ActivityLogCardProps): JSX.Element => {
	return (
		<Card variant="outlined" className={`log-card log-card__${type}`}>
			<div
				data-testid="type"
				className={`${
					type === 'info' ? 'log-details-info' : 'log-details-error'
				} log-details`}
			>
				<div className={`log-details-${type}__header`}>
					<h5 data-testid="header" className="card-header__log">
						{log}
					</h5>
				</div>
				<div className={`log-details-${type}__date`}>
					<p data-testid="details">{`${dayjs(date).format('LLLL')}`}</p>
				</div>
			</div>
		</Card>
	);
};

export default ActivityLogCard;
