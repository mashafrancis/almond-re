import * as React from 'react';

// components
import Button from 'components/Button';

// third-party libraries
import Card, {
  CardActionButtons,
  CardActionIcons,
  CardActions,
  CardMedia,
  CardPrimaryContent
} from '@material/react-card';
import Fab from '@material/react-fab';
import {
  Cell,
} from '@material/react-layout-grid';
import MaterialIcon from '@material/react-material-icon';
import * as moment from 'moment';

// interfaces
import { Typography } from '@material-ui/core';
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
    <Card className={`log-card log-card__${type}`}>
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
