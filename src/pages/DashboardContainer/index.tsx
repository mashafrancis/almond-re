import * as React from 'react';

// third-party libraries
import { connect } from 'react-redux';
import { Theme, withStyles, makeStyles, createStyles } from '@material-ui/core/styles';
import {
  SwipeableDrawer,
  MenuItem,
  ListItemIcon,
  TextField,
  InputAdornment,
  Menu,
} from "@material-ui/core";

// icons
import {
  Feedback,
  Mood,
  ExitToApp,
  Settings,
  Help,
  OpenInNew,
  AllOutTwoTone,
  Face
} from '@material-ui/icons';

// components;
import {
  AdminMenus,
  UserMenus
} from '@components/MenuRoutes';
import LinearProgressBar from "@components/LinearProgressBar";
const Modal = React.lazy(() => import('@components/Modal'));
const MenuModal = React.lazy(() => import('@components/MenuModal'));
const MenuContent = React.lazy(() => import('@components/MenuContent'));
const PageBottomNavigation = React.lazy(() => import('@components/BottomNavigation'));
const TopBar = React.lazy(() => import('@components/TopBar'));
const ActivityLogCard = React.lazy(() => import('@components/ActivityLogCard'));

// utils
import { UserContext } from '@utils/context';
import { useViewport } from '../../hooks';
import { MenuContext } from "@context/MenuContext";
import isArrayNotNull from "@utils/helpers/checkArrayEmpty";

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
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    // color: '#fff',
    backgroundColor: 'rgba(0, 0, 0, 0.1)'
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

  const { history, activityLogs } = props;
  const { isFeedbackModal, feedback, action } = state;

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
          <AllOutTwoTone style={{ color: '#1967D2' }} />
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
          <Face style={{ color: '#1967D2' }} />
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
      {width < breakpoint && <div>
        <MenuItem onClick={toggleRoleChangeDialog}>
          <ListItemIcon style={{ minWidth: '36px' }}><Settings/></ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={toggleRoleChangeDialog}>
          <ListItemIcon style={{ minWidth: '36px' }}><Help/></ListItemIcon>
          Help
        </MenuItem>
        <MenuItem onClick={toggleRoleChangeDialog}>
          <ListItemIcon style={{ minWidth: '36px' }}><OpenInNew/></ListItemIcon>
          Send Feedback
        </MenuItem>
      </div>}

      <MenuItem onClick={toggleRoleChangeDialog}>
        <ListItemIcon style={{ minWidth: '36px' }}><Mood/></ListItemIcon>
        Change role
      </MenuItem>
      <MenuItem onClick={logoutUser}>
        <ListItemIcon style={{ minWidth: '36px' }}><ExitToApp/></ListItemIcon>
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
          isArrayNotNull(activityLogs) ?
          activityLogs.map(logs => {
            return (
              <ActivityLogCard
                key={logs._id}
                log={logs.actionDesc}
                date={logs.createdAt}
                type='info'
              />
            );
          }) :
          <div className="blank-content">
            <h2>No logs found!</h2>
          </div>
        }
      </div>
    );
  };

  const ActivityDrawer = () => (
    <SwipeableDrawer
      anchor="right"
      open={isActivityDrawerOpen}
      onClose={toggleActivityDrawer.bind(null,false, true)}
      onOpen={toggleActivityDrawer.bind(null,true, true)}
    >
      { ActivityLogs() }
    </SwipeableDrawer>
  );

  const checkIsAdmin = () => user.isAdmin ? AdminMenus : UserMenus;

  return (
    <div className="dashboard">
      <MenuContent
        name={user.name}
        photo={user.photo}
      />
      <TopBar
        isActivityLogsEmpty={!isArrayNotNull(activityLogs)}
        photoImage={photoImage()}
        openProfileDialog={handleProfileClickOpen}
      >
        <React.Suspense fallback={<LinearProgressBar />} >
          {React.createElement(checkIsAdmin()[selectedIndex.group][selectedIndex.item].component, { history })}
        </React.Suspense>
      </TopBar>
      { width < breakpoint && <PageBottomNavigation/> }
      {SelectDeviceModal(user.devices)}
      {ProfileDialog()}
      {MenuProfileSelect()}
      {ActivityDrawer()}
    </div>
  );
};

export const mapStateToProps = state => ({
  user: state.user,
  activeDevice: state.device.activeDevice,
  roles: state.userRoles.data,
  activityLogs: state.activityLogs,
  loading: state.loading,
});

export const mapDispatchToProps = dispatch => ({
  getUserDetails: () => dispatch(getUserDetails()),
  logoutUser: () => dispatch(logoutUser()),
  activateDevice: id => dispatch(activateDevice(id)),
  updatePerson: (id, role) => dispatch(updatePerson(id, role)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);
