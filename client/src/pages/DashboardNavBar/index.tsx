import * as React from 'react';

// third-party libraries
import Drawer, {
  DrawerContent,
  DrawerHeader,
} from '@material/react-drawer';
import List, {
  ListDivider,
  ListGroup,
  ListGroupSubheader,
  ListItem,
  ListItemGraphic,
  ListItemText
} from '@material/react-list';
import MaterialIcon from '@material/react-material-icon';
import MenuSurface, { Corner } from '@material/react-menu-surface';
import TopAppBar, {
  TopAppBarFixedAdjust,
  TopAppBarIcon,
  TopAppBarRow,
  TopAppBarSection,
  TopAppBarTitle,
} from '@material/react-top-app-bar';
import { NavLink, Redirect } from 'react-router-dom';

// interfaces
import {
  DashboardNavBarProps,
  DashboardNavBarState
} from './interfaces';

// styles
import './DashboardNavBar.scss';

const avatar = 'https://res.cloudinary.com/mashafrancis/image/upload/v1552641620/kari4me/nan.jpg';
const viewPort = window.innerWidth;

const DashboardNavBar: React.FunctionComponent<DashboardNavBarProps> = (props) => {
  const [state, setState] = React.useState<DashboardNavBarState>({
    isDrawerOpen: false,
    isMenuOpen: false,
    selectedIndex: 0,
    isLoading: true,
  });

  const mainContentEl = React.createRef();
  const menuAnchorEl = React.useRef<any>(null);

  const onDrawerOpenClose = () => {
    setState({ ...state, isDrawerOpen: false });
  };

  const onMenuOpenClose = () => {
    setState({ ...state, isMenuOpen: !state.isMenuOpen });
  };

  const onSelectedIndex = () => {
    setState({ ...state, selectedIndex: 1 });
  };

  const { user, logoutUser } = props;

  const topBar = () => (
    <div className="dashboard-nav">
      <div className="dashboard-nav__left-section">
        <div className="dashboard-nav__left-section__title">
          <h2>Water Cycles</h2>
        </div>
        <div className="dashboard-nav__left-section__content">
          <p>
            The watering schedule for the pumping time is used to control the number of cycles
            the water is going to be pumped through the system. The maximum number of minutes
            to pump through the system is set at default to be 15 mins.
          </p>
        </div>
      </div>
      <div className="dashboard-nav__right-section">
        <div className="dashboard-nav__right-section__name">
          <h2>User: {user.name || 'Anonymous'}</h2>
        </div>
      </div>
    </div>
  );

  const mobileBar = () => (
    <TopAppBar className="dashboard-mobile-nav">
      <TopAppBarRow>
        <TopAppBarSection align="start">
          <TopAppBarIcon navIcon tabIndex={0}>
            <MaterialIcon
              onClick={() => setState({ ...state, isDrawerOpen: true })}
              hasRipple
              icon="notes"
              initRipple={null}
            />
          </TopAppBarIcon>
          <TopAppBarTitle>
            <div className="drawer-logo">
              <h2>Water Cycles</h2>
          </div>
          </TopAppBarTitle>
        </TopAppBarSection>
        <TopAppBarSection align="end" role="toolbar">
          <div className="companion-nav">
          <TopAppBarIcon navIcon tabIndex={0}>
            <MaterialIcon
              onClick={() => setState({ ...state, isDrawerOpen: true })}
              hasRipple icon="notifications"
              initRipple={null}
            />
          </TopAppBarIcon>
          </div>
        </TopAppBarSection>
      </TopAppBarRow>
    </TopAppBar>
  );

  const drawerContent = () => (
    <React.Fragment>
      <List
        singleSelection
        selectedIndex={state.selectedIndex}
        handleSelect={onSelectedIndex}
      >
        <NavLink to={'/water-cycles'}>
          <ListItem className="mdc-list-item--activated" onClick={onDrawerOpenClose}>
            <ListItemText primaryText="Water Cycles"/>
          </ListItem>
        </NavLink>
        <NavLink to={'/environmental-control'}>
          <ListItem onClick={onDrawerOpenClose}>
            <ListItemText primaryText="Environmental Control"/>
          </ListItem>
        </NavLink>
        <NavLink to={'/quality-control'}>
          <ListItem onClick={onDrawerOpenClose}>
            <ListItemText primaryText="Quality Control"/>
          </ListItem>
        </NavLink>
        <NavLink to={'/energy-usage'}>
          <ListItem onClick={onDrawerOpenClose}>
            <ListItemText primaryText="Energy Usage"/>
          </ListItem>
        </NavLink>
        <NavLink to={'/maintenance'}>
          <ListItem onClick={onDrawerOpenClose}>
            <ListItemText primaryText="Maintenance Schedule"/>
          </ListItem>
        </NavLink>
      </List>
    </React.Fragment>
  );

  const mobileDrawerContent = () => (
    <React.Fragment>
      <ListGroup>
        <ListDivider tag="div" />
        {drawerContent()}
        <ListDivider tag="div" />
        <ListGroupSubheader tag="h2">Do more with your account</ListGroupSubheader>
        <NavLink to={'/settings'}>
          <ListItem className="mdc-list-item" onClick={onDrawerOpenClose}>
            <ListItemText primaryText="Settings"/>
          </ListItem>
        </NavLink>
        <NavLink to={'/notifications'}>
          <ListItem onClick={onDrawerOpenClose}>
            <ListItemText primaryText="Notifications"/>
          </ListItem>
        </NavLink>
        <ListItem onClick={logoutUser}>
          <ListItemText primaryText="Logout"/>
          <ListItemGraphic graphic={<MaterialIcon icon="exit_to_app"/>} />
        </ListItem>
      </ListGroup>
    </React.Fragment>
  );

  const mobileDrawerHeader = () => {
    return (
    <React.Fragment>
      <DrawerHeader>
        <div className="drawer-logo">
          <div role="tablist"
               ref={e => menuAnchorEl.current = e}
               className="mdc-tab-bar"
               onClick={onMenuOpenClose}
          >
            <div className="header-image">
                <span className="mini-account-menu__image">
                <img
                  className="mini-account-menu__image"
                  src={user.photo || avatar}
                  alt="avatar"
                />
                  <h5>{user.name || 'Anonymous'}</h5>
                </span>
            </div>
          </div>
        </div>
      </DrawerHeader>
    </React.Fragment>
    );
  };

  const drawerHeader = () => (
    <React.Fragment>
      <DrawerHeader>
          <div className="drawer-logo">
            <NavLink to={'/'}>
              <img
                className="drawer-logo__image"
                src="https://res.cloudinary.com/almondgreen/image/upload/v1569118232/Almond/logo1_ifvhvk.png"
                alt="Logo"/>
            </NavLink>
          </div>
        </DrawerHeader>
    </React.Fragment>
  );

  return (
    <div className="dashboard">
      <Drawer
        modal = {(viewPort < 500)}
        open={state.isDrawerOpen}
        onClose={onDrawerOpenClose}
        // innerRef={this.drawerEl}
      >
        {(viewPort < 500) ? mobileDrawerHeader() : drawerHeader() }
        <DrawerContent>
          {(viewPort < 500) ? mobileDrawerContent() : drawerContent() }
        </DrawerContent>
      </Drawer>
            {(viewPort < 500) ? mobileBar() : topBar() }
      <TopAppBarFixedAdjust className="drawer-content">
        {props.component}
        </TopAppBarFixedAdjust>
    </div>
  );
};

export default DashboardNavBar;
