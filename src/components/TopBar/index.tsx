import * as React from 'react';

// third-party libraries
import Badge from '@material-ui/core/Badge';
import MaterialIcon from '@material/react-material-icon';
import TopAppBar, {
  TopAppBarIcon,
  TopAppBarRow,
  TopAppBarSection,
  TopAppBarTitle,
} from '@material/react-top-app-bar';
import { NavLink } from 'react-router-dom';
import { Theme, makeStyles, withStyles, createStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import TimelineIcon from '@material-ui/icons/Timeline';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import NotificationsIcon from '@material-ui/icons/Notifications';

// utils
import { UserContext } from '@utils/context/Context';
import { useViewport } from '../../hooks';
import { MenuContext } from "@context/MenuContext";

// interface
import { TopBarProps } from './interfaces';

const StyledBadge = withStyles((theme: Theme) =>
  createStyles({
    badge: {
      backgroundColor: '#1967D2',
      color: '#1967D2',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        // top: 0,
        // left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: '$ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
  }),
)(Badge);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }),
);

export const TopBar: React.FunctionComponent<TopBarProps> = (props) => {
  const device = React.useContext(UserContext);
  const menu = React.useContext(MenuContext);
  const user = React.useContext(UserContext);

  const { width } = useViewport();
  const breakpoint = 539;

  const classes = useStyles();

  const renderDeviceDisplay = () => (
    <div className="topbar-device-id" onClick={() => menu.setDeviceModalOpen(true)}>
      <h4>{`Device ID: ${device.activeDevice.id}`}</h4>
      <MaterialIcon
        onClick={() => menu.setDeviceModalOpen(true)}
        hasRipple icon="arrow_drop_down"
        initRipple={null}
      />
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
    >
      <TimelineIcon onClick={() => menu.toggleActivityDrawer(true)} />
    </StyledBadge>
  );

  // :TODO: Remove this after demoing the feature to be
  const notifications = ['true'];

  const notificationsIcon = () => (
    notifications.length > 0 ?
      <StyledBadge
        overlap="circle"
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        variant="dot"
      >
        <NotificationsIcon style={{ color: '#1967D2' }}/>
      </StyledBadge>
      :
      <NotificationsNoneIcon />
  )

  const topIcons = [
    {
      icon: timeLineIcon(),
    },
    {
      icon: notificationsIcon(),
    },
  ];

  const renderTopIcons = () => (
    <div className="companion-nav">
      {
        topIcons.map((topIcon, index) => (
            <TopAppBarIcon key={index} navIcon tabIndex={0}>
              <span>{topIcon.icon}</span>
            </TopAppBarIcon>
          )
        )
      }
      <Avatar alt={user.name} src={user.photo} onClick={props.openProfileDialog} />
    </div>
  );

  return (
    <TopAppBar className="dashboard-mobile-nav">
      <TopAppBarRow>
        <TopAppBarSection align="start">
          {/*{(width < breakpoint) &&*/}
          {/*<TopAppBarIcon navIcon tabIndex={0}>*/}
          {/*  <MaterialIcon*/}
          {/*    onClick={() => menu.setOpen(true)}*/}
          {/*    hasRipple icon="notes" initRipple={null}/>*/}
          {/*</TopAppBarIcon>}*/}
          <TopAppBarTitle>
            <NavLink to={'/'}>
              <img
                className="drawer-logo__image"
                src="https://res.cloudinary.com/almondgreen/image/upload/v1588810357/Almond/logo_vdwkvw.png"
                alt="Logo"/>
            </NavLink>
          </TopAppBarTitle>
          {/*<div className="topbar-divider topbar-lockup-divider"/>*/}
          {!user.isAdmin && renderDeviceDisplay()}
        </TopAppBarSection>

        <TopAppBarSection align="end" role="toolbar">
          {renderTopIcons()}
        </TopAppBarSection>
      </TopAppBarRow>
    </TopAppBar>
  );
};
