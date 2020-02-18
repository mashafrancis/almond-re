import * as React from 'react';

// third-party libraries
import MaterialIcon from '@material/react-material-icon';
import TopAppBar, {
  TopAppBarFixedAdjust,
  TopAppBarIcon,
  TopAppBarRow,
  TopAppBarSection,
  TopAppBarTitle,
} from '@material/react-top-app-bar';
import { NavLink } from 'react-router-dom';

// utils
import { DeviceContext, MenuContext, UserContext } from '../Context';

// interface
import { TopBarProps } from './interfaces';

const viewPort = window.innerWidth;

export const TopBar: React.FunctionComponent<TopBarProps> = (props) => {
  const device = React.useContext(UserContext);
  const menu = React.useContext(MenuContext);

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
      {(viewPort > 539) && props.photoImage}
    </div>
  );

  return (
    <TopAppBar className="dashboard-mobile-nav">
      <TopAppBarRow>
        <TopAppBarSection align="start">
          {(viewPort < 539) &&
          <TopAppBarIcon navIcon tabIndex={0}>
            <MaterialIcon
              onClick={() => menu.setOpen(true)}
              hasRipple icon="notes" initRipple={null}/>
          </TopAppBarIcon>}
          <TopAppBarTitle>
            <NavLink to={'/'}>
              <img
                className="drawer-logo__image"
                src="https://res.cloudinary.com/almondgreen/image/upload/v1569118232/Almond/logo1_ifvhvk.png"
                alt="Logo"/>
            </NavLink>
          </TopAppBarTitle>
          <div className="topbar-divider topbar-lockup-divider"/>
          <div className="topbar-title">
            <h4>{props.pageTitle}</h4>
          </div>
        </TopAppBarSection>

        <TopAppBarSection align="end" role="toolbar">
          {renderDeviceDisplay()}
          {renderTopIcons()}
        </TopAppBarSection>
      </TopAppBarRow>
    </TopAppBar>
  );
};
