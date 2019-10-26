import { func } from 'prop-types';
import * as React from 'react';

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
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';

// components
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
      ? props.togglePump({ status: 1 })
        .then(() => props.displaySnackMessage('Manual Override ON.'))
        .then(() => setState({ ...state, statusClass: 'tbl-status' }))
        .then(() => window.localStorage.setItem('checked', 'true'))
      : props.togglePump({ status: 0 })
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
        <h5>Manual</h5>
        <Switch
          className="manual-override"
          onChange={handleToggleButtonOnChange}
          // isChecked={window.localStorage.getItem('checked') === 'true'}
        />
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

  const SubHeaderContent = () => (
    <React.Fragment>
      <div className="main-subheader">
        <h3>Water Cycles</h3>
        {ToggleManualButton()}
      </div>
    </React.Fragment>
  )

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
     <LazyLoader height={110}>
        <div className="water-schedule-table">
          <Table
            keys={tableHeaders}
            values={tableValues}
            statusClass={state.statusClass}
          />
        </div>
     </LazyLoader>
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
            {SubHeaderContent()}
            {DeleteModal()}
            {(window.innerWidth < 539) ? BottomContent() : TopContent()}
            {props.schedules
              ? TableContent(Object.entries(props.schedules))
              : BlankContent()}
          </Cell>
        </Row>
      </Grid>
    );
  };

  return (
    <DashboardPage component={
        WaterCyclesPageComponent()
    }/>
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
  togglePump: state => dispatch(togglePump(state)),
  getPumpStatus: () => dispatch(getPumpStatus()),
});

export default connect(mapStateToProps, mapDispatchToProps)(WaterCyclesPage);
