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
import { DashboardCardProps } from './interfaces';

// styles
import './DashboardCard.scss';

const DashboardCard: React.FunctionComponent<DashboardCardProps> = (props) => {
  const {
    classes,
    heading,
    actionItem,
    body,
  } = props;

  return (
    <Card outlined>
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
