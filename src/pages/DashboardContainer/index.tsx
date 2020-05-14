import * as React from 'react';

// third-party libraries
import {
  createStyles,
  TextField,
  Theme
} from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import makeStyles from '@material-ui/core/styles/makeStyles';
import AllOutTwoToneIcon from '@material-ui/icons/AllOutTwoTone';
import FaceIcon from '@material-ui/icons/Face';
import MenuSurface, { Corner } from '@material/react-menu-surface';
import {
  TopAppBarFixedAdjust,
  TopAppBarIcon
} from '@material/react-top-app-bar';
import { connect } from 'react-redux';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import FeedbackIcon from '@material-ui/icons/Feedback';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import MoodIcon from '@material-ui/icons/Mood';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SettingsIcon from '@material-ui/icons/Settings';
import HelpIcon from '@material-ui/icons/Help';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';

// components;
import PageBottomNavigation from '@components/BottomNavigation';
import FeedbackDialogModal from '@components/FeedbackDialogModal';
import { MenuContent } from '@components/MenuContent';
import MenuModal from '@components/MenuModal';
import {
  AdminMenus,
  UserMenus
} from '@components/MenuRoutes';
import Modal from '@components/Modal';
import { TopBar } from '@components/TopBar';

// const Modal = React.lazy(() => import('@components/Modal'));

// utils
import { UserContext } from '@utils/context';
import { useViewport } from '../../hooks';
import { MenuContext } from "@context/MenuContext";
import { activityLogs } from "@pages/WaterCyclesPage/fixtures";
import ActivityLogCard from "@components/ActivityLogCard";

// thunks
import { activateDevice } from '@modules/device';
import { updatePerson } from '@modules/people';
import { getUserDetails, logoutUser } from '@modules/user';

// interfaces
import {
  DashboardContainerProps,
  DashboardContainerState
} from './interfaces';

// styles
// import '@pages/DashboardContainer/DashboardNavBar.scss';
// import '../../assets/scss/RegisterPage.scss';
import './DashboardContainer.scss';

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

const DashboardContainer: React.FunctionComponent<DashboardContainerProps> = (props) => {
  const [state, setState] = React.useState<DashboardContainerState>({
    isOpen: false,
    isLoading: true,
    isFeedbackMenuOpen: false,
    isFeedbackModal: false,
    device: '',
    activeDevice: {
      id: '',
      _id: '',
    },
    action: '',
    fields: {},
    feedback: '',
    isChangeRoleDialogOpen: false,
    anchorEl: null,
    roleSelected: '',
    roleId: '',
  });

  const styles = useStyles(props);

  const user = React.useContext(UserContext);
  const menu = React.useContext(MenuContext);

  const { width } = useViewport();
  const breakpoint = 539;

  const {
    selectedIndex,
    setSelectedIndex,
    handleCloseDeviceModal,
    handleSelectDeviceModal,
    isSelectDeviceModalOpen,
    isMenuOpen,
    toggleActivityDrawer,
    isActivityDrawerOpen
  } = menu;

  React.useEffect(() => {
    setState({
      ...state,
      activeDevice: user.activeDevice,
      device: user.activeDevice.id,
      roleSelected: props.user.currentRole.title,
    });
  },              []);

  React.useEffect(() => {
    const selectedIndex = JSON.parse(window.localStorage.getItem('selectedIndex') as string);
    if (selectedIndex) {
      setSelectedIndex(selectedIndex);
    } else {
      const initialSelectedIndex =  { group: 0, item: 0 };
      window.localStorage.setItem('selectedIndex', JSON.stringify(initialSelectedIndex));
    }
  },              []);

  const menuAnchorEl = React.useRef<any>(null);

  const handleProfileClickOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setState({ ...state, anchorEl: event.currentTarget });
  };

  const handleProfileClose = () => setState({ ...state, anchorEl: null });

  const toggleRoleChangeDialog = () => {
    setState({
      ...state,
      isChangeRoleDialogOpen: !state.isChangeRoleDialogOpen,
      anchorEl: null,
    });
  };

  const closeRoleChangeDialog = () => {
    toggleRoleChangeDialog();
    setState({ ...state, roleSelected: '' });
  };

  const onFeedbackMenuOpenClose = () => setState({ ...state, isFeedbackMenuOpen: false });

  const handleFeedbackInputChange = e => setState({ ...state, [e.target.name as string]: e.target.value });

  const handleSelectDevice = () => {
    const deviceId = user.devices.filter(device => device.id === state.device);
    props.activateDevice({ id: deviceId[0]._id }).then(async () => await props.getUserDetails());
    handleSelectDeviceModal();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, device: event.target.value });
  };

  const handleRoleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const roleTitle = event.target.value;
    const role = props.user.roles.filter(obj => obj.title === roleTitle);
    setState({ ...state, roleId: role[0]._id, roleSelected: roleTitle });
  };

  const handleChangeRole = (event) => {
    event.preventDefault();
    const { roleId } = state;

    props.updatePerson(props.user._id, { role: roleId }).then(toggleRoleChangeDialog);
    window.localStorage.removeItem('selectedIndex');
    window.location.reload();
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
          {(width > breakpoint) &&
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
          <FeedbackIcon />
        </div>
      }/>
    </MenuSurface>
  );

  const selectDeviceContent = devices => (
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
  );

  const selectChangeRoleContent = () => (
    <TextField
      id="role"
      select
      variant="outlined"
      label="role"
      fullWidth
      size="small"
      value={state.roleSelected}
      onChange={handleRoleInputChange}
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
          <FaceIcon style={{ color: '#1967D2' }} />
        </InputAdornment>,
      }}>
      {props.user.roles.map((role, index) => (
        <MenuItem key={index} value={role.title}>
          <h4 className="headline-4">{role.title}</h4>
        </MenuItem>
      ))}
    </TextField>
  );

  const SelectDeviceModal = devices => (
    <Modal
      isModalOpen={isSelectDeviceModalOpen}
      renderHeader={() => 'Select the device ID'}
      renderContent={() => selectDeviceContent(devices)}
      onClose={handleSelectDeviceModal}
      submitButtonName="Select Device"
      onSubmit={handleSelectDevice}
      onDismiss={handleCloseDeviceModal}
    />
  );

  const MenuProfileSelect = () => (
    <Menu
      className="photo-menu"
      id="profile-menu"
      anchorEl={state.anchorEl}
      keepMounted
      open={Boolean(state.anchorEl)}
      onClose={handleProfileClose}
    >
      {width < breakpoint && <React.Fragment>
        <MenuItem onClick={toggleRoleChangeDialog}>
          <ListItemIcon style={{ minWidth: '36px' }}><SettingsIcon /></ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={toggleRoleChangeDialog}>
          <ListItemIcon style={{ minWidth: '36px' }}><HelpIcon /></ListItemIcon>
          Help
        </MenuItem>
        <MenuItem onClick={toggleRoleChangeDialog}>
          <ListItemIcon style={{ minWidth: '36px' }}><OpenInNewIcon /></ListItemIcon>
          Send Feedback
        </MenuItem>
      </React.Fragment>}

      <MenuItem onClick={toggleRoleChangeDialog}>
        <ListItemIcon style={{ minWidth: '36px' }}><MoodIcon /></ListItemIcon>
        Change role
      </MenuItem>
      <MenuItem onClick={logoutUser}>
        <ListItemIcon style={{ minWidth: '36px' }}><ExitToAppIcon /></ListItemIcon>
        Logout
      </MenuItem>
    </Menu>
  );

  const ProfileDialog = () => (
    <Modal
      isModalOpen={state.isChangeRoleDialogOpen}
      renderHeader={() => 'Confirm change of role'}
      renderContent={() => selectChangeRoleContent()}
      onClose={toggleRoleChangeDialog}
      submitButtonName="Select Role"
      onSubmit={handleChangeRole}
      onDismiss={toggleRoleChangeDialog}
    />
  );

  const ActivityLogs = () => {
    return (
      <div className="activity-logs-drawer">
        <h5 className="card-header__title">Recent Activities</h5>
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
      </div>
    );
  };

  const ActivityDrawer = () => (
    <SwipeableDrawer
      anchor="right"
      open={isActivityDrawerOpen}
      onClose={() => toggleActivityDrawer(false)}
      onOpen={() => toggleActivityDrawer(true)}
    >
      { ActivityLogs() }
    </SwipeableDrawer>
  );

  const { history } = props;
  const { isFeedbackModal, feedback, action } = state;

  const checkIsAdmin = () => user.isAdmin ? AdminMenus : UserMenus;

  return (
    <div className="dashboard">
      <MenuContent
        name={user.name}
        photo={user.photo}
      />
      <TopBar
        photoImage={photoImage()}
        openProfileDialog={handleProfileClickOpen}
      />
        <TopAppBarFixedAdjust>
          {React.createElement(checkIsAdmin()[selectedIndex.group][selectedIndex.item].component, { history })}
        </TopAppBarFixedAdjust>
      { width < breakpoint && <PageBottomNavigation/> }
      {FeedbackMenu()}
      {SelectDeviceModal(user.devices)}
      {ProfileDialog()}
      {MenuProfileSelect()}
      {ActivityDrawer()}
      <FeedbackDialogModal
        isFeedbackModal={isFeedbackModal}
        action={action}
        inputValue={feedback}
        handleFeedbackInputChange={handleFeedbackInputChange}
      />
    </div>
  );
};

export const mapStateToProps = state => ({
  user: state.user,
  activeDevice: state.device.activeDevice,
  roles: state.userRoles.data,
});

export const mapDispatchToProps = dispatch => ({
  getUserDetails: () => dispatch(getUserDetails()),
  logoutUser: () => dispatch(logoutUser()),
  activateDevice: id => dispatch(activateDevice(id)),
  updatePerson: (id, role) => dispatch(updatePerson(id, role)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);
