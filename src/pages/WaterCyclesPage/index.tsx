import ActivityLogCard from 'components/ActivityLogCard';
import TimelineComponent from 'components/TimelineComponent';
import * as React from 'react';

// third-party libraries
import Dialog, {
  DialogButton,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from '@material/react-dialog';
import {
  Cell,
  Grid,
  Row
} from '@material/react-layout-grid';
import MaterialIcon from '@material/react-material-icon';
import * as moment from 'moment';
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';

// components
import DashboardCard from 'components/DashboardCard';
import LazyLoader from 'components/LazyLoader';
import Loader from 'components/Loader';
import Switch from 'components/SwitchButton';
import Table from 'components/Table';
import ToggleButton from 'components/ToggleButton';
import { authService } from 'utils/auth';
import WaterCyclesPageLoader from '../../placeholders/WaterCyclesPageSkeletonLoader';

// thunks
import { displaySnackMessage } from 'modules/snack';
import {
  deleteSingleSchedule,
  getAllSchedules,
  getPumpStatus,
  togglePump,
} from 'modules/timeSchedules';

// pages
import DashboardPage from '../DashboardPage';

// styles
import './WaterCyclesPage.scss';

// interfaces
import {
  WaterCyclesPageProps,
  WaterCyclesPageState
} from './interfaces';

// fixtures
import { activityLogs } from './fixtures';

export const WaterCyclesPage: React.FunctionComponent<WaterCyclesPageProps> = (props) => {
  const [state, setState] = React.useState<WaterCyclesPageState>({
    isEditMode: false,
    isChecked: window.localStorage.getItem('checked') === 'true',
    schedules: [],
    isDeleteModal: false,
    action: '',
    id: '',
    statusClass: '',
  });

  React.useEffect(() => {
    switch (state.action) {
      case 'delete':
        props.deleteSingleSchedule(state.id);
        break;
      case 'dismiss':
        setState({ ...state, isDeleteModal: false });
        break;
    }
    props.getAllSchedules()
      .then(() => setState({ ...state, schedules: props.schedules }))
      .then(() => setState({
        ...state,
        action: '',
        isDeleteModal: false,
      }));
  },              [state.action]);

  const areEqual = (prevProps, nextProps) => {
    return (prevProps.isChecked === nextProps.isChecked);
  };

  const handleToggleButtonOnChange = (event) => {
    event.target.checked
      ? props.togglePump({ status: '1' })
        .then(() => setState({ ...state, statusClass: 'tbl-status' }))
        .then(() => window.localStorage.setItem('checked', 'true'))
      : props.togglePump({ status: '0' })
        .then(() => setState({ ...state, statusClass: '' }))
        .then(() => window.localStorage.setItem('checked', 'false'));
  };

  const handleToggleStatusChange = (event) => {
    event.target.checked
    ? setState({ ...state, statusClass: 'tbl-status' })
    : setState({ ...state, statusClass: '' });
  };

  const ToggleManualButton = () => {
    return (
      <div className="manual-schedule">
        <p>The manual override for your automated pump schedules used for switching the pump on/off anytime.
        </p>
      </div>
    );
  };

  const ScheduleButton = () => (
    <Link to={'/water-cycles/schedule'}>
      <button className="mdc-button">
         <MaterialIcon
            hasRipple icon="add"
            initRipple={null}
          />
        <span className="mdc-button__label">Add schedule</span>
      </button>
    </Link>
  );

  const ClearLogsButton = () => (
    <button className="mdc-button">
       <MaterialIcon
          hasRipple icon="delete_outline"
          initRipple={null}
        />
      <span className="mdc-button__label">Clear logs</span>
    </button>
  );

  const BlankContent = () => (
    <React.Fragment>
      <div className="blank-content">
        <h2>Click the + to add a new pump time schedule or toggle the manual
          override to turn on and off the pump
        </h2>
      </div>
    </React.Fragment>
  );

  const BlankLogContent = () => (
    <React.Fragment>
      <div className="blank-content">
        <h2>There are no logs available currently.
        </h2>
      </div>
    </React.Fragment>
  );

  const SubHeaderContent = () => (
    <React.Fragment>
      <div className="main-subheader">
        <h3>Water Cycles</h3>
      </div>
    </React.Fragment>
  );

  const DeleteModal = () => (
    <Dialog
      open={state.isDeleteModal}
      onClose={ action => setState({ ...state, action, isDeleteModal: false }) }
    >
      <DialogTitle>DELETE TIME SCHEDULE</DialogTitle>
      <DialogContent>
        <h5>Do you confirm deletion of time schedule?</h5>
      </DialogContent>
      <DialogFooter>
        <DialogButton action="delete">Delete</DialogButton>
        <DialogButton action="dismiss" isDefault>Dismiss</DialogButton>
      </DialogFooter>
    </Dialog>
  );

  const ActionButtons = schedule => (
    <div key={schedule} className="action-buttons">
      <span onClick={ () => setState({ ...state, id: schedule, isEditMode: true })}>
      <Link to={`${props.match.url}/edit/${schedule}`}>
        <h5>Edit</h5>
      </Link>
      </span>
      <span id={schedule} onClick={ () => setState({ ...state, id: schedule, isDeleteModal: true })}>
      <h5 className="action-buttons__delete">Delete</h5>
      </span>
    </div>
  );

  const TableContent = (timeSchedule) => {
    const tableHeaders = {
      Time: { valueKey: 'time', colWidth: '40' },
      Actions: { valueKey: 'actions', colWidth: '50' },
      Status: { valueKey: 'status' },
    };

    const tableValues = timeSchedule.map(schedule => ({
      id: schedule,
      time: `${moment(schedule[1].schedule).format('LT')}`,
      actions: ActionButtons(schedule[1]._id),
      status: <Switch />,
    }));

    return (
      props.isLoading ? (<WaterCyclesPageLoader/>) :
        <Table
          keys={tableHeaders}
          values={tableValues}
          statusClass={state.statusClass}
        />
    );
  };

  const ActivityLogs = () => {
    return (
      <React.Fragment>
      {
        activityLogs.map((logs, index) => {
          return (
            <ActivityLogCard
              key={index}
              log={logs.message}
              date={logs.date}
              type={logs.type}
            />
          );
        })
      }
      </React.Fragment>
    );
  };

  const waterCyclesPageHeader = () => (
    <React.Fragment>
        <p>
          The watering schedule for the pumping time is used to control the number of cycles
          the water is going to be pumped through the system. The maximum number of minutes
          to pump through the system is set at default to be 15 mins.
        </p>
    </React.Fragment>
  );

  const WaterCyclesPageComponent = () => {
    return (
      <Grid>
        <Row>
          <Cell columns={7} desktopColumns={7} tabletColumns={8} phoneColumns={4}>
            {(window.innerWidth < 539) && SubHeaderContent()}
          </Cell>
        </Row>
        <Row>
          <Cell columns={5} desktopColumns={5} tabletColumns={8} phoneColumns={4}>
            {/*<LazyLoader height={200}>*/}
            <DashboardCard
              classes="schedules-available"
              heading="Water Schedules"
              body={props.schedules ? TableContent(Object.entries(props.schedules)) : BlankContent()}
              actionItem={ScheduleButton()}
            />
            {/*</LazyLoader>*/}
          </Cell>
            <Cell columns={3} desktopColumns={3} tabletColumns={4} phoneColumns={4}>
              <DashboardCard
                classes=""
                heading="Manual Override"
                body={ToggleManualButton()}
                actionItem={
                  <Switch
                    className="manual-override"
                    onChange={handleToggleButtonOnChange}
                    // isChecked={window.localStorage.getItem('checked') === 'true'}
                  />
                }
              />
              <DashboardCard
                classes=""
                heading="Next Schedule:"
                body=""
                actionItem={<h2 className="next-time-schedule">4:00PM</h2>}
              />
              <DashboardCard
                classes=""
                heading="About"
                body={waterCyclesPageHeader()}
              />
            </Cell>
          <Cell columns={4} desktopColumns={4} tabletColumns={8} phoneColumns={4}>
            <DashboardCard
                classes="recent-activities-available"
                heading="Recent Activity"
                body={activityLogs.length ? ActivityLogs() : BlankLogContent()}
                actionItem={ClearLogsButton()}
              />
          </Cell>
        </Row>
        <Row>
          {/*<Cell columns={5} desktopColumns={5} tabletColumns={2} phoneColumns={4}>*/}
          {/*  <DashboardCard*/}
          {/*    classes=""*/}
          {/*    heading="Recent Activity"*/}
          {/*    body={activityLogs.length ? ActivityLogs() : BlankLogContent()}*/}
          {/*    actionItem={ClearLogsButton()}*/}
          {/*  />*/}
          {/*</Cell>*/}
        </Row>
        {DeleteModal()}
      </Grid>
    );
  };

  return (
    <DashboardPage component={ WaterCyclesPageComponent() }/>
  );
};

export const mapStateToProps = state => ({
  error: state.error,
  schedules: state.timeSchedules.data,
  status: state.timeSchedules.status,
  isLoading: state.timeSchedules.isLoading,
});

export const mapDispatchToProps = dispatch => ({
  getAllSchedules: () => dispatch(getAllSchedules()),
  deleteSingleSchedule: id => dispatch(deleteSingleSchedule(id)),
  displaySnackMessage: message => dispatch(displaySnackMessage(message)),
  togglePump: status => dispatch(togglePump(status)),
  getPumpStatus: () => dispatch(getPumpStatus()),
});

export default connect(mapStateToProps, mapDispatchToProps)(WaterCyclesPage);
