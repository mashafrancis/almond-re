import * as React from 'react';

// third-party libraries
import {
  Cell,
  Grid,
  Row
} from '@material/react-layout-grid';
import { connect } from 'react-redux';

// components
import ActionButton from '@components/ActionButton';
import DashboardCard from '@components/DashboardCard';
import Modal from '@components/Modal';
import Table from '@components/Table';
import Chip from '@material-ui/core/Chip';
import InputAdornment from '@material-ui/core/InputAdornment';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import PhonelinkSetupSharpIcon from '@material-ui/icons/PhonelinkSetupSharp';

// thunks
import {
  addNewDevice,
  deleteDevice,
  editDevice,
  getAllDevices
} from '@modules/device';
import { displaySnackMessage } from '@modules/snack';

// styles
import './DeviceManagementPage.scss';

// interfaces
import {
  DeviceManagementProps,
  DeviceManagementState
} from './interfaces';

export const DeviceManagementPage: React.FunctionComponent<DeviceManagementProps> = (props) => {
  const [state, setState] = React.useState<DeviceManagementState>({
    isEditMode: false,
    showDeviceModal: false,
    isFormModalOpen: false,
    devices: [],
    isDeleteModal: false,
    deviceId: '',
    deviceToEdit: '',
    selectedDevice: '',
  });

  React.useEffect(() => {
    const getDevices = async () => {
      await props.getAllDevices();
    };
    getDevices().then(() => setState({ ...state, devices: props.devices }));
  },              [props.activeDevice]);

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
     })
  );

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, selectedDevice: e.target.value });
  };

  const showDeviceModal = mode => (event) => {
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

  const closeDeviceModal = () => {
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

  const toggleDeviceDeleteModal = () => setState({ ...state, isDeleteModal: !state.isDeleteModal });

  const handleDeviceDelete = (event) => {
    event.preventDefault();
    props.deleteDevice(state.deviceId).then(toggleDeviceDeleteModal);
  };

  const onAddEditDeviceSubmit = (event) => {
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

  const ActionButtons = device => (
    <div key={device} className="action-buttons">
      <span id={device} onClick={ showDeviceModal('Edit')}>
        <h5 id={device} className="action-buttons__edit">Edit</h5>
      </span>
      <span id={device} onClick={ () => setState({ ...state, deviceId: device, isDeleteModal: true })}>
        <h5 className="action-buttons__delete">Delete</h5>
      </span>
    </div>
  );

  const chipContent = (label, classes) => (
    <Chip className={classes} label={label}  />
  );

  const deviceStatus = (device) => {
    const verified = device[1].verified;
    const enabled = device[1].enabled;

    if (!verified) { return <Chip className="MuiChip-root-unverified" label="Not Verified"  />; }
    if (verified && !enabled) { return <Chip className="MuiChip-root-disabled" label="Disabled"  />; }
    return <Chip className="MuiChip-root-enabled" label="Enabled"  />;

    // switch (device) {
    //   case !verified:
    //     return chipContent('Not Verified', 'MuiChip-root-unverified');
    //   case verified && enabled:
    //     return <Chip className="MuiChip-root-enabled" label="Enabled"  />;
    //   case verified:
    //     return <Chip className="MuiChip-root-disabled" label="Disabled"  />;
    //   default:
    //     return null;
    // }
  };

  const TableContent = (devices) => {
    const tableHeaders = {
      DeviceID: { valueKey: 'deviceId', colWidth: '20' },
      User: { valueKey: 'user', colWidth: '30' },
      Status: { valueKey: 'status', colWidth: '25' },
      Actions: { valueKey: 'actions', colWidth: '5' },
    };

    const tableValues = devices.map(device => ({
      deviceId: device[1].id,
      user: device[1].user ? device[1].user.name : '#Not assigned',
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

  const RenderDeviceForm = () => {
    const { isEditMode, selectedDevice, deviceToEdit } = state;
    const classes = useStyles(props);

    return (
      <React.Fragment>
        <h5>Add a 7 digit device identifier for the user to configure.
        </h5>
        <div className="form-cell">
          <TextField
            label={`${isEditMode ? 'Update' : 'Add new'} device ID`}
            defaultValue={isEditMode ? deviceToEdit : selectedDevice}
            className={`${classes.root} mdc-text-field--fullwidth`}
            variant="outlined"
            onChange={handleValueChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PhonelinkSetupSharpIcon />
                </InputAdornment>
              ),
            }}
          />
        </div>
      </React.Fragment>
    );
  };

  const AddEditDeviceModal = () => (
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

  const DeleteDeviceModal = () => (
    <Modal
      isModalOpen={state.isDeleteModal}
      renderContent={() => <p className="delete-modal-content">Do you confirm deletion of device?</p>}
      onClose={toggleDeviceDeleteModal}
      renderHeader={() => 'Delete Device'}
      submitButtonName="Delete"
      onSubmit={handleDeviceDelete}
      onDismiss={toggleDeviceDeleteModal}
    />
  );

  return (
    <Grid>
      <Row>
        <Cell columns={12} desktopColumns={12} tabletColumns={8} phoneColumns={4}>
          <DashboardCard
            classes=""
            heading="Device Management"
            actionItem={
              <ActionButton
                name="Add device"
                icon="add"
                handleClick={showDeviceModal('Add')}
              />
            }
            body={
              <React.Fragment>
                <div className="user-roles-page__table">
                  { TableContent(Object.entries(props.devices)) }
                </div>
              </React.Fragment>
            }
          />
          {AddEditDeviceModal()}
          {DeleteDeviceModal()}
        </Cell>
      </Row>
    </Grid>
  );
};

export const mapStateToProps = state => ({
  error: state.error,
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
