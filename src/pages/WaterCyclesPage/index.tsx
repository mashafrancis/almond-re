import { validateOneHourTime } from '@utils/helpers/validateTimeOneHour';
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
import OpacityIcon from '@material-ui/icons/Opacity';
import BlurCircularIcon from '@material-ui/icons/BlurCircular';
import FaceIcon from "@material-ui/icons/Face";
import CardInfo from "@components/CardInfo";
import GeneralCardInfo from "@components/GeneralInfoCard";

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
import {AreaChartDisplay, DoughnutChartDisplay} from "@components/Charts";

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
    selectedTimeSchedule: new Date(),
    hasError: false,
  });

  const menu = React.useContext(MenuContext);
  const user = React.useContext(UserContext);

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

  React.useEffect(() => {
    const { selectedTimeSchedule } = state;
    const schedules = [...new Set(props.schedules.map(item => item.schedule))];
    const validate = validateOneHourTime(schedules, selectedTimeSchedule);
    if (validate) {
      setState({ ...state, hasError: true });
    } else if (!validate || undefined) {
      setState({ ...state, hasError: false });
    }
  },              [state.selectedTimeSchedule]);

  // React.useEffect(() => {
  //   const { scheduleToEdit } = state;
  //   const schedules = [...new Set(props.schedules.map(item => item.schedule))];
  //   const validateEdit = validateOneHourTime(schedules, scheduleToEdit);
  //   if (validateEdit) {
  //     setState({ ...state, hasError: true });
  //   } else if (validateEdit === false || undefined) {
  //     setState({ ...state, hasError: false });
  //   }
  // },              [state.scheduleToEdit]);

  const areEqual = (prevProps, nextProps) => (prevProps.isChecked === nextProps.isChecked);

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

  const handleAddTimeSchedule = value => setState({ ...state, selectedTimeSchedule: value });

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
        hasError: false,
      });
    }

    setState({
      ...state,
      showScheduleModal: false,
      isFormModalOpen: false,
      hasError: false,
    });
  };

  const toggleScheduleDeleteModal = () => setState({ ...state, isDeleteModal: !state.isDeleteModal });

  const handleScheduleDelete = (event) => {
    event.preventDefault();
    props.deleteSingleSchedule(state.scheduleId).then(toggleScheduleDeleteModal);
  };

  const onAddEditScheduleSubmit = (event) => {
    event.preventDefault();
    const {
      isEditMode,
      scheduleId,
      scheduleToEdit,
      selectedTimeSchedule,
    } = state;

    const schedule = {
      schedule: isEditMode ? scheduleToEdit : selectedTimeSchedule,
      deviceId: user.activeDevice._id,
    };

    isEditMode
      ? props.editSchedule(scheduleId, schedule).then(closeScheduleModal)
      : props.addNewSchedule(schedule).then(closeScheduleModal);
  };

  const BlankContent = message => (
    <div className="blank-content">
      <h2>{message}</h2>
    </div>
  );

  const AddEditScheduleModal = () => (
    <Modal
      isModalOpen={state.isFormModalOpen}
      renderContent={() => RenderTimeScheduleForm()}
      onClose={() => setState({ ...state, isFormModalOpen: false })}
      renderHeader={() => state.isEditMode ? 'Edit time schedule' : 'Create a new time schedule'}
      submitButtonName={state.isEditMode ? 'Update schedule' : 'Create new schedule'}
      onSubmit={onAddEditScheduleSubmit}
      onDismiss={closeScheduleModal}
      disabled={state.hasError}
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
      Time: { valueKey: 'time', colWidth: '30' },
      Actions: { valueKey: 'actions', colWidth: '45' },
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

  // const ActivityLogs = () => {
  //   return (
  //     <React.Fragment>
  //     {
  //       activityLogs.map((logs, index) => {
  //         return (
  //           <ActivityLogCard
  //             key={index}
  //             log={logs.message}
  //             date={logs.date}
  //             type={logs.type}
  //           />
  //         );
  //       })
  //     }
  //     </React.Fragment>
  //   );
  // };

  const RenderTimeScheduleForm = () => {
    const {
      isEditMode,
      selectedTimeSchedule,
      scheduleToEdit,
      hasError,
    } = state;

    return (
      <React.Fragment>
        <div className="form-cell">
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <TimePicker
              className="mdc-text-field--fullwidth"
              name="time_schedule"
              inputVariant="outlined"
              label="time schedule"
              value={isEditMode ? scheduleToEdit : selectedTimeSchedule}
              onChange={isEditMode ? handleEditTimeChange : handleAddTimeSchedule}
              {...(hasError ? { error: true } : {})}
              {...(hasError ? { helperText: 'Schedule time has to be at least one hour apart' } : {})}
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
                <MaterialIcon hasRipple icon="arrow_drop_down" initRipple={null}/>
              </h3>
            </div>
          </div>
        </Cell>
      </Row>
      <Row>
        <Cell columns={6} desktopColumns={6} tabletColumns={8} phoneColumns={4}>
          <GeneralCardInfo
            mainHeader="Manual Override"
            subHeader="Pump water directly into the system"
            icon={<BlurCircularIcon className="content-icon general-info-icon" />}
            actionItem={
              <Switch
                className="manual-override"
                onChange={handleToggleButtonOnChange}
                checked={props.enabled}
              />
            }
          />
          <CardInfo
            mainHeader="Water Schedules"
            subHeader="Create a new water schedule for your pump cycle"
            icon={<OpacityIcon className="content-icon" />}
            buttonName="Add schedule"
            onClick={showScheduleModal('Add')}
          />
          <DashboardCard
            classes="recent-activities-available"
            heading="Water Schedules"
            body={
              (props.schedules.length > 0)
                ? TableContent(Object.entries(props.schedules))
                : BlankContent(
                'Click the + to add a new pump time schedule or toggle the manual override to turn on and off the pump'
                )
            }
          />
          {AddEditScheduleModal()}
          {DeleteScheduleModal()}
        </Cell>
        <Cell columns={6} desktopColumns={6} tabletColumns={8} phoneColumns={4}>
          <DashboardCard
              classes="recent-activities-available"
              heading="Water Temperature"
              body={<AreaChartDisplay />}
              actionItem={<ActionButton name="Filter" icon="filter_list" />}
          />
          <DashboardCard
            classes="recent-activities-available"
            heading="Water Tank Level"
            body={<DoughnutChartDisplay />}
            // actionItem={<ActionButton name="Refresh" icon="update" />}
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
