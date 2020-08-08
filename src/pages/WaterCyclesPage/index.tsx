import * as React from 'react';

// third-party libraries
import {
  Cell,
  Row,
} from '@material/react-layout-grid';
import * as moment from 'moment';
import { connect } from 'react-redux';
import { useMqttState } from 'mqtt-hooks';
import loadable from '@loadable/component'
import ActionButton from '@components/ActionButton';
import DateFnsUtils from '@date-io/date-fns';
import {
  IconButton,
  InputAdornment,
  Switch,
} from '@material-ui/core';
import { MuiPickersUtilsProvider, TimePicker } from '@material-ui/pickers';
import LinearProgressBar from '@components/LinearProgressBar';
import withStyles from '@material-ui/core/styles/withStyles';

// icons
import {
  BlurCircular,
  ScheduleTwoTone,
  AddAlarmTwoTone,
  ArrowDropDown,
  DateRange,
} from '@material-ui/icons';

// thunks
import { displaySnackMessage } from '@modules/snack';
import {
  addNewSchedule,
  deleteSingleSchedule,
  editSchedule,
  getAllSchedules,
  getPumpStatus,
  togglePump,
  toggleScheduleStatus,
} from '@modules/timeSchedules';
import { getWaterData } from '@modules/sensorData';
import { MenuContext } from '@context/MenuContext';
import { UserContext } from '@context/UserContext';

// utils
import { validateOneHourTime } from '@utils/helpers/validateTimeOneHour';

// styles
import './WaterCyclesPage.scss';
import {
  ToggleSwitch,
} from '@pages/WaterCyclesPage/styles';

// interfaces
import {
  WaterCyclesPageProps,
  WaterCyclesPageState,
} from './interfaces';
import roundDigit from '@utils/helpers/roundDigit';

// components
const CardInfo = loadable(() => import('@components/CardInfo'));
const GeneralCardInfo = loadable(() => import('@components/GeneralCardInfo'));
const Modal = loadable(() => import('@components/Modal'));
const Table = loadable(() => import('@components/Table'));
const DashboardCard = loadable(() => import('@components/DashboardCard'));
const DonutDisplay = loadable(() => import('@components/DonutDisplay'));
const AreaChardDisplay = loadable(() => import('@components/AreaChartDisplay'));

export const WaterCyclesPage = (props: WaterCyclesPageProps): JSX.Element => {
  const [state, setState] = React.useState<WaterCyclesPageState>({
    isEditMode: false,
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
    schedules: [{
      _id: '',
      schedule: '',
      enabled: false,
      createdAt: '',
      updatedAt: '',
      user: '',
    }],
  });

  const menu = React.useContext(MenuContext);
  const user = React.useContext(UserContext);

  const { mqtt } = useMqttState();

  React.useEffect(() => {
    setState({ ...state, isLoading: true });
    const getSchedules = async () => await props.getAllSchedules(user.activeDevice._id);
    getSchedules().then(() => setState(prevState => ({
      ...prevState,
      isLoading: false,
      schedules: props.schedules,
    })));
  }, [props.schedules, user.activeDevice._id]);

  React.useEffect(() => {
    props.getPumpStatus(user.activeDevice._id)
      .then(() => setState({ ...state, isEnabled: props.enabled }));
  }, [user.activeDevice._id]);

  React.useEffect(() => {
    const { selectedTimeSchedule } = state;
    const schedules = [...new Set(props.schedules.map(item => item.schedule))];
    const validate = validateOneHourTime(schedules, selectedTimeSchedule);
    if (validate) setState({ ...state, hasError: true });
    setState({ ...state, hasError: false });
  }, [state.selectedTimeSchedule]);

  // React.useEffect(() => {
  //   props.getWaterData();
  // }, []);

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

  const heightOfTank = 11; // units in centimeters
  const waterLevel = heightOfTank ? (props.waterData.waterLevel || heightOfTank) : heightOfTank;
  const heightOfWater = roundDigit(((heightOfTank - waterLevel) / heightOfTank) * 100, 0);

  const PumpSwitch = withStyles({
    switchBase: {
      color: '#FFFFFF',
      '&$checked': {
        color: '#1967D2',
      },
      '&$checked + $track': {
        backgroundColor: '#1967D2',
      },
    },
    thumb: {
      width: 20,
      height: 20,
      animation: '$blink 1s ease infinite',
    },
    checked: {},
    track: {
      borderRadius: 20,
    },
    '@keyframes blink': {
      '50%': {
        transform: 'scale (1)',
        backgroundColor: '#1967D2',
      },
    },
  })(Switch);

  const handleClick = message => mqtt.publish('almond/pump', message);

  const handleTogglePumpOnChange = event => {
    event.target.checked
      ? props.togglePump({ enabled: true, device: user.activeDevice._id })
        .then(() => {
          setState({ ...state, statusClass: 'tbl-status' });
          handleClick(1)
        })
      : props.togglePump({ enabled: false, device: user.activeDevice._id })
        .then(() => {
          setState({ ...state, statusClass: '' });
          handleClick(0)
        });
  };

  const handleToggleStatusChange = async (event, schedule) => {
    const { checked } = event.target;
    await props.toggleScheduleStatus(schedule._id, { enabled: checked, device: user.activeDevice._id });
  };

  const handleAddTimeSchedule = value => {
    setState(prevState => ({
      ...prevState,
      selectedTimeSchedule: value,
    }));
  };

  const handleEditTimeChange = value => {
    setState(prevState => ({
      ...prevState,
      scheduleToEdit: value,
    }));
  };

  const showScheduleModal = mode => event => {
    event.preventDefault();
    const { schedules } = props;

    switch (mode) {
      case 'Add':
        setState(prevState => ({
          ...state,
          showScheduleModal: !prevState.showScheduleModal,
          isFormModalOpen: !prevState.isFormModalOpen,
          isEditMode: false,
        }));
        break;
      case 'Edit':
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

  const toggleScheduleDeleteModal = () => {
    setState(prevState => ({
      ...prevState,
      isDeleteModal: !prevState.isDeleteModal
    }));
  }

  const handleScheduleDelete = event => {
    event.preventDefault();
    props.deleteSingleSchedule(state.scheduleId).then(toggleScheduleDeleteModal);
  };

  const onAddEditScheduleSubmit = event => {
    event.preventDefault();
    const {
      isEditMode,
      scheduleId,
      scheduleToEdit,
      selectedTimeSchedule,
    } = state;

    const schedule = {
      schedule: isEditMode ? scheduleToEdit : selectedTimeSchedule,
      device: user.activeDevice._id,
    };

    isEditMode
      ? props.editSchedule(scheduleId, schedule).then(closeScheduleModal)
      : props.addNewSchedule(schedule).then(closeScheduleModal);
  };

  const BlankContent = message => (
    <div className="blank-content"><h2>{message}</h2></div>
  );

  const AddEditScheduleModal = () =>
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
  ;

  const DeleteScheduleModal = () =>
    <Modal
      isModalOpen={state.isDeleteModal}
      renderContent={() => <p className="delete-modal-content">Do you confirm deletion of time schedule?</p>}
      onClose={toggleScheduleDeleteModal}
      renderHeader={() => 'Delete Time Schedule'}
      submitButtonName="Delete schedule"
      onSubmit={handleScheduleDelete}
      onDismiss={toggleScheduleDeleteModal}
    />
  ;

  const ActionButtons = schedule =>
    <div key={schedule} className="action-buttons">
      <span id={schedule} onClick={showScheduleModal('Edit')}>
        <h5 id={schedule} className="action-buttons__edit">Edit</h5>
      </span>
      <span id={schedule} onClick={() => setState({ ...state, scheduleId: schedule, isDeleteModal: true })}>
        <h5 className="action-buttons__delete">Delete</h5>
      </span>
    </div>
  ;

  const TableContent = timeSchedule => {
    const tableHeaders = {
      Time: { valueKey: 'time', colWidth: '30' },
      Actions: { valueKey: 'actions', colWidth: '45' },
      Status: { valueKey: 'status' },
    };

    const tableValues = timeSchedule.map(schedule => ({
      id: schedule,
      time: `${moment(schedule[1].schedule).format('LT')}`,
      actions: ActionButtons(schedule[1]._id),
      status: <ToggleSwitch
        checked={schedule[1].enabled}
        onChange={e => handleToggleStatusChange(e, schedule[1])}
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

  const RenderTimeScheduleForm = () => {
    const {
      isEditMode,
      selectedTimeSchedule,
      scheduleToEdit,
      hasError,
    } = state;

    return (
      <>
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
                startAdornment:
                  <InputAdornment position="start">
                    <IconButton href="#">
                      <AddAlarmTwoTone style={{ color: '#1967D2' }}/>
                    </IconButton>
                  </InputAdornment>
                ,
              }}
            />
          </MuiPickersUtilsProvider>
          <p
            className="mdc-text-field-helper-text mdc-text-field-helper-text--validation-msg
            mdc-text-field-helper-text--persistent mdc-text-field-helper-text--validation-msg"
            aria-hidden="false"
          />
        </div>
      </>
    );
  };

  // :TODO Avoid wasteful re-rendering while using inline functions (use .bind on the function as below)
  return (
    <>
      {console.log('Class: , Function: WaterCyclesPage, Line 368 state.schedules():', state.schedules)}
      <Row>
        <Cell columns={7} desktopColumns={7} tabletColumns={8} phoneColumns={4}>
          <div className="main-subheader">
            <div className="device-header-container" onClick={menu.setDeviceModalOpen.bind(null, true)}>
              <h3 className="main-subheader__device-id">
                {`Device ID: ${user.activeDevice.id}`}
                <ArrowDropDown/>
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
            icon={<BlurCircular className="content-icon general-info-icon"/>}
            actionItem={
              <PumpSwitch
                className="manual-override"
                onChange={e => handleTogglePumpOnChange(e)}
                checked={props.enabled}
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />
            }
          />
          <CardInfo
            mainHeader="Water Schedules"
            subHeader="Create a new water schedule for your pump cycle"
            icon={<ScheduleTwoTone className="content-icon"/>}
            buttonName="Add schedule"
            onClick={showScheduleModal('Add')}
          />
          <DashboardCard
            classes="recent-activities-available"
            heading="Water Schedules"
            body={
              props.schedules.length > 0 ?
                <React.Suspense fallback={<LinearProgressBar/>}>
                  {TableContent(Object.entries(props.schedules))}
                </React.Suspense>
                : BlankContent(
                'Click the + to add a new pump time schedule or toggle the manual override to turn on and off the pump',
                )
            }
          />
          {AddEditScheduleModal()}
          {DeleteScheduleModal()}
        </Cell>
        <Cell columns={6} desktopColumns={6} tabletColumns={8} phoneColumns={4}>
          <DashboardCard
            classes="recent-activities-available "
            heading="Water Tank Level"
            body={
              <DonutDisplay
                backgroundColor={['#CCCCCC', '#36A2EB']}
                hoverBackgroundColor={['#CCCCCC', '#2d9fec']}
                data={[waterLevel, heightOfTank - waterLevel]}
                donutInfo={`${heightOfWater}%`}
                halfDonut={false}
              />
            }
          />
          <DashboardCard
            classes="recent-activities-available"
            heading="Water Temperature"
            body={
              <AreaChardDisplay
                backgroundColor="rgba(25, 103, 210, 0.2)"
                chartColor="#1967D2"
                chartData={[15, 16, 20, 27, 21, 24, 21, 19, 16]}
              />
            }
            actionItem={<ActionButton name="Today" icon={<DateRange/>}/>}
          />
        </Cell>
      </Row>
    </>
  );
};

export const mapStateToProps = state => ({
  schedules: state.timeSchedules.schedules,
  status: state.timeSchedules.status,
  isLoading: state.timeSchedules.isLoading,
  enabled: state.timeSchedules.enabled,
  devices: state.user.devices,
  user: state.user,
  waterData: state.sensorData.waterData,
});

export const mapDispatchToProps = dispatch => ({
  addNewSchedule: schedule => dispatch(addNewSchedule(schedule)),
  editSchedule: (scheduleId, schedule) => dispatch(editSchedule(scheduleId, schedule)),
  deleteSingleSchedule: scheduleId => dispatch(deleteSingleSchedule(scheduleId)),
  displaySnackMessage: message => dispatch(displaySnackMessage(message)),
  getAllSchedules: deviceId => dispatch(getAllSchedules(deviceId)),
  getPumpStatus: deviceId => dispatch(getPumpStatus(deviceId)),
  togglePump: payload => dispatch(togglePump(payload)),
  toggleScheduleStatus: (scheduleId, payload) => dispatch(toggleScheduleStatus(scheduleId, payload)),
  getWaterData: () => dispatch(getWaterData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(WaterCyclesPage);
