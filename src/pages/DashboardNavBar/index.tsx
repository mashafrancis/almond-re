import * as React from 'react';

// third-party libraries
import Drawer, {
  DrawerContent,
  DrawerHeader,
} from '@material/react-drawer';
import List, {
  ListItem,
  ListItemGraphic,
  ListItemText
} from '@material/react-list';
import MaterialIcon from '@material/react-material-icon';
import MenuSurface, { Corner } from '@material/react-menu-surface';
import TopAppBar, {
  TopAppBarFixedAdjust,
  TopAppBarRow,
  TopAppBarSection,
  TopAppBarTitle,
} from '@material/react-top-app-bar';
import { NavLink, Redirect } from 'react-router-dom';

// interfaces
import { DashboardNavBarProps } from './interfaces';

// styles
import './DashboardNavBar.scss';

// helpers
import authorize from 'utils/helpers/authorize';

const DashboardNavBar: React.FunctionComponent<DashboardNavBarProps> = (props) => {
  const mainContentEl = React.createRef();
  const [isDrawerOpen, setDrawerOpen] = React.useState<boolean>(false);
  const [isMenuOpen, setMenuOpen] = React.useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const menuAnchorEl = React.useRef<any>(null);

  const onDrawerClose = () => {
    setDrawerOpen(false);
  };

  const onSelectedIndex = () => {
    setSelectedIndex(1);
  };

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
          <h2>User: John Doe</h2>
        </div>
      </div>
    </div>
  );

  const sideNav = () => (
    <div className="side-nav">
      <div className="side-nav__top">
        <List twoLine>
          <ListItem onClick={() => setDrawerOpen(false)}>
            <ListItemGraphic graphic={<MaterialIcon icon="explore" initRipple={null}/>}/>
            <ListItemText secondaryText="Explore"/>
          </ListItem>
        </List>
      </div>
    </div>
  );

  const drawerContent = () => (
    <React.Fragment>
      <List singleSelection selectedIndex={selectedIndex}>
        <NavLink to={'/water-cycles'}>
          <ListItem className="mdc-list-item--activated" onClick={() => setDrawerOpen(false)}>
            <ListItemText primaryText="Water Cycles"/>
          </ListItem>
        </NavLink>
        <NavLink to={'/environmental-control'}>
          <ListItem onClick={() => setDrawerOpen(false)}>
            <ListItemText primaryText="Environmental Control"/>
          </ListItem>
        </NavLink>
        <NavLink to={'/quality-control'}>
          <ListItem onClick={() => setDrawerOpen(false)}>
            <ListItemText primaryText="Quality Control"/>
          </ListItem>
        </NavLink>
        <NavLink to={'/energy-usage'}>
          <ListItem onClick={() => setDrawerOpen(false)}>
            <ListItemText primaryText="Energy Usage"/>
          </ListItem>
        </NavLink>
        <NavLink to={'/maintenance'}>
          <ListItem onClick={() => setDrawerOpen(false)}>
            <ListItemText primaryText="Maintenance Schedule"/>
          </ListItem>
        </NavLink>
      </List>
    </React.Fragment>
  );

  return (
    <div className="dashboard">
      <Drawer
        open={isDrawerOpen}
        onClose={onDrawerClose}
        // innerRef={this.drawerEl}
      >
        <DrawerHeader>
          <div className="drawer-logo">
            <NavLink to={'/'}>
              <img src="https://res.cloudinary.com/almondgreen/image/upload/v1569118232/Almond/logo1_ifvhvk.png"
               alt="Logo"/>
            </NavLink>
          </div>
        </DrawerHeader>
        <DrawerContent>
          {drawerContent()}
        </DrawerContent>
      </Drawer>
            {topBar()}
      <TopAppBarFixedAdjust className="drawer-content">
        {props.component}
        </TopAppBarFixedAdjust>
    </div>
  );
};

export default DashboardNavBar;
