import * as React from 'react';

// third-party libraries
import Fab from '@material/react-fab';
import {
  Cell,
  Grid,
  Row
} from '@material/react-layout-grid';
import MaterialIcon from '@material/react-material-icon';
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';

// components
import Table from '../../components/Table';
import ToggleButton from '../../components/ToggleButton';

// thunks
import { displaySnackMessage } from '../../store/modules/snack';

// pages
import DashboardPage from '../DashboardPage';

// fixtures
import { timeSchedule } from './fixtures';

// styles
import './WaterCyclesPage.scss';

// interfaces
import {
  WaterCyclesPageProps,
  WaterCyclesPageState
} from './interfaces';

const TopContent = () => {
  return (
    <div className="top-buttons">
      <div className="button-schedule">
      <NavLink to={'/water-cycles/schedule'}>
          <Fab className="create-schedule-button" icon={<MaterialIcon icon="add" initRipple={null}/>}
          />
        </NavLink>
      <h5>Add New Schedule</h5>
      </div>
      <div className="manual-schedule">
        <ToggleButton classes="manual-override" />
        <h5>Manual Override</h5>
      </div>
      </div>
  );
};

const BottomContent = () => {
  return (
    <div className="bottom-buttons">
      <div className="button-schedule">
      <NavLink to={'/water-cycles/schedule'}>
          <Fab className="create-schedule-button" icon={<MaterialIcon icon="add" initRipple={null}/>}
          />
        </NavLink>
      </div>
      <div className="manual-schedule">
        <ToggleButton classes="manual-override" />
        <h5>Manual Override</h5>
      </div>
      </div>
  );
};

const BlankContent = () => {
  return (
    <React.Fragment>
        <div className="blank-content">
        <h2>Click the + to add a new pump time schedule or toggle the manual
          override to turn on and off the pump
        </h2>
      </div>
    </React.Fragment>
  );
};

const ActionButtons = () => {
  return (
    <div className="action-buttons">
      <h5>Edit</h5>
      <h5 className="action-buttons__delete">Delete</h5>
    </div>
  );
};

const TableContent = (timeSchedule) => {
  const tableHeaders = {
    Time: { valueKey: 'time', colWidth: '40' },
    Actions: { valueKey: 'actions', colWidth: '40' },
    Status: { valueKey: 'status' },
  };

  const tableValues = timeSchedule.map(schedule => ({
    time: `${schedule.time}hrs`,
    actions: ActionButtons(),
    status: <ToggleButton classes={''} />,
  }));

  return (
    <div className="water-schedule-table">
        <Table
          keys={tableHeaders}
          values={tableValues}
        />
      </div>
  );
};

const WaterCyclesPageComponent = () => {
  return (
    <Grid>
      <Row>
        <Cell
          columns={12}
          desktopColumns={12}
          tabletColumns={8}
          phoneColumns={4}
        >
          {(window.innerWidth < 539) ? BottomContent() : TopContent() }
          {!timeSchedule.length ? BlankContent() : TableContent(timeSchedule)}
        </Cell>
      </Row>
    </Grid>
  );
};

const WaterCyclesPage = () => {
  return (
    <DashboardPage component={WaterCyclesPageComponent()} />
  );
};

export const mapStateToProps = state => ({
  error: state.error,
});

export const mapDispatchToProps = dispatch => ({
  displaySnackMessage: message => dispatch(displaySnackMessage(message)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WaterCyclesPage);
