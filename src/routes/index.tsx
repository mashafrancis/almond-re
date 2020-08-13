// react libraries
import React from 'react';

// third party packages
import { Redirect, Route, Switch } from 'react-router-dom';

// pages and components
import HomePage from '@pages/HomePage';
import EnterDeviceIdPage from '@pages/EnterDeviceIdPage';
import AuthenticatedRoute from '@components/AuthenticatedRoute';
import DashboardContainer from '@pages/DashboardContainer';
import PageNotFound from '@components/PageNotFound';
// import UnauthorizedUserModal from '@components/UnauthorizedUserModal';

// pages and components
// const AuthenticatedRoute = React.lazy(() => import('@components/AuthenticatedRoute'));
// const PageNotFound = React.lazy(() => import('@components/PageNotFound'));
// const Unauthorized = React.lazy(() => import('@components/UnauthorizedUserModal'));
// const DashboardContainer = React.lazy(() => import('@pages/DashboardContainer'));
// const EnterDeviceIdPage = React.lazy(() => import('@pages/EnterDeviceIdPage'));
// const HomePage = React.lazy(() => import('@pages/HomePage'));

const Routes = () =>
  <Switch>
    <Route exact path="/" component={HomePage}/>
    <Route exact path="/my-device" component={EnterDeviceIdPage}/>
    <AuthenticatedRoute
      exact={true}
      path="/dashboard"
      authorize="analytics:view"
      component={DashboardContainer}
      // fallbackView={<UnauthorizedUserModal isModalOpen={true}/>}
    />
    <Route path="/404" component={PageNotFound}/>
    <Redirect to="/404"/>
  </Switch>
;

export default Routes;
