// react libraries
import * as React from 'react';

// third party packages
import { Redirect, Route, Switch } from 'react-router-dom';

// pages
import PageNotFound from 'components/PageNotFound';
import AddTimeScheduleForm from 'pages/AddTimeScheduleForm';
import EditTimeScheduleForm from 'pages/EditTimeScheduleForm';
import HomePage from 'pages/HomePage';
import WaterCyclesPage from 'pages/WaterCyclesPage';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={HomePage} />
    <Route exact path="/water-cycles" component={WaterCyclesPage} />
    <Route exact path="/water-cycles/schedule" component={AddTimeScheduleForm} />
    <Route exact path="/water-cycles/edit/:id" component={EditTimeScheduleForm} />
    <Route path="/404" component={PageNotFound} />
    <Redirect to="/404" />
  </Switch>
);

export default Routes;
