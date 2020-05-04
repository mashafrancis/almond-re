import * as React from 'react';

// third-party libraries
import MaterialIcon from '@material/react-material-icon';
import TopAppBar, {
  TopAppBarIcon,
  TopAppBarRow,
  TopAppBarSection,
  TopAppBarTitle,
} from '@material/react-top-app-bar';
import { NavLink } from 'react-router-dom';

// utils
import { MenuContext, UserContext } from '@utils/context/Context';
import { useViewport } from '../../hooks';

// interface
import { TopBarProps } from './interfaces';

export const TopBar: React.FunctionComponent<TopBarProps> = (props) => {
  const device = React.useContext(UserContext);
  const menu = React.useContext(MenuContext);
  const user = React.useContext(UserContext);

  const { width } = useViewport();
  const breakpoint = 539;

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

  const renderTopIcons = () => (
    <div className="companion-nav">
      {
        props.topIcons.map((topIcon, index) => {
          return (
            <TopAppBarIcon key={index} navIcon tabIndex={0}>
              <MaterialIcon
                onClick={topIcon.clickEvent}
                hasRipple icon={topIcon.icon}
                initRipple={null}
              />
            </TopAppBarIcon>
          );
        })
      }
      <span onClick={props.openProfileDialog}>{(width > breakpoint) && props.photoImage}</span>
    </div>
  );

  return (
    <TopAppBar className="dashboard-mobile-nav">
      <TopAppBarRow>
        <TopAppBarSection align="start">
          {(width < breakpoint) &&
          <TopAppBarIcon navIcon tabIndex={0}>
            <MaterialIcon
              onClick={() => menu.setOpen(true)}
              hasRipple icon="notes" initRipple={null}/>
          </TopAppBarIcon>}
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
