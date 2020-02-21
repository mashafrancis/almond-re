import * as React from 'react';

// third-party libraries
import { createStyles, TextField, Theme } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';
import makeStyles from '@material-ui/core/styles/makeStyles';
import AllOutTwoToneIcon from '@material-ui/icons/AllOutTwoTone';
import MaterialIcon from '@material/react-material-icon';
import MenuSurface, { Corner } from '@material/react-menu-surface';
import {
  TopAppBarFixedAdjust,
  TopAppBarIcon
} from '@material/react-top-app-bar';
import { connect } from 'react-redux';

// components;
import {
  DeviceContext,
  MenuContext,
  UserContext
} from '@components/Context';
import FeedbackDialogModal from '@components/FeedbackDialogModal';
import { MenuContent } from '@components/MenuContent';
import MenuModal from '@components/MenuModal';
import { TopBar } from '@components/TopBar';

// thunks
import { activateDevice } from '@modules/device';
import { getUserDetails, logoutUser } from '@modules/user';

// interfaces
import {
  DashboardContainerProps,
  DashboardContainerState
} from './interfaces';

// styles
import '@pages/DashboardContainer/DashboardNavBar.scss';
import '../../assets/scss/RegisterPage.scss';
import './DashboardContainer.scss';

const viewPort = window.innerWidth;

const DashboardContainer: React.FunctionComponent<DashboardContainerProps> = (props) => {
  const [state, setState] = React.useState<DashboardContainerState>({
    isOpen: false,
    isMenuOpen: false,
    selectedIndex: 0,
    isLoading: true,
    isFeedbackMenuOpen: false,
    isFeedbackModal: false,
    isSelectDeviceModalOpen: false,
    device: '',
    activeDevice: {
      id: '',
      _id: '',
    },
    action: '',
    fields: {},
    feedback: '',
    menu: {
      isOpen: false,
      selectedIndex: 0,
    },
  });

  const user = React.useContext(UserContext);

  React.useEffect(() => {
    setState({
      ...state,
      activeDevice: user.activeDevice,
      device: props.user.activeDevice ? props.user.activeDevice.id : '#no device',
    });
  },              [props.user.activeDevice]);

  const menuAnchorEl = React.useRef<any>(null);

  const setOpen = (isOpen: boolean) => {
    const menu = state.menu;
    setState({
      ...state,
      menu: {
        ...menu,
        isOpen: menu.isOpen = isOpen,
      },
    });
  };

  const setDeviceModalOpen = (isModalOpen: boolean) => {
    setState({
      ...state,
      isSelectDeviceModalOpen: isModalOpen,
    });
  };

  const setSelectedIndex = () => setState({ ...state, selectedIndex: 1 });

  const onFeedbackMenuOpenClose = () => setState({ ...state, isFeedbackMenuOpen: false });

  const handleFeedbackInputChange = e => setState({ ...state, [e.target.name as string]: e.target.value });

  const handleSelectDeviceModal = () => {
    setState({
      ...state,
      isSelectDeviceModalOpen: !state.isSelectDeviceModalOpen,
      device: '',
    });
  };

  const handleSelectDevice = () => {
    const deviceId = user.devices.filter(device => device.id === state.device);
    props.activateDevice({ id: deviceId[0]._id })
      .then(async () => {
        await props.getUserDetails();
      });
    handleSelectDeviceModal();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      device: event.target.value,
    });
  };

  const logoutUser = () => {
    window.location.replace('/');
    props.logoutUser();
  };

  const photoImage = () => (
    <TopAppBarIcon actionItem tabIndex={0}>
      <div role="tablist"
           ref={e => menuAnchorEl.current = e}
           className="mdc-tab-bar"
           onClick={() => setState({ ...state, isOpen: true })}
      >
        <span className="mini-account-menu__image">
          {(viewPort > 539) &&
          <img
            className="mini-account-menu__image"
            src={user.photo}
            alt="image"
          />}
        </span>
      </div>
    </TopAppBarIcon>
  );

  const FeedbackMenu = () => (
    <MenuSurface
      className="feedback-surface-menu"
      open={state.isFeedbackMenuOpen}
      anchorCorner={Corner.BOTTOM_LEFT}
      onClose={onFeedbackMenuOpenClose}
      anchorElement={menuAnchorEl.current}
    >
      <MenuModal content={
        <div
          className="menu-feedback"
          onClick={() => setState({ ...state, isFeedbackModal: true, isFeedbackMenuOpen: false })}
        >
          <h5>Send feedback</h5>
          <MaterialIcon hasRipple icon="feedback" initRipple={null}/></div>
      }/>
    </MenuSurface>
  );

  const useStyles = makeStyles((theme: Theme) => createStyles({
    focused: {},
    listItemPadding: {
      paddingTop: 0,
      paddingBottom: 0,
    },
    selectHeight: {
      height: '1.25em',
    },
    labelColor: {
      '&$focused': {
        color: `rgba(${25},${103},${210},${0.87})`,
      },
    },
    font: {
      fontFamily: '"Google Sans", "Roboto", "Helvetica Neue", sans-serif !important',
    },
  }));

  const styles = useStyles(props);

  const SelectDeviceModal = devices => (
    <Dialog
      open={state.isSelectDeviceModalOpen}
      onClose={handleSelectDeviceModal}
    >
      <DialogTitle>
        <p className="headline-3">Select the device ID</p>
      </DialogTitle>
      <DialogContent>
        <TextField
          id="device"
          select
          variant="outlined"
          label="device"
          fullWidth
          size="small"
          value={state.device}
          onChange={handleInputChange}
          SelectProps={{
            classes: {
              selectMenu: styles.selectHeight,
            },
          }}
          InputLabelProps={{
            classes: {
              focused: styles.focused,
              root: styles.labelColor,
            },
          }}
          InputProps={{
            startAdornment: <InputAdornment position="start">
              <AllOutTwoToneIcon style={{ color: '#1967D2' }} />
            </InputAdornment>,
          }}>
          {devices.map(device => (
            <MenuItem key={device.id} value={device.id}>
              <h4 className="headline-4">{device.id}</h4>
            </MenuItem>
          ))}
        </TextField>
      </DialogContent>
      <DialogActions>
        <button className="mdc-button" onClick={handleSelectDeviceModal}>
          <span className="mdc-button__label">Dismiss</span>
        </button>
        <button className="mdc-button" onClick={handleSelectDevice}>
          <span className="mdc-button__label">Confirm</span>
        </button>
      </DialogActions>
    </Dialog>
  );

  const topIcons = [
    {
      icon: 'notifications_none',
      clickEvent: () => setState({ ...state, isFeedbackMenuOpen: true, isFeedbackModal: false }),
    },
    {
      icon: 'more_vert',
      clickEvent: () => setState({ ...state, isFeedbackMenuOpen: true, isFeedbackModal: false }),
    },
  ];

  const { component, title } = props;
  const { isOpen, selectedIndex } = state.menu;
  const { isFeedbackModal, feedback, action } = state;

  return (
    <MenuContext.Provider
      value={{
        isOpen,
        selectedIndex,
        setSelectedIndex,
        setOpen,
        logoutUser,
        setDeviceModalOpen,
      }}
    >
      <DeviceContext.Provider
        value={{
          controlledDevice: props.activeDevice.id,
        }}
      >
        <div className="dashboard">
          <MenuContent
            name={user.name}
            photo={user.photo}
          />
          <TopBar
            pageTitle={title}
            photoImage={photoImage()}
            topIcons={topIcons}
          />
          <TopAppBarFixedAdjust>{component}</TopAppBarFixedAdjust>
          {FeedbackMenu()}
          {SelectDeviceModal(user.devices)}
          <FeedbackDialogModal
            isFeedbackModal={isFeedbackModal}
            action={action}
            inputValue={feedback}
            handleFeedbackInputChange={handleFeedbackInputChange}
          />
        </div>
      </DeviceContext.Provider>
    </MenuContext.Provider>
  );
};

export const mapStateToProps = state => ({
  user: state.user.user,
  activeDevice: state.device.activeDevice,
});

export const mapDispatchToProps = dispatch => ({
  getUserDetails: () => dispatch(getUserDetails()),
  logoutUser: () => dispatch(logoutUser()),
  activateDevice: id => dispatch(activateDevice(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);
