import React from 'react';

// third-party libraries
import { Card } from '@material-ui/core';

// interfaces
import { DashboardCardProps } from './interfaces';

// styles
import './DashboardCard.scss';

const DashboardCard = (props: DashboardCardProps): JSX.Element => {
  const {
    classes,
    heading,
    actionItem,
    body,
  } = props;

  return (
    <Card variant="outlined">
      <div className="dashboard-card">
        <div className="card-header">
          <h5 className="card-header__title">{heading}</h5>
          <div className="card-header__right-header">{actionItem}</div>
        </div>
        <div className={`${classes} card-body`}>
          {body}
        </div>
      </div>
    </Card>
  );
};

export default DashboardCard;
