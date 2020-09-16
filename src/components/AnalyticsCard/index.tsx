import React from 'react';

// interfaces
import { AnalyticsCardProps } from './interfaces';

// styles
import './AnalyticsCard.scss';

const AnalyticsCard = (props: AnalyticsCardProps): JSX.Element => {
  const {
    icon,
    mainInfo,
    subInfo,
    colorClass,
    onClick
  } = props;

  return (
    <div className="analytics-card" onClick={onClick} data-testid="analytics-card">
      <div className={`card-content ${colorClass}`}>
        {icon}
        <div className="card-content__body">
          <div className="main">{mainInfo}</div>
        </div>
        <div className="card-content__info">
          <h4>{subInfo}</h4>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsCard;
