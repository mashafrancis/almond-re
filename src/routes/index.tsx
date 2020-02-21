// react libraries
import * as React from 'react';

// third party packages
import { Redirect, Route, Switch } from 'react-router-dom';

// pages and components
import AuthenticatedRoute from '@components/AuthenticatedRoute';
import PageNotFound from '@components/PageNotFound';
import DashboardContainer from '@pages/DashboardContainer';
import EnterDeviceIdPage from '@pages/EnterDeviceIdPage';
import HomePage from '@pages/HomePage';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={HomePage} />
    <Route exact path="/my-device" component={EnterDeviceIdPage} />
    <Route exact path="/dashboard" component={DashboardContainer} />
    {/*<AuthenticatedRoute*/}
    {/*  exact*/}
    {/*  authorize="analytics:view"*/}
    {/*  path="/analytics"*/}
    {/*  component={EnergyMonitoringPage}*/}
    {/*/>*/}
    <Route path="/404" component={PageNotFound} />
    <Redirect to="/404" />
  </Switch>
);

export default Routes;
