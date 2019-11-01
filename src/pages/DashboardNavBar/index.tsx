import * as React from 'react';

// third-party libraries
import Dialog, {
  DialogButton,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from '@material/react-dialog';
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
import TextField, {
  HelperText,
  Input
} from '@material/react-text-field';
import TopAppBar, {
  TopAppBarFixedAdjust,
  TopAppBarIcon,
  TopAppBarRow,
  TopAppBarSection,
  TopAppBarTitle,
} from '@material/react-top-app-bar';
import { NavLink, Redirect } from 'react-router-dom';

// components
import MenuModal from 'components/MenuModal';

// interfaces
import {
  DashboardNavBarProps,
  DashboardNavBarState
} from './interfaces';

// fixtures
import {
  menuItems,
  menuItemsBottom
} from 'pages/DashboardNavBar/fixtures';

// styles
import '../../assets/scss/RegisterPage.scss';
import './DashboardNavBar.scss';

const avatar = 'https://res.cloudinary.com/mashafrancis/image/upload/v1552641620/kari4me/nan.jpg';
const viewPort = window.innerWidth;

const DashboardNavBar: React.FunctionComponent<DashboardNavBarProps> = (props) => {
  const [state, setState] = React.useState<DashboardNavBarState>({
    isDrawerOpen: false,
    isMenuOpen: false,
    selectedIndex: 0,
    isLoading: true,
    isFeedbackMenuOpen: false,
    isFeedbackModal: false,
    action: '',
    fields: {},
    feedback: '',
  });

  React.useEffect(() => {
    switch (state.action) {
      case 'send':
        setState({ ...state, isFeedbackModal: false });
        break;
      case 'dismiss':
        setState({ ...state, isFeedbackModal: false });
        break;
    }
  },              []);

  const mainContentEl = React.createRef();
  const menuAnchorEl = React.useRef<any>(null);

  const onDrawerOpenClose = () => {
    setState({ ...state, isDrawerOpen: false });
  };

  const onDrawerOpen = () => {
    setState({ ...state, isDrawerOpen: true });
  };

  const onMenuOpenClose = () => {
    setState({ ...state, isMenuOpen: !state.isMenuOpen });
  };

  const onSelectedIndex = () => {
    setState({ ...state, selectedIndex: 1 });
  };

  const onFeedbackMenuOpenClose = () => {
    setState({ ...state, isFeedbackMenuOpen: false });
  };

  const { user, logoutUser } = props;

  const handleFeedbackInputChange = (event) => {
    setState({ ...state, [event.target.name as string]: event.target.value,
    });
  };

  const photoImage = () => (
    <TopAppBarIcon actionItem tabIndex={0}>
      <div role="tablist"
           ref={e => menuAnchorEl.current = e}
           className="mdc-tab-bar"
           onClick={() => setState({ ...state, isDrawerOpen: true })}
      >
    <span className="mini-account-menu__image">
    {(viewPort > 539) &&
    <img
      className="mini-account-menu__image"
      src={props.user.photo}
      alt="image"/>}
    </span>
      </div>
    </TopAppBarIcon>
  );

  const topIcons = [
    {
      icon: 'notifications_none',
      clickEvent: () => setState({ ...state, isFeedbackMenuOpen: true }),
    },
    {
      icon: 'more_vert',
      clickEvent: () => setState({ ...state, isFeedbackMenuOpen: true }),
    },
  ];

  const topBar = () => (
    <TopAppBar className="dashboard-mobile-nav">
      <TopAppBarRow>
        <TopAppBarSection align="start">
          {(viewPort < 539) &&
          <TopAppBarIcon navIcon tabIndex={0}>
            <MaterialIcon onClick={onDrawerOpen} hasRipple icon="notes" initRipple={null}/>
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
              topIcons.map((topIcon, index) => {
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
            {(viewPort > 539) && photoImage()}
          </div>
        </TopAppBarSection>
      </TopAppBarRow>
    </TopAppBar>
  );

  const drawerContent = () => (
    <React.Fragment>
      <ListGroup>
        {(viewPort < 539) && <ListDivider tag="div" />}
        <List
          singleSelection
          selectedIndex={state.selectedIndex}
          handleSelect={onSelectedIndex}
        >
          {
            menuItems.map((item, index) => {
              return (
                <NavLink key={index} to={item.navLink}>
                  <ListItem onClick={onDrawerOpenClose}>
                    <ListItemGraphic className="drawer-icon" graphic={<MaterialIcon icon={item.icon}/>} />
                    <ListItemText primaryText={item.primaryText}/>
                  </ListItem>
                </NavLink>
              );
            })
          }
        </List>
        <ListDivider tag="div" />
        <ListGroupSubheader tag="h3">Do more with your account</ListGroupSubheader>
        {
            menuItemsBottom.map((item, index) => {
              return (
                <NavLink key={index} to={item.navLink}>
                  <ListItem onClick={onDrawerOpenClose}>
                    <ListItemGraphic className="drawer-icon" graphic={<MaterialIcon icon={item.icon}/>} />
                    <ListItemText primaryText={item.primaryText}/>
                  </ListItem>
                </NavLink>
              );
            })
          }
          <ListItem onClick={logoutUser}>
            <ListItemGraphic className="drawer-icon" graphic={<MaterialIcon icon="exit_to_app"/>} />
            <ListItemText primaryText="Logout"/>
          </ListItem>
      </ListGroup>
      <footer className="drawer-footer">
        <a className="footer-text" href="https://www.almond.com/privacy" target="_blank">Privacy</a> · <a
        className="footer-text" href="https://www.almond.com/tos" target="_blank">Terms</a> · <a
        className="footer-text" href="https://www.almond.com/about" target="_blank">About Almond</a>
      </footer>
    </React.Fragment>
  );

  const mobileHeader = () => (
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
            {(viewPort < 539) && mobileHeader()}
          </div>
        </div>
      </DrawerHeader>
    </React.Fragment>
    );
  };

  const feedbackMenu = () => (
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
          <MaterialIcon hasRipple icon="feedback" initRipple={null}/></div>
      }/>
    </MenuSurface>
  );

  const feedbackModal = () => (
    <Dialog
      open={state.isFeedbackModal}
      onClose={ action => setState({ ...state, action, isFeedbackModal: false }) }
    >
      <DialogTitle>Send feedback</DialogTitle>
      <DialogContent>
        <TextField
          className="mdc-text-field--fullwidth"
          textarea={true}
          helperText={
            <HelperText
              className="mdc-text-field-invalid-helper"
              isValidationMessage={true}
              persistent={true}
              validation={true}>
              {'Share your ideas'}
            </HelperText>}
          >
            <Input
              value={state.feedback}
              name="feedback"
              id="1"
              type="text"
              required={false}
              onChange={handleFeedbackInputChange}/>
          </TextField>
      </DialogContent>
      <DialogFooter>
        <DialogButton action="dismiss">CANCEL</DialogButton>
        <DialogButton action="send" isDefault>SEND</DialogButton>
      </DialogFooter>
    </Dialog>
  );

  return (
    <div className="dashboard">
      <Drawer
        modal = {(viewPort < 539)}
        open={state.isDrawerOpen}
        onClose={onDrawerOpenClose}
        // innerRef={this.drawerEl}
      >
        {mobileDrawerHeader()}
        <DrawerContent>
          {drawerContent()}
        </DrawerContent>
      </Drawer>
      {topBar()}
      {feedbackMenu()}
      {feedbackModal()}
      <TopAppBarFixedAdjust className="drawer-content">
        {props.component}
        {/*{viewPort < 500 && <BottomNavigationBar />}*/}
        </TopAppBarFixedAdjust>
    </div>
  );
};

export default DashboardNavBar;
