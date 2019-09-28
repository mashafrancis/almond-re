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
import Loader from '../../components/Loader';
import Table from '../../components/Table';
import ToggleButton from '../../components/ToggleButton';

// thunks
import { displaySnackMessage } from '../../store/modules/snack';
import {
  deleteSingleSchedule,
  getAllSchedules
} from '../../store/modules/timeSchedules';

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

export const WaterCyclesPage: React.FunctionComponent<WaterCyclesPageProps> = (props) => {
  const [state, setState] = React.useState<WaterCyclesPageState>({
    isLoading: false,
    schedules: [],
    isDeleteModal: false,
    action: '',
    id: '',
  });

  React.useEffect(() => {
    props.getAllSchedules()
      .then(() => setState({ ...state, schedules: props.schedules }))
      .then(() => setState({ ...state, isLoading: false }));
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

  const TopContent = () => (
    <div className="top-buttons">
      <div className="button-schedule">
        <NavLink to={'/water-cycles/schedule'}>
          <Fab className="create-schedule-button"
               icon={<MaterialIcon icon="add" initRipple={null}/>}
          />
        </NavLink>
        <h5>Add New Schedule</h5>
      </div>
      <div className="manual-schedule">
        <ToggleButton classes="manual-override"/>
        <h5>Manual Override</h5>
      </div>
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
      <div className="manual-schedule">
        <ToggleButton classes="manual-override"/>
        <h5>Manual Override</h5>
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

  const ActionButtons = schedule => (
    <div key={schedule} className="action-buttons">
      <Link to={`${props.match.url}/edit/${schedule}`}>
        <h5>Edit</h5>
      </Link>
      <span id={schedule} onClick={ () => setState({ ...state, id: schedule, isDeleteModal: true })}>
      <h5 className="action-buttons__delete">Delete</h5>
      </span>
    </div>
  );

  const TableContent = (timeSchedule) => {
    const tableHeaders = {
      Time: { valueKey: 'time', colWidth: '40' },
      Actions: { valueKey: 'actions', colWidth: '40' },
      Status: { valueKey: 'status' },
    };

    const tableValues = timeSchedule.map(schedule => ({
      id: schedule,
      time: `${moment(schedule[1].time).format('LT')}`,
      actions: ActionButtons(schedule[0]),
      status: <ToggleButton classes={''}/>,
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
            {DeleteModal()}
            {(window.innerWidth < 539) ? BottomContent() : TopContent()}
            {!props.schedules || undefined
              ? BlankContent()
              : TableContent(Object.entries(props.schedules))}
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
  schedules: state.timeSchedules.data,
});

export const mapDispatchToProps = dispatch => ({
  getAllSchedules: () => dispatch(getAllSchedules()),
  deleteSingleSchedule: id => dispatch(deleteSingleSchedule(id)),
  displaySnackMessage: message => dispatch(displaySnackMessage(message)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WaterCyclesPage);
