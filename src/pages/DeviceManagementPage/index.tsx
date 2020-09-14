import React, {
  useState,
  useEffect,
  useContext,
  ChangeEvent,
  FunctionComponent,
} from 'react';

// third-party libraries
import {
  Cell,
  Row,
} from '@material/react-layout-grid';
import { connect } from 'react-redux';
import {
  InputAdornment,
  Chip,
  TextField,
} from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { PhonelinkSetupSharp } from '@material-ui/icons';
import LinearProgressBar from '@components/LinearProgressBar';
// import { Pagination } from '@material-ui/lab';
import loadable from '@loadable/component';

// thunks
import {
  addNewDevice,
  deleteDevice,
  editDevice,
  getAllDevices,
} from '@modules/device';
import { displaySnackMessage } from '@modules/snack';

// styles
import './DeviceManagementPage.scss';

// interfaces
import {
  DeviceManagementProps,
  DeviceManagementState,
} from './interfaces';

// components
const CardInfo = loadable(() => import('@components/CardInfo'));
const Modal = loadable(() => import('@components/Modal'));
const Table = loadable(() => import('@components/Table'));

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      '& input:valid + fieldset': {
        borderColor: '#1967d2',
      },
      '& input:valid:focus + fieldset': {
        borderLeftWidth: 6,
        borderColor: '#1967d2',
        padding: '4px !important', // override inline-style
      },
    },
    margin: {
      margin: theme.spacing(1),
    },
    bottom: {
      position: 'fixed',
      bottom: 0,
      right: 0,
    },
  }),
);

export const DeviceManagementPage: FunctionComponent<DeviceManagementProps> = props => {
  const [state, setState] = useState<DeviceManagementState>({
    isEditMode: false,
    showDeviceModal: false,
    isFormModalOpen: false,
    devices: [],
    isDeleteModalOpen: false,
    deviceId: '',
    deviceToEdit: '',
    selectedDevice: '',
  });

  useEffect(() => {
    const getDevices = async () => await props.getAllDevices();
    getDevices().then(() => setState({ ...state, devices: props.devices }));
  }, [props.activeDevice]);

  const classes = useStyles(props);

  const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, selectedDevice: e.target.value });
  };

  const showDeviceModal = mode => event => {
    const { devices } = props;

    if (`show${mode}DeviceModal` && mode === 'Add') {
      setState(prevState => ({
        ...state,
        showDeviceModal: !prevState.showDeviceModal,
        isFormModalOpen: true,
        isEditMode: false,
      }));
    } else if (`show${mode}ScheduleModal` && mode === 'Edit') {
      const deviceId = event.target.id;
      const device = devices.filter(obj => obj._id === deviceId);

      setState(prevState => ({
        ...state,
        deviceId,
        deviceToEdit: device[0].id,
        showDeviceModal: !prevState.showDeviceModal,
        isFormModalOpen: true,
        isEditMode: true,
      }));
    }
  };

  const closeDeviceModal = (): void => {
    if (state.isEditMode) {
      setState({
        ...state,
        deviceToEdit: '',
        showDeviceModal: false,
        isFormModalOpen: false,
        deviceId: '',
      });
    }

    setState({
      ...state,
      showDeviceModal: false,
      isFormModalOpen: false,
      deviceId: '',
    });
  };

  const toggleDeviceDeleteModal = (): void => setState(prevState => ({
    ...prevState,
    isDeleteModalOpen: !prevState.isDeleteModalOpen,
  }));

  const handleDeviceDelete = event => {
    event.preventDefault();
    props.deleteDevice(state.deviceId).then(toggleDeviceDeleteModal);
  };

  const onAddEditDeviceSubmit = event => {
    event.preventDefault();
    const {
      isEditMode,
      deviceId,
      deviceToEdit,
      selectedDevice,
    } = state;

    const device = {
      id: isEditMode ? deviceToEdit : selectedDevice,
    };

    isEditMode
      ? props.editDevice(deviceId, device).then(closeDeviceModal)
      : props.addNewDevice(device).then(closeDeviceModal);
  };

  const ActionButtons = (device): JSX.Element => (
    <div key={device} className="action-buttons">
      <span id={device} onClick={showDeviceModal('Edit')}>
        <h5 id={device} className="action-buttons__edit">Edit</h5>
      </span>
      <span id={device} onClick={() => setState({ ...state, deviceId: device, isDeleteModalOpen: true })}>
        <h5 className="action-buttons__delete">Delete</h5>
      </span>
    </div>
  );

  const deviceStatus = (device): JSX.Element => {
    const { verified, enabled } = device[1];

    if (!verified) return <Chip className="MuiChip-root-unverified" label="Not Verified"/>;
    if (!enabled) return <Chip className="MuiChip-root-disabled" label="Disabled"/>;
    return <Chip className="MuiChip-root-enabled" label="Enabled"/>;
  };

  const TableContent = (devices): JSX.Element => {
    const tableHeaders = {
      DeviceID: { valueKey: 'deviceId', colWidth: '25' },
      User: { valueKey: 'user', colWidth: '25' },
      Status: { valueKey: 'status', colWidth: '25' },
      Actions: { valueKey: 'actions' },
    };

    const tableValues = devices.map((device, index) => ({
      id: device[1].id ?? index,
      deviceId: device[1].id ?? 'No device',
      user: device[1].user ? device[1].user.name : 'N/A',
      status: deviceStatus(device),
      actions: ActionButtons(device[1]._id),
    }));

    return (
      <Table
        keys={tableHeaders}
        values={tableValues}
      />
    );
  };

  const RenderDeviceForm = (): JSX.Element => {
    const { isEditMode, selectedDevice, deviceToEdit } = state;

    return (
      <>
        <h5>Add a 7 digit device identifier for the user to configure.</h5>
        <div className="form-cell">
          <TextField
            label={`${isEditMode ? 'Update' : 'Add new'} device ID`}
            defaultValue={isEditMode ? deviceToEdit : selectedDevice}
            className={`${classes.root} mdc-text-field--fullwidth`}
            variant="outlined"
            onChange={handleValueChange}
            InputProps={{
              startAdornment:
                <InputAdornment position="start">
                  <PhonelinkSetupSharp/>
                </InputAdornment>
              ,
            }}
          />
        </div>
      </>
    );
  };

  const AddEditDeviceModal = (): JSX.Element => (
    <Modal
      isModalOpen={state.isFormModalOpen}
      renderContent={() => RenderDeviceForm()}
      onClose={() => setState({ ...state, isFormModalOpen: false })}
      renderHeader={() => state.isEditMode ? 'Update device' : 'Add new device'}
      submitButtonName={state.isEditMode ? 'Update device' : 'Create new device'}
      onSubmit={onAddEditDeviceSubmit}
      onDismiss={closeDeviceModal}
    />
  );

  const DeleteDeviceModal = (): JSX.Element => (
    <Modal
      isModalOpen={state.isDeleteModalOpen}
      renderContent={() => <h5>Do you confirm deletion of device?</h5>}
      onClose={toggleDeviceDeleteModal}
      renderHeader={() => 'Delete Device'}
      submitButtonName="Delete"
      onSubmit={handleDeviceDelete}
      onDismiss={toggleDeviceDeleteModal}
    />
  );

  return (
    <Row data-testid="device-management-page" className="device-management-page">
      <Cell columns={12} desktopColumns={12} tabletColumns={8} phoneColumns={4}>
        <CardInfo
          mainHeader="Device Management"
          subHeader="Add a new device to the database for the user"
          icon={<PhonelinkSetupSharp className="content-icon"/>}
          buttonName="New device"
          onClick={showDeviceModal('Add')}
        />
        <React.Suspense fallback={<LinearProgressBar/>}>
          <div className="user-roles-page__table">
            {TableContent(Object.entries(props.devices))}
            {/*<div className={classes.root}>*/}
            {/*  <Pagination count={5} />*/}
            {/*</div>*/}
          </div>
        </React.Suspense>
        {AddEditDeviceModal()}
        {DeleteDeviceModal()}
      </Cell>
    </Row>
  );
};

export const mapStateToProps = state => ({
  devices: state.device.devices,
  activeDevice: state.device.activeDevice,
});

export const mapDispatchToProps = dispatch => ({
  displaySnackMessage: message => dispatch(displaySnackMessage(message)),
  getAllDevices: () => dispatch(getAllDevices()),
  addNewDevice: device => dispatch(addNewDevice(device)),
  editDevice: (deviceId, device) => dispatch(editDevice(deviceId, device)),
  deleteDevice: deviceId => dispatch(deleteDevice(deviceId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DeviceManagementPage);
