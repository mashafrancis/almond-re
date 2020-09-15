import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  FunctionComponent,
  ChangeEvent,
  MouseEvent,
  Suspense,
  createElement,
  lazy
} from 'react';

// third-party libraries
import { connect } from 'react-redux';
import {
  SwipeableDrawer,
  MenuItem,
  ListItemIcon,
  TextField,
  InputAdornment,
  Menu,
} from '@material-ui/core';
import { Grid } from '@material/react-layout-grid';

// icons
import {
  Mood,
  ExitToApp,
  Settings,
  Help,
  OpenInNew,
  AllOutTwoTone,
  Face,
} from '@material-ui/icons';

// components;
import {
  AdminMenus,
  UserMenus,
} from '@components/MenuRoutes';

// utils
import { UserContext } from '@context/UserContext';
import { useViewport } from '../../hooks';
import { ComponentContext } from '@context/ComponentContext';
import isArrayNotNull from '@utils/checkArrayEmpty';
import minimumDelay from '@utils/MinimumDelay';

// thunks
import { activateDevice } from '@modules/device';
import {
  editUserDetails,
  getUserDetails,
  logoutUser,
} from '@modules/user';

// interfaces
import {
  DashboardContainerProps,
  DashboardContainerState,
} from './interfaces';
import { Device } from '@modules/device/interfaces';

// styles
import { useDashboardContainerStyles } from '@pages/DashboardContainer/styles';
import './DashboardContainer.scss';

const Modal = lazy(() => import('@components/Modal'));
const MenuContent = lazy(() => import('@components/MenuContent'));
const PageBottomNavigation = lazy(() => import('@components/BottomNavigation'));
const TopBar = lazy(() => import('@components/TopBar'));
const ActivityLogCard = lazy(() => import('@components/ActivityLogCard'));

const DashboardContainer: FunctionComponent<DashboardContainerProps> = props => {
  const [state, setState] = useState<DashboardContainerState>({
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

  const styles = useDashboardContainerStyles(props);

  const {
    activeDevice,
    devices,
    photo,
    name,
    isAdmin,
  } = useContext(UserContext);
  const menu = useContext(ComponentContext);

  const { width } = useViewport();
  const breakpoint = 539;

  const { history, activityLogs } = props;

  const {
    selectedIndex,
    setSelectedIndex,
    handleCloseDeviceModal,
    handleSelectDeviceModal,
    isSelectDeviceModalOpen,
    toggleActivityDrawer,
    isActivityDrawerOpen,
  } = menu;

  useEffect(() => {
    setState(prevState => ({
      ...prevState,
      activeDevice,
      device: activeDevice.id,
      roleSelected: props.user.currentRole.title,
    }));
  }, []);

  useEffect(() => {
    const selectedIndex = JSON.parse(window.localStorage.getItem('selectedIndex') as string);
    if (selectedIndex) setSelectedIndex(selectedIndex);
    const initialSelectedIndex = { group: 0, item: 0 };
    window.localStorage.setItem('selectedIndex', JSON.stringify(initialSelectedIndex));
  }, []);

  const menuAnchorEl = useRef<any>(null);

  const handleProfileClickOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setState(prevState => ({ ...prevState, anchorEl: event.currentTarget }));
  };

  const handleProfileClose = () => setState(prevState => ({ ...prevState, anchorEl: null }));

  const toggleRoleChangeDialog = () => {
    setState(prevState => ({
      ...prevState,
      isChangeRoleDialogOpen: !prevState.isChangeRoleDialogOpen,
      anchorEl: null,
    }));
  };

  const closeRoleChangeDialog = () => {
    toggleRoleChangeDialog();
    setState(prevState => ({ ...prevState, roleSelected: '' }));
  };

  const handleSelectDevice = () => {
    const deviceId = devices.filter(device => device.id === state.device);
    props.activateDevice({ id: deviceId[0]._id }).then(async () => await props.getUserDetails());
    handleSelectDeviceModal();
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setState(prevState => ({ ...prevState, device: event.target.value }));
  };

  const handleRoleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const roleTitle = event.target.value;
    const role = props.user.roles.filter(obj => obj.title === roleTitle);
    setState(prevState => ({
      ...prevState,
      roleId: role[0]._id,
      roleSelected: roleTitle,
    }));
  };

  const handleChangeRole = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { roleId } = state;

    props.editUserDetails(props.user._id, { role: roleId })
      .then(closeRoleChangeDialog)
      .then(() => {
        window.localStorage.removeItem('selectedIndex');
        window.location.reload();
      });
  };

  const handleAccountMenu = () => {
    setState(prevState => ({ ...prevState, isOpen: true }));
  };

  const logoutUser = (): void => {
    window.location.replace('/');
    props.logoutUser();
  };

  const photoImage = () =>
    <div role="tablist"
         ref={e => menuAnchorEl.current = e}
         className="mdc-tab-bar"
         onClick={handleAccountMenu}>
      <span className="mini-account-menu__image">
        {(width > breakpoint) &&
        <img
          className="mini-account-menu__image"
          src={photo}
          alt="image"
          />}
      </span>
    </div>
  ;

  const selectDeviceContent = (devices: Device[]) =>
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
          <AllOutTwoTone style={{ color: '#1967D2' }} />
        </InputAdornment>,
      }}>
      {devices.map((device: Device) =>
        <MenuItem key={device.id} value={device.id}>
          <h4 className="headline-4">{device.id}</h4>
        </MenuItem>,
      )}
    </TextField>
  ;

  const selectChangeRoleContent = () =>
    <TextField
      id="user-role"
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
          <Face style={{ color: '#1967D2' }} />
        </InputAdornment>,
      }}>
      {props.user.roles.map((role, index) =>
        <MenuItem key={index} value={role.title}>
          <h4 className="headline-4">{role.title}</h4>
        </MenuItem>,
      )}
    </TextField>
  ;

  const SelectDeviceModal = device =>
    <Modal
      isModalOpen={isSelectDeviceModalOpen}
      renderHeader={() => 'Select the device ID'}
      renderContent={() => selectDeviceContent(device)}
      onClose={handleSelectDeviceModal}
      submitButtonName="Select Device"
      onSubmit={handleSelectDevice}
      onDismiss={handleCloseDeviceModal}
      />
  ;

  const menuItems = [
    { name: 'Settings', icon: <Settings /> },
    { name: 'Help', icon: <Help /> },
    { name: 'Send Feedback', icon: <OpenInNew /> },
  ];

  const MenuProfileSelect = () =>
    <Menu
      className="photo-menu"
      id="profile-menu"
      anchorEl={state.anchorEl}
      keepMounted
      open={Boolean(state.anchorEl)}
      onClose={handleProfileClose}>
      {width < breakpoint && <div>
        {
          menuItems.map((item, index) =>
            <MenuItem key={index} onClick={setSelectedIndex.bind(null, { group: 1, item: index })}>
              <ListItemIcon style={{ minWidth: '36px' }}>{item.icon}</ListItemIcon>
              {item.name}
            </MenuItem>,
          )
        }
      </div>}

      <MenuItem onClick={toggleRoleChangeDialog}>
        <ListItemIcon style={{ minWidth: '36px' }}><Mood /></ListItemIcon>
        Change role
      </MenuItem>
      <MenuItem onClick={logoutUser}>
        <ListItemIcon style={{ minWidth: '36px' }}><ExitToApp /></ListItemIcon>
        Logout
      </MenuItem>
    </Menu>
  ;

  const ProfileDialog = () =>
    <Modal
      isModalOpen={state.isChangeRoleDialogOpen}
      renderHeader={() => 'Confirm change of role'}
      renderContent={() => selectChangeRoleContent()}
      onClose={toggleRoleChangeDialog}
      submitButtonName="Select Role"
      onSubmit={handleChangeRole}
      onDismiss={toggleRoleChangeDialog}
      />
  ;

  const ActivityLogs = () =>
    <div className="activity-logs-drawer">
      <h5 className="card-header__title">Recent Activities</h5>
      {
        isArrayNotNull(activityLogs) ?
          activityLogs.map(logs =>
            <ActivityLogCard
              key={logs._id}
              log={logs.actionDesc}
              date={logs.createdAt}
              type="info"
              />,
          ) :
          <div className="blank-content">
            <h2>No logs found!</h2>
          </div>
      }
    </div>
  ;

  const handleActivityDrawer = status => () => {
    switch (status) {
      case 'open':
        toggleActivityDrawer(true, true);
        break;
      case 'close':
        toggleActivityDrawer(false, true);
        break;
      default:
        toggleActivityDrawer(false, true);
    }
  };

  const ActivityDrawer = () =>
    <SwipeableDrawer
      anchor="right"
      open={isActivityDrawerOpen}
      onClose={handleActivityDrawer('close')}
      onOpen={handleActivityDrawer('open')}>
      {ActivityLogs()}
    </SwipeableDrawer>
  ;

  const checkIsAdmin = () => isAdmin ? AdminMenus : UserMenus;

  return (
    <div className="dashboard" data-testid="dashboard">
      <MenuContent name={name} photo={photo} />
      <TopBar
        isActivityLogsEmpty={!isArrayNotNull(activityLogs)}
        photoImage={photoImage()}
        openProfileDialog={handleProfileClickOpen}>
        <Suspense fallback={minimumDelay(import('@components/LinearProgressBar'), 500)}>
          <Grid>
            {createElement(checkIsAdmin()[selectedIndex.group][selectedIndex.item].component, { history })}
          </Grid>
        </Suspense>
      </TopBar>
      {width < breakpoint && <PageBottomNavigation />}
      {SelectDeviceModal(devices)}
      {ProfileDialog()}
      {MenuProfileSelect()}
      {ActivityDrawer()}
    </div>
  );
};

export const mapStateToProps = (state: any) => ({
  user: state.user.userDetails,
  activeDevice: state.device.activeDevice,
  roles: state.userRoles.roles,
  activityLogs: state.activityLogs,
  loading: state.loading,
});

export const mapDispatchToProps = (dispatch: any) => ({
  getUserDetails: () => dispatch(getUserDetails()),
  logoutUser: () => dispatch(logoutUser()),
  activateDevice: (id: string) => dispatch(activateDevice(id)),
  editUserDetails: (id: string, role: any) => dispatch(editUserDetails(id, role)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);
