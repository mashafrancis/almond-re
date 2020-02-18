import * as React from 'react';

// third-party libraries
import MaterialIcon from '@material/react-material-icon';
import MenuSurface, { Corner } from '@material/react-menu-surface';
import {
  TopAppBarFixedAdjust,
  TopAppBarIcon
} from '@material/react-top-app-bar';
import { connect } from 'react-redux';

// components
import { MenuContext } from '@components/Context';
import FeedbackDialogModal from '@components/FeedbackDialogModal';
import { MenuContent } from '@components/MenuContent';
import MenuModal from '@components/MenuModal';
import { TopBar } from '@components/TopBar';

// thunks
import { logoutUser } from '@modules/user';

// interfaces
import {
  DashboardContainerProps,
  DashboardContainerState
} from './interfaces';

// styles
import '@pages/DashboardContainer/DashboardNavBar.scss';
import '../../assets/scss/RegisterPage.scss';
import './DashboardContainer.scss';

const viewPort = window.innerWidth;

const DashboardContainer: React.FunctionComponent<DashboardContainerProps> = (props) => {
  const [state, setState] = React.useState<DashboardContainerState>({
    isOpen: false,
    isMenuOpen: false,
    selectedIndex: 0,
    isLoading: true,
    isFeedbackMenuOpen: false,
    isFeedbackModal: false,
    action: '',
    fields: {},
    feedback: '',
    menu: {
      isOpen: false,
      selectedIndex: 0,
    },
  });

  const menuAnchorEl = React.useRef<any>(null);

  const setOpen = (isOpen: boolean) => {
    const menu = state.menu;
    // @ts-ignore
    setState({
      menu: {
        ...menu,
        isOpen: menu.isOpen = isOpen,
      },
    });
  };

  const setSelectedIndex = () => {
    setState({ ...state, selectedIndex: 1 });
  };

  const onFeedbackMenuOpenClose = () => {
    setState({ ...state, isFeedbackMenuOpen: false });
  };

  const handleFeedbackInputChange = (event) => {
    setState({ ...state, [event.target.name as string]: event.target.value,
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
    {(viewPort > 539) &&
    <img
      className="mini-account-menu__image"
      src={props.user.photo}
      alt="image"/>}
    </span>
      </div>
    </TopAppBarIcon>
  );

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

  const { component, user, title } = props;
  const { isOpen, selectedIndex } = state.menu;
  const { isFeedbackModal, feedback, action } = state;

  return (
    <MenuContext.Provider
      value={{
        isOpen,
        selectedIndex,
        setSelectedIndex,
        setOpen,
        logoutUser,
      }}
    >
        <div className="dashboard">
          <MenuContent name={user.name} photo={user.photo}/>
          <TopBar pageTitle={title} photoImage={photoImage()} topIcons={topIcons}/>
          <TopAppBarFixedAdjust>{component}</TopAppBarFixedAdjust>
          {feedbackMenu()}
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
  user: state.user.user,
});

export const mapDispatchToProps = dispatch => ({
  logoutUser: () => dispatch(logoutUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);
