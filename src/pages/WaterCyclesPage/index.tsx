import * as React from 'react';

// third-party libraries
import {
  Cell,
  Grid,
  Row
} from '@material/react-layout-grid';
import MaterialIcon from '@material/react-material-icon';
import Switch from '@material/react-switch';
import * as moment from 'moment';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// components
import ActionButton from '@components/ActionButton';
import ActivityLogCard from '@components/ActivityLogCard';
import DashboardCard from '@components/DashboardCard';
import Loader from '@components/Loader';
import Modal from '@components/Modal';
import Table from '@components/Table';
import DateFnsUtils from '@date-io/date-fns';
import { IconButton, InputAdornment } from '@material-ui/core';
import { MuiPickersUtilsProvider, TimePicker } from '@material-ui/pickers';
import WaterCyclesPageLoader from '@placeholders/WaterCyclesPageSkeletonLoader';
import { MenuContext, UserContext } from '@utils/context';

// thunks
import { displaySnackMessage } from '@modules/snack';
import {
  addNewSchedule,
  deleteSingleSchedule, editSchedule,
  getAllSchedules,
  getPumpStatus,
  togglePump,
  toggleScheduleStatus,
} from '@modules/timeSchedules';

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
    schedules: [],
    isDeleteModal: false,
    scheduleId: '',
    statusClass: '',
    isEnabled: false,
    isFormModalOpen: false,
    showScheduleModal: false,
    scheduleToEdit: '',
    isActionDone: false,
    isLoading: false,
  });

  const menu = React.useContext(MenuContext);
  const user = React.useContext(UserContext);

  const [selectedTimeSchedule, handleSelectedTimeSchedule] = React.useState(new Date());

  React.useEffect(() => {
    setState({ ...state, isLoading: true });
    const getSchedules = async () => {
      await props.getAllSchedules(user.activeDevice._id);
    };
    getSchedules().then(() => setState({ ...state, schedules: props.schedules }));
  },              [user.activeDevice._id]);

  React.useEffect(() => {
    props.getPumpStatus(user.activeDevice._id)
      .then(() => setState({ ...state, isEnabled: props.enabled }));
  },              [state.isEnabled]);

  const areEqual = (prevProps, nextProps) => {
    return (prevProps.isChecked === nextProps.isChecked);
  };

  const handleToggleButtonOnChange = (event) => {
    event.target.checked
      ? props.togglePump({ enabled: true, deviceId: user.activeDevice._id })
        .then(() => setState({ ...state, statusClass: 'tbl-status' }))
      : props.togglePump({ enabled: false, deviceId: user.activeDevice._id })
        .then(() => setState({ ...state, statusClass: '' }));
  };

  const handleToggleStatusChange = (event, schedule) => {
    event.target.checked
      ? props.toggleScheduleStatus(schedule._id,  { enabled: true, deviceId: user.activeDevice._id })
        .then(() => window.localStorage.setItem('checked', 'true'))
      :  props.toggleScheduleStatus(schedule._id,  { enabled: false, deviceId: user.activeDevice._id })
        .then(() => window.localStorage.setItem('checked', 'true'));
  };

  const handleEditTimeChange = (value) => {
    setState(prevState => ({
      ...prevState,
      scheduleToEdit: value,
    }));
  };

  const showScheduleModal = mode => (event) => {
    const { schedules } = props;

    if (`show${mode}ScheduleModal` && mode === 'Add') {
      setState(prevState => ({
        ...state,
        showScheduleModal: !prevState.showScheduleModal,
        isFormModalOpen: true,
        isEditMode: false,
      }));
    } else if (`show${mode}ScheduleModal` && mode === 'Edit') {
      const scheduleId = event.target.id;
      const schedule = schedules.filter(obj => obj._id === scheduleId);

      setState(prevState => ({
        ...state,
        scheduleId,
        scheduleToEdit: schedule[0].schedule,
        showScheduleModal: !prevState.showScheduleModal,
        isFormModalOpen: true,
        isEditMode: true,
      }));
    }
  };

  const closeScheduleModal = () => {
    if (state.isEditMode) {
      setState({
        ...state,
        scheduleToEdit: '',
        showScheduleModal: false,
        isFormModalOpen: false,
      });
    }

    setState({
      ...state,
      showScheduleModal: false,
      isFormModalOpen: false,
    });
  };

  const toggleScheduleDeleteModal = () => setState({ ...state, isDeleteModal: !state.isDeleteModal });

  const handleScheduleDelete = (event) => {
    event.preventDefault();
    props.deleteSingleSchedule(state.scheduleId).then(toggleScheduleDeleteModal);
  };

  const onAddEditScheduleSubmit = (event) => {
    event.preventDefault();
    const { isEditMode } = state;
    const schedule = {
      schedule: isEditMode ? state.scheduleToEdit : selectedTimeSchedule,
      deviceId: user.activeDevice._id,
    };

    isEditMode
      ? props.editSchedule(state.scheduleId, schedule).then(closeScheduleModal)
      : props.addNewSchedule(schedule).then(closeScheduleModal);
  };

  const BlankContent = message => (
    <div className="blank-content">
      <h2>{message}</h2>
    </div>
  );

  const AddEditModal = () => (
    <Modal
      isModalOpen={state.isFormModalOpen}
      renderContent={() => RenderTimeScheduleForm()}
      onClose={() => setState({ ...state, isFormModalOpen: false })}
      renderHeader={() => state.isEditMode ? 'Edit time schedule' : 'Create a new time schedule'}
      submitButtonName={state.isEditMode ? 'Update schedule' : 'Create new schedule'}
      onSubmit={onAddEditScheduleSubmit}
      onDismiss={closeScheduleModal}
    />
  );

  const DeleteScheduleModal = () => (
    <Modal
      isModalOpen={state.isDeleteModal}
      renderContent={() => <p className="delete-modal-content">Do you confirm deletion of time schedule?</p>}
      onClose={toggleScheduleDeleteModal}
      renderHeader={() => 'Delete Time Schedule'}
      submitButtonName="Delete schedule"
      onSubmit={handleScheduleDelete}
      onDismiss={toggleScheduleDeleteModal}
    />
  );

  const ActionButtons = schedule => (
    <div key={schedule} className="action-buttons">
      <span id={schedule} onClick={ showScheduleModal('Edit')}>
        <h5 id={schedule} className="action-buttons__edit">Edit</h5>
      </span>
      <span id={schedule} onClick={ () => setState({ ...state, scheduleId: schedule, isDeleteModal: true })}>
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
      status: <Switch
                checked={schedule[1].enabled}
                onClick={e => handleToggleStatusChange(e, schedule[1])}
              />,
    }));

    return (
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

  const RenderTimeScheduleForm = () => {
    const { isEditMode } = state;

    return (
      <React.Fragment>
        <div className="form-cell">
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <TimePicker
              className="mdc-text-field--fullwidth"
              name="time_schedule"
              inputVariant="outlined"
              label="time schedule"
              value={isEditMode ? state.scheduleToEdit : selectedTimeSchedule}
              onChange={isEditMode ? handleEditTimeChange : handleSelectedTimeSchedule}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconButton href={'#'}>
                      <MaterialIcon role="button" icon="alarm" initRipple={null}/>
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </MuiPickersUtilsProvider>
          <p
            className="mdc-text-field-helper-text mdc-text-field-helper-text--validation-msg
            mdc-text-field-helper-text--persistent mdc-text-field-helper-text--validation-msg"
            aria-hidden="false" />
        </div>
      </React.Fragment>
    );
  };

  return (
    <Grid>
      <Row>
        <Cell columns={7} desktopColumns={7} tabletColumns={8} phoneColumns={4}>
          <div className="main-subheader">
            <div className="device-header-container" onClick={() => menu.setDeviceModalOpen(true)}>
              <h3 className="main-subheader__device-id">
                {`Device ID: ${user.activeDevice.id}`}
                <MaterialIcon
                  hasRipple icon="arrow_drop_down" initRipple={null}/>
              </h3>
            </div>
          </div>
        </Cell>
      </Row>
      <Row>
        <Cell columns={5} desktopColumns={5} tabletColumns={8} phoneColumns={4}>
          <DashboardCard
            classes="schedules-available"
            heading="Water Schedules"
            body={(props.schedules.length > 0)
              ? TableContent(Object.entries(props.schedules))
              : BlankContent(
              'Click the + to add a new pump time schedule or toggle the manual override to turn on and off the pump'
            )}
            actionItem={
              <ActionButton
                name="Add schedule"
                icon="add"
                handleClick={showScheduleModal('Add')}
              />
            }
          />
          {AddEditModal()}
          {DeleteScheduleModal()}
        </Cell>
          <Cell columns={3} desktopColumns={3} tabletColumns={4} phoneColumns={4}>
            <DashboardCard
              classes=""
              heading="Manual Override"
              body={
                <div className="manual-schedule">
                  <p>
                    The manual override for your automated pump schedules used for switching the pump on/off anytime.
                  </p>
                </div>
              }
              actionItem={
                <Switch
                  className="manual-override"
                  onChange={handleToggleButtonOnChange}
                  checked={props.enabled}
                />
              }
            />
            <DashboardCard
              classes=""
              heading="Next Schedule:"
              body=""
              actionItem={<h2 className="next-time-schedule">4:00PM</h2>}
            />
          </Cell>
        <Cell columns={4} desktopColumns={4} tabletColumns={8} phoneColumns={4}>
          <DashboardCard
              classes="recent-activities-available"
              heading="Recent Activity"
              body={activityLogs.length
                ? ActivityLogs()
                : BlankContent(
                  'There are no logs available currently.'
                )}
              actionItem={<ActionButton name="Clear logs" icon="delete_outline" />}
            />
        </Cell>
      </Row>
    </Grid>
  );
};

export const mapStateToProps = state => ({
  error: state.error,
  schedules: state.timeSchedules.schedules,
  status: state.timeSchedules.status,
  isLoading: state.timeSchedules.isLoading,
  enabled: state.timeSchedules.enabled,
  devices: state.user.devices,
  user: state.user,
});

export const mapDispatchToProps = dispatch => ({
  addNewSchedule: schedule => dispatch(addNewSchedule(schedule)),
  editSchedule: (scheduleId, schedule) => dispatch(editSchedule(scheduleId, schedule)),
  deleteSingleSchedule: scheduleId => dispatch(deleteSingleSchedule(scheduleId)),
  displaySnackMessage: message => dispatch(displaySnackMessage(message)),
  getAllSchedules: deviceId => dispatch(getAllSchedules(deviceId)),
  getPumpStatus: scheduleId => dispatch(getPumpStatus(scheduleId)),
  togglePump: status => dispatch(togglePump(status)),
  toggleScheduleStatus: (scheduleId, enabled) => dispatch(toggleScheduleStatus(scheduleId, enabled)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WaterCyclesPage);
