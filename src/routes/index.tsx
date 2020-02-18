// react libraries
import * as React from 'react';

// third party packages
import { Redirect, Route, Switch } from 'react-router-dom';

// pages and components
import AuthenticatedRoute from '@components/AuthenticatedRoute';
import PageNotFound from '@components/PageNotFound';
import AddTimeScheduleForm from '@pages/AddTimeScheduleForm';
import AnalyticsPage from '@pages/AnalyticsPage';
import EditTimeScheduleForm from '@pages/EditTimeScheduleForm';
import EnterDeviceIdPage from '@pages/EnterDeviceIdPage';
import HomePage from '@pages/HomePage';
import RolePageForm from '@pages/RolePageForm';
import UserRolesPage from '@pages/UserRolesPage';
import WaterCyclesPage from '@pages/WaterCyclesPage';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={HomePage} />
    <Route exact path="/water-cycles" component={WaterCyclesPage} />
    <Route exact path="/water-cycles/schedule" component={AddTimeScheduleForm} />
    <Route exact path="/water-cycles/edit/:id" component={EditTimeScheduleForm} />
    <Route exact path="/my-device" component={EnterDeviceIdPage} />
    <Route exact path="/user-roles" component={UserRolesPage} />
    <Route exact path="/user-roles/:action" component={RolePageForm} />
    <AuthenticatedRoute
      exact
      authorize="analytics:view"
      path="/analytics"
      component={AnalyticsPage}
    />
    <Route path="/404" component={PageNotFound} />
    <Redirect to="/404" />
  </Switch>
);

export default Routes;
