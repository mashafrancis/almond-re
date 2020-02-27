import * as React from 'react';

// third-party libraries
import { createStyles, TextField, Theme } from '@material-ui/core';
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
import PageBottomNavigation from '@components/BottomNavigation';
import FeedbackDialogModal from '@components/FeedbackDialogModal';
import { MenuContent } from '@components/MenuContent';
import MenuModal from '@components/MenuModal';
import { Menus } from '@components/MenuRoutes';
import Modal from '@components/Modal';
import { TopBar } from '@components/TopBar';

// utils
import {
  MenuContext,
  UserContext
} from '@utils/context';

// thunks
import { activateDevice } from '@modules/device';
import { getUserDetails, logoutUser } from '@modules/user';
import { useViewport } from '../../hooks';

// interfaces
import {
  DashboardContainerProps,
  DashboardContainerState
} from './interfaces';

// styles
// import '@pages/DashboardContainer/DashboardNavBar.scss';
// import '../../assets/scss/RegisterPage.scss';
import './DashboardContainer.scss';

const DashboardContainer: React.FunctionComponent<DashboardContainerProps> = (props) => {
  const [state, setState] = React.useState<DashboardContainerState>({
    isOpen: false,
    isMenuOpen: false,
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
    selectedIndex: {
      group: 0,
      item: 0,
    },
  });

  const user = React.useContext(UserContext);

  const { width } = useViewport();
  const breakpoint = 539;

  React.useEffect(() => {
    setState({
      ...state,
      activeDevice: user.activeDevice,
      device: props.user.activeDevice.id,
    });
  },              [props.user.activeDevice.id]);

  React.useEffect(() => {
    const selectedIndex = JSON.parse(window.localStorage.getItem('selectedIndex'));
    if (selectedIndex) {
      setState({ ...state, selectedIndex });
    } else {
      const initialSelectedIndex =  { group: 0, item: 0 };
      window.localStorage.setItem('selectedIndex', JSON.stringify(initialSelectedIndex));
    }
  },              []);

  const menuAnchorEl = React.useRef<any>(null);

  const setOpen = (isOpen: boolean) => setState({ ...state, isMenuOpen: isOpen });

  const setDeviceModalOpen = (isModalOpen: boolean) => {
    setState({
      ...state,
      isSelectDeviceModalOpen: isModalOpen,
    });
  };

  const setSelectedIndex = (selectedIndex: { group: number, item: number }) => {
    setState({ ...state, selectedIndex });
    window.localStorage.setItem('selectedIndex', JSON.stringify(selectedIndex));
  };

  const onFeedbackMenuOpenClose = () => setState({ ...state, isFeedbackMenuOpen: false });

  const handleFeedbackInputChange = e => setState({ ...state, [e.target.name as string]: e.target.value });

  const handleSelectDeviceModal = () => setState({ ...state, isSelectDeviceModalOpen: !state.isSelectDeviceModalOpen });

  const handleCloseDeviceModal = () => {
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
          <MaterialIcon hasRipple icon="feedback" initRipple={null}/>
        </div>
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

  const SelectDeviceModal = devices => (
    <Modal
      isModalOpen={state.isSelectDeviceModalOpen}
      renderHeader={() => 'Select the device ID'}
      renderContent={() => selectDeviceContent(devices)}
      onClose={handleSelectDeviceModal}
      submitButtonName="Select Device"
      onSubmit={handleSelectDevice}
      onDismiss={handleCloseDeviceModal}
    />
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

  const { history } = props;
  const { isFeedbackModal, feedback, action } = state;
  const { selectedIndex, isMenuOpen } = state;

  return (
    <MenuContext.Provider
      value={{
        isMenuOpen,
        selectedIndex,
        setSelectedIndex,
        setOpen,
        logoutUser,
        setDeviceModalOpen,
      }}
    >
      <div className="dashboard">
        <MenuContent
          name={user.name}
          photo={user.photo}
        />
        <TopBar
          photoImage={photoImage()}
          topIcons={topIcons}
        />
          <TopAppBarFixedAdjust>
            {React.createElement(Menus[selectedIndex.group][selectedIndex.item].component, { history })}
          </TopAppBarFixedAdjust>
        { width < breakpoint && <PageBottomNavigation/> }
        {FeedbackMenu()}
        {SelectDeviceModal(user.devices)}
        <FeedbackDialogModal
          isFeedbackModal={isFeedbackModal}
          action={action}
          inputValue={feedback}
          handleFeedbackInputChange={handleFeedbackInputChange}
        />
      </div>
    </MenuContext.Provider>
  );
};

export const mapStateToProps = state => ({
  user: state.user,
  activeDevice: state.device.activeDevice,
});

export const mapDispatchToProps = dispatch => ({
  getUserDetails: () => dispatch(getUserDetails()),
  logoutUser: () => dispatch(logoutUser()),
  activateDevice: id => dispatch(activateDevice(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);
