// react libraries
import React, { lazy } from 'react';

// third party packages
import { Redirect, Route, Switch } from 'react-router-dom';

// pages and components
// import HomePage from '@pages/HomePage';
// import EnterDeviceIdPage from '@pages/EnterDeviceIdPage';
// import AuthenticatedRoute from '@components/AuthenticatedRoute';
// import DashboardContainer from '@pages/DashboardContainer';
// import PageNotFound from '@components/PageNotFound';
// import UnauthorizedUserModal from '@components/UnauthorizedUserModal';

// pages and components
const AuthenticatedRoute = lazy(() => import('@components/AuthenticatedRoute'));
const PageNotFound = lazy(() => import('@components/PageNotFound'));
// const Unauthorized = lazy(() => import('@components/UnauthorizedUserModal'));
const DashboardContainer = lazy(() => import('@pages/DashboardContainer'));
const EnterDeviceIdPage = lazy(() => import('@pages/EnterDeviceIdPage'));
const HomePage = lazy(() => import('@pages/HomePage'));

const Routes = (): any =>
  <Switch>
    <Route exact path="/" component={HomePage} />
    <Route exact path="/my-device" component={EnterDeviceIdPage} />
    <AuthenticatedRoute
      exact={true}
      path="/dashboard"
      authorize="analytics:view"
      component={DashboardContainer}
      />
    <Route path="/404" component={PageNotFound} />
    <Redirect to="/404" />
  </Switch>
;

export default Routes;
