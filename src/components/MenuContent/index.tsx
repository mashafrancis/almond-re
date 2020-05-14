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

// components
import { AdminMenus, UserMenus } from '@components/MenuRoutes';
import { UserContext } from '@utils/context';
import { useViewport } from '../../hooks';
import { MenuContext } from "@context/MenuContext";

// interfaces
import { MenuContentProps } from './interfaces';

// styles
import '@pages/DashboardContainer/DashboardNavBar.scss';

const avatar = 'https://res.cloudinary.com/mashafrancis/image/upload/v1552641620/kari4me/nan.jpg';
const viewPort = window.innerWidth;

const mobileHeader = (name, photo) => (
  <div className="header-image">
    <span className="mini-menu__image">
    <img
      className="mini-menu__image"
      src={photo || avatar}
      alt="avatar"
    />
      <h5>{name || 'Anonymous'}</h5>
    </span>
</div>
);

const mobileDrawerHeader = (setOpen, name, photo) => {
  return (
  <React.Fragment>
    <DrawerHeader>
      <div className="drawer-logo">
        <div role="tablist"
             className="mdc-tab-bar"
             onClick={() => setOpen(false)}
        >
          {(viewPort < 539) && mobileHeader(name, photo)}
        </div>
      </div>
    </DrawerHeader>
  </React.Fragment>
  );
};

const drawerContent = (selectedIndex, setSelectedIndex, setOpen, checkIsAdmin) => (
  <React.Fragment>
    <ListGroup>
      {(viewPort < 539) && <ListDivider tag="div" />}
      <List
        singleSelection
        selectedIndex={selectedIndex.item}
      >
        {
          checkIsAdmin().map((group, groupIndex) => (
            <React.Fragment key={groupIndex} >
              {group.map((item, itemIndex) => (
                <ListItem
                  key={`${groupIndex}.${itemIndex}`}
                  className={(selectedIndex.group === groupIndex && selectedIndex.item === itemIndex) ? 'mdc-list-item--selected' : ''}
                  onClick={() => setSelectedIndex({ group: groupIndex, item: itemIndex }) }
                >
                  <ListItemGraphic
                    className="drawer-icon"
                    graphic={item.icon}
                  />
                  <ListItemText tabIndex={0} primaryText={item.primaryText}/>
                </ListItem>)
              )}
              < ListDivider tag="div" />
              {groupIndex === 0 ? <ListGroupSubheader tag="h3">Do more with your account</ListGroupSubheader> : null}
            </React.Fragment>
            )
          )
        }
      </List>
    </ListGroup>
    <footer className="drawer-footer">
      <a className="footer-text" href="https://www.almond.com/privacy" target="_blank" rel="noopener">Privacy</a> · <a
      className="footer-text" href="https://www.almond.com/tos" target="_blank" rel="noopener">Terms</a> · <a
      className="footer-text" href="https://www.almond.com/about" target="_blank" rel="noopener">About</a>
    </footer>
  </React.Fragment>
);

export const MenuContent: React.FunctionComponent<MenuContentProps> = (props) => {
  const menu = React.useContext(MenuContext);
  const user = React.useContext(UserContext);

  const { width } = useViewport();
  const breakpoint = 539;

  const { isMenuOpen, setOpen, selectedIndex, setSelectedIndex } = menu;
  const { isAdmin } = user;

  const checkIsAdmin = () => isAdmin ? AdminMenus : UserMenus;
  const { name, photo } = props;

  return (
    <Drawer
      modal={(width < breakpoint)}
      open={isMenuOpen}
      onClose={() => setOpen(false)}
    >
      {mobileDrawerHeader(setOpen, name, photo)}
      <DrawerContent>
        {drawerContent(selectedIndex, setSelectedIndex, setOpen, checkIsAdmin)}
      </DrawerContent>
    </Drawer>
  );
};
