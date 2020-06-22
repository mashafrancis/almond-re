import * as React from 'react';

// third-party libraries
import {
  Avatar,
  Badge,
  useScrollTrigger,
  CssBaseline,
  AppBar,
  Toolbar,
  Container,
  IconButton,
  Typography
} from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import {
  Theme,
  makeStyles,
  createStyles
} from '@material-ui/core/styles';

// icons
import {
  Timeline,
  NotificationsNone,
  Notifications,
  ArrowDropDown
} from '@material-ui/icons';

// utils
import { UserContext } from '@utils/context/Context';
import { useViewport } from '../../hooks';
import { MenuContext } from '@context/MenuContext';
import isArrayNotNull from '@utils/helpers/checkArrayEmpty';

// interface
import { ElevationBarProps, TopBarProps } from './interfaces';

// styles
import {
  useTopBarStyles,
  StyledBadge
} from '@components/TopBar/styles';
import '@pages/DashboardContainer/DashboardNavBar.scss'
import withStyles from '@material-ui/core/styles/withStyles';

const ElevationScroll = (props: ElevationBarProps) => {
  const { window, children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
};

const TopBar: React.FunctionComponent<TopBarProps> = props => {
  const device = React.useContext(UserContext);
  const menu = React.useContext(MenuContext);
  const user = React.useContext(UserContext);

  const {
    name,
    photo,
    isAdmin
  } = user;

  const {
    activityLogsViewed,
    toggleActivityDrawer,
    setDeviceModalOpen
  } = menu;

  const {
    photoImage,
    openProfileDialog,
    isActivityLogsEmpty,
    children
  } = props;

  const { width } = useViewport();
  const breakpoint = 539;

  const classes = useTopBarStyles();

  const DeviceActiveBadge = withStyles((theme: Theme) =>
    createStyles({
      badge: {
        // backgroundColor: '#76ff03',
        backgroundColor: '#ff1744',
        // color: '#76ff03',
        color: '#ff1744',
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

  const renderDeviceDisplay = () => 
    <div className={`${classes.device} ${classes.grow} topbar-device-id`} onClick={() => setDeviceModalOpen(true)}>
      <DeviceActiveBadge
         variant="dot"
         overlap="circle"
         anchorOrigin={{
           vertical: 'top',
           horizontal: 'left',
         }}>
        <h4>{`Device ID: ${device.activeDevice.id}`}</h4>
        <ArrowDropDown onClick={setDeviceModalOpen.bind(null,true)} />
      </DeviceActiveBadge>
    </div>
  ;

  const timeLineIcon = () => 
    <StyledBadge
      overlap="circle"
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      variant="dot"
      invisible={isActivityLogsEmpty != activityLogsViewed}>
      <Timeline onClick={toggleActivityDrawer.bind(null,true, true)} />
    </StyledBadge>
  ;

  // :TODO: Remove this after demoing the feature to be
  const notifications = ['true'];

  const notificationsIcon = () => (
    isArrayNotNull(notifications.length) ? <NotificationsNone /> :
      <StyledBadge
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        overlap="circle"
        invisible={isArrayNotNull(notifications.length)}
        variant="dot">
        <Notifications style={{ color: '#1967D2' }} />
      </StyledBadge>
  )

  const topIcons = [
    { icon: timeLineIcon() },
    { icon: notificationsIcon() },
    { icon: <Avatar alt={name} src={photo} onClick={props.openProfileDialog} /> }
  ];

  const renderTopIcons = () => 
    <div className={classes.sectionEnd}>
        {
          topIcons.map((topIcon, index) => 
            <span key={index} className="top-bar-icons">{topIcon.icon}</span>
            
          )
        }
    </div>
  ;

  return (
    <>
      <CssBaseline />
      <ElevationScroll { ...props }>
        <AppBar className={`${classes.appBar} mdc-top-app-bar`} position="fixed">
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
        { children }
      </div>
    </>
  );
};

export default TopBar;
