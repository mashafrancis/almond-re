import React, { cloneElement, useContext } from 'react';

// third-party libraries
import {
  Avatar,
  Badge,
  useScrollTrigger,
  CssBaseline,
  AppBar,
  Toolbar,
} from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import {
  Theme,
  createStyles,
} from '@material-ui/core/styles';
import { useMqttState } from 'mqtt-hooks';

// icons
import {
  Timeline,
  NotificationsNone,
  Notifications,
  ArrowDropDown,
} from '@material-ui/icons';

// utils
import { UserContext } from '@context/UserContext';
import { ComponentContext } from '@context/ComponentContext';
import isArrayNotNull from '@utils/checkArrayEmpty';

// interface
import { ElevationBarProps, TopBarProps } from './interfaces';

// styles
import {
  useTopBarStyles,
  StyledBadge,
} from '@components/TopBar/styles';
import '@pages/DashboardContainer/DashboardNavBar.scss';
import withStyles from '@material-ui/core/styles/withStyles';

const ElevationScroll = (props: ElevationBarProps): JSX.Element => {
  const { window, children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
};

const TopBar = (props: TopBarProps): JSX.Element => {
  const device = useContext(UserContext);
  const menu = useContext(ComponentContext);
  const { name, photo, isAdmin } = React.useContext(UserContext);

  const {
    activityLogsViewed,
    toggleActivityDrawer,
    setDeviceModalOpen,
  } = menu;

  const {
    isActivityLogsEmpty,
    children,
  } = props;

  const classes = useTopBarStyles();

  const { status } = useMqttState();

  const statusChange = (status: string): string => {
    switch (status) {
      case 'connected':
        return '#76ff03';
      case 'reconnecting':
        return '#FFCE56';
      case 'closed':
        return '#ff1744';
      case 'offline':
        return '#CCCCCC';
      default:
        return '#CCCCCC';
    }
  };

  const DeviceActiveBadge = withStyles((theme: Theme) =>
    createStyles({
      badge: {
        backgroundColor: statusChange(status),
        color: statusChange(status),
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        top: '50%',
        left: '-8%',
        '&::after': {
          position: 'absolute',
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          // animation: '$ripple 1.2s infinite ease-in-out',
          border: '0.8px solid currentColor',
          content: '""',
        },
      },
    }),
  )(Badge);

  const renderDeviceDisplay = (): JSX.Element => (
    <div className={`${classes.device} ${classes.grow} topbar-device-id`} onClick={() => setDeviceModalOpen(true)}>
      <DeviceActiveBadge
        variant="dot"
        overlap="circle"
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}>
        <h4>{`Device ID: ${device.activeDevice.id}`}</h4>
        <ArrowDropDown onClick={setDeviceModalOpen.bind(null, true)}/>
      </DeviceActiveBadge>
    </div>
  );

  const timeLineIcon = () => (
    <StyledBadge
      overlap="circle"
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      variant="dot"
      invisible={isActivityLogsEmpty != activityLogsViewed}>
      <Timeline onClick={toggleActivityDrawer.bind(null, true, true)}/>
    </StyledBadge>
  );

  // :TODO: Remove this after demoing the feature to be
  const notifications = ['true'];

  const notificationsIcon = () => (
    isArrayNotNull(notifications.length) ? <NotificationsNone/> :
      <StyledBadge
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        overlap="circle"
        invisible={isArrayNotNull(notifications.length)}
        variant="dot">
        <Notifications style={{ color: '#1967D2' }}/>
      </StyledBadge>
  );

  const topIcons = [
    { icon: timeLineIcon() },
    { icon: notificationsIcon() },
    { icon: <Avatar alt={name} src={photo} onClick={props.openProfileDialog}/> },
  ];

  const renderTopIcons = () => (
    <div className={classes.sectionEnd}>
      {
        topIcons.map((topIcon, index) =>
          <span key={index} className="top-bar-icons">{topIcon.icon}</span>,
        )
      }
    </div>
  );

  return (
    <>
      <CssBaseline/>
      <ElevationScroll {...props}>
        <AppBar className={`${classes.appBar} mdc-top-app-bar`} position="fixed" data-testid="top-bar">
          <Toolbar variant="dense">
            <div className="appbar-section appbar-section-start">
              <NavLink to="/">
                <img
                  className="drawer-logo__image"
                  src="https://res.cloudinary.com/almondgreen/image/upload/v1588810357/Almond/logo_vdwkvw.png"
                  alt="Logo"
                />
              </NavLink>
              {!isAdmin && renderDeviceDisplay()}
            </div>
            <div className="appbar-section appbar-section-end">
              {renderTopIcons()}
            </div>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className="mdc-top-app-bar--fixed-adjust">
        {children}
      </div>
    </>
  );
};

export default TopBar;
