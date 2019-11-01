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
import { MenuContext } from '../Context';

// interface
import { TopBarProps } from './interfaces';

const viewPort = window.innerWidth;

export const TopBar: React.FunctionComponent<TopBarProps> = props => (
  <MenuContext.Consumer>
    {({ setOpen }) => (
      <TopAppBar className="dashboard-mobile-nav">
      <TopAppBarRow>
        <TopAppBarSection align="start">
          {(viewPort < 539) &&
          <TopAppBarIcon navIcon tabIndex={0}>
            <MaterialIcon
              onClick={() => setOpen(true)}
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
          {
            viewPort > 539 &&
            <React.Fragment>
              <div className="topbar-divider topbar-lockup-divider" />
              <div className="topbar-title">
                <h4>Water Cycles</h4>
              </div>
            </React.Fragment>
          }
        </TopAppBarSection>
        <TopAppBarSection align="end" role="toolbar">
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
        </TopAppBarSection>
      </TopAppBarRow>
    </TopAppBar>
    )}
  </MenuContext.Consumer>
);
