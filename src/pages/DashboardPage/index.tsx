import * as React from 'react';

// thunks
import { logoutUser } from 'modules/user';

// pages
import DashboardNavBar from '../DashboardNavBar';

// interfaces
import { DashboardPageProps } from './interfaces';

// styles
import './DashboardPage.scss';

const DashboardPage: React.FunctionComponent<DashboardPageProps> = (props) => {
  return (
    <DashboardNavBar
      component={props.component}
    />
  );
};

export default DashboardPage;
