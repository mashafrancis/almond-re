// react libraries
import * as React from 'react';

// third party packages
import { Redirect, Route, Switch } from 'react-router-dom';

// pages and components
import AuthenticatedRoute from '@components/AuthenticatedRoute';
import PageNotFound from '@components/PageNotFound';
import Unauthorized from '@components/UnauthorizedUserModal';
import DashboardContainer from '@pages/DashboardContainer';
import EnterDeviceIdPage from '@pages/EnterDeviceIdPage';
import HomePage from '@pages/HomePage';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={HomePage} />
    <Route exact path="/my-device" component={EnterDeviceIdPage} />
    <AuthenticatedRoute
      exact
      path="/dashboard"
      authorize="analytics:view"
      component={DashboardContainer}
      fallbackView={<Unauthorized showModal={true} />}
    />
    <Route path="/404" component={PageNotFound} />
    <Redirect to="/404" />
  </Switch>
);

export default Routes;
