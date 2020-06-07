import * as React from 'react';

// third-party libraries
import { Card } from '@material-ui/core';
import * as moment from 'moment';

// interfaces
import { ActivityLogCardProps } from './interfaces';

// styles
import './ActivityLogCard.scss';

const ActivityLogCard: React.FunctionComponent<ActivityLogCardProps> = (props) => {
  const {
    log,
    date,
    type,
  } = props;

  return (
    <Card variant="outlined" className={`log-card log-card__${type}`}>
      <div className={`${
        type === 'info' ? 'log-details-info' : 'log-details-error'
      } log-details`}>
        <div className={`log-details-${type}__header`}>
          <h5 className="card-header__log">{log}</h5>
        </div>
        <div className={`log-details-${type}__date`}>
          <p>{`${moment(date).format('LLLL')}`}</p>
        </div>
      </div>
    </Card>
  );
};

export default ActivityLogCard;
