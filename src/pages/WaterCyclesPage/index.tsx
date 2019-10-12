import * as React from 'react';
import * as Redux from 'redux';

// third-party libraries
import Dialog, {
  DialogButton,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from '@material/react-dialog';
import Fab from '@material/react-fab';
import {
  Cell,
  Grid,
  Row
} from '@material/react-layout-grid';
import MaterialIcon from '@material/react-material-icon';
import * as moment from 'moment';
import * as Pusher from 'pusher-js';
import { connect, useDispatch } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';

// components
import Loader from '../../components/Loader';
import Table from '../../components/Table';
import ToggleButton from '../../components/ToggleButton';

// thunks
import { displaySnackMessage } from '../../store/modules/snack';
import {
  deleteSingleSchedule,
  getAllSchedules,
  getPumpStatus,
  togglePump,
} from '../../store/modules/timeSchedules';

// pages
import DashboardPage from '../DashboardPage';

// styles
import './WaterCyclesPage.scss';

// interfaces
import {
  WaterCyclesPageProps,
  WaterCyclesPageState
} from './interfaces';

export const WaterCyclesPage: React.FunctionComponent<WaterCyclesPageProps> = (props) => {
  const [state, setState] = React.useState<WaterCyclesPageState>({
    isLoading: false,
    isEditMode: false,
    isChecked: window.localStorage.getItem('checked') === 'true',
    schedules: [],
    isDeleteModal: false,
    action: '',
    id: '',
    statusClass: '',
  });

  React.useEffect(() => {
    props.getAllSchedules()
      .then(() => setState({ ...state, schedules: props.schedules }))
      .then(() => setState({ ...state, isLoading: false }));
      // .then(() => setState({ ...state, isChecked: Boolean(window.localStorage.getItem('checked')) }));
  },              []);

  React.useEffect(() => {
    Pusher.logToConsole = true;
    const pusher = new Pusher('e33acdd6256d35e8e26b', {
      cluster: 'ap2',
      forceTLS: true,
    });
    const channel = pusher.subscribe('schedule');
    channel.bind('created', (data) => {
      console.log(data);
      const updatedSchedule = state.schedules.push(data.schedule);
      console.log('updated', updatedSchedule);
      setState({ ...state, schedules: updatedSchedule });
    });
  },              []);

  React.useEffect(() => {
    switch (state.action) {
      case 'delete':
        props.deleteSingleSchedule(state.id);
        props.getAllSchedules()
          .then(() => setState({ ...state, schedules: props.schedules }))
          .then(() => setState({
            ...state,
            action: '',
            isDeleteModal: false, isLoading: false,
          }));
        break;
      case 'dismiss':
        setState({ ...state, isDeleteModal: false });
        break;
    }
  },              [state.action]);

  const areEqual = (prevProps, nextProps) => {
    return (prevProps.isChecked === nextProps.isChecked);
  };

  const handleToggleButtonOnChange = (event) => {
    event.target.checked
      ? props.togglePump({ status: 'on' })
        .then(() => props.displaySnackMessage('Manual Override ON.'))
        .then(() => setState({ ...state, statusClass: 'tbl-status' }))
        .then(() => window.localStorage.setItem('checked', 'true'))
      : props.togglePump({ status: 'off' })
        .then(() => props.displaySnackMessage('Manual Override OFF.'))
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
        <ToggleButton
          classes="manual-override"
          onChange={handleToggleButtonOnChange}
          // isChecked={window.localStorage.getItem('checked') === 'true'}
        />
        <h5>Manual Override</h5>
      </div>
    );
  };

  const TopContent = () => (
    <div className="top-buttons">
      <div className="button-schedule">
        <Link to={'/water-cycles/schedule'}>
          <Fab className="create-schedule-button"
               icon={<MaterialIcon icon="add" initRipple={null}/>}
          />
        </Link>
        <h5>Add New Schedule</h5>
      </div>
      {ToggleManualButton()}
    </div>
  );

  const BottomContent = () => (
    <div className="bottom-buttons">
      {ToggleManualButton()}
      <div className="button-schedule">
        <NavLink to={'/water-cycles/schedule'}>
          <Fab className="create-schedule-button"
               icon={<MaterialIcon icon="add" initRipple={null}/>}
          />
        </NavLink>
      </div>
    </div>
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

  const ActionButtons = id => (
    <div key={id} className="action-buttons">
      <span onClick={ () => setState({ ...state, id, isEditMode: true })}>
      <Link to={`${props.match.url}/edit/${id}`}>
        <h5>Edit</h5>
      </Link>
      </span>
      <span id={id} onClick={ () => setState({ ...state, id, isDeleteModal: true })}>
      <h5 className="action-buttons__delete">Delete</h5>
      </span>
    </div>
  );

  const TableContent = (schedules) => {
    console.log(state.schedules);
    const tableHeaders = {
      Time: { valueKey: 'time', colWidth: '40' },
      Actions: { valueKey: 'actions', colWidth: '40' },
      Status: { valueKey: 'status' },
    };

    const tableValues = schedules.map(schedule => ({
      id: schedule._id,
      time: `${moment(schedule.schedule).format('LT')}`,
      actions: ActionButtons(schedule._id),
      status: <ToggleButton classes={''}/>,
    }));

    return (
      <div className="water-schedule-table">
        <Table
          keys={tableHeaders}
          values={tableValues}
          statusClass={state.statusClass}
        />
      </div>
    );
  };

  const WaterCyclesPageComponent = () => {
    const { schedules } = props;
    return (
      <Grid>
        <Row>
          <Cell
            columns={12}
            desktopColumns={12}
            tabletColumns={8}
            phoneColumns={4}
          >
            {DeleteModal()}
            {(window.innerWidth < 539) ? BottomContent() : TopContent()}
            {!props.schedules || undefined
              ? BlankContent()
              : TableContent(schedules)}
          </Cell>
        </Row>
      </Grid>
    );
  };

  return (
    <DashboardPage component={
      state.isLoading
        ? Loader()
        : WaterCyclesPageComponent()
    }/>
  );
};

export const mapStateToProps = state => ({
  error: state.error,
  schedules: state.timeSchedules.schedules,
  status: state.timeSchedules.status,
});

export const mapDispatchToProps = dispatch => ({
  getAllSchedules: () => dispatch(getAllSchedules()),
  deleteSingleSchedule: id => dispatch(deleteSingleSchedule(id)),
  displaySnackMessage: message => dispatch(displaySnackMessage(message)),
  togglePump: state => dispatch(togglePump(state)),
  getPumpStatus: () => dispatch(getPumpStatus()),
});

export default connect(mapStateToProps, mapDispatchToProps)(WaterCyclesPage);
