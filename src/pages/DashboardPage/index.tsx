import * as React from 'react';

// third-party libraries
import { connect } from 'react-redux';

// thunks
import { logoutUser } from 'modules/user';

// pages
import DashboardNavBar from '../DashboardNavBar';

// interfaces
import { DashboardPageProps } from './interfaces';

// styles
import './DashboardPage.scss';

const DashboardPage: React.FunctionComponent<DashboardPageProps> = (props) => {
  const logoutUser = () => {
    window.location.replace('/');
    props.logoutUser();
  };

  const { component, user } = props;

  return (
    <DashboardNavBar
      component={component}
      logoutUser={logoutUser}
      user={user}
    />
  );
};

export const mapStateToProps = state => ({
  user: state.user.user,
});

export const mapDispatchToProps = dispatch => ({
  logoutUser: () => dispatch(logoutUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
