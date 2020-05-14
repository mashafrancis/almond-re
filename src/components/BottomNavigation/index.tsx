import * as React from 'react';

// components
import { AdminBottomNavigationMenus, BottomNavigationMenus } from '@components/MenuRoutes';

// third party
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { makeStyles } from '@material-ui/core/styles';
import { UserContext } from '@utils/context';
import { MenuContext } from "@context/MenuContext";

// styles
import './BottomNavigation.scss';

const useStyles = makeStyles({
  root: {
    width: 'auto',
    paddingLeft: '10px',
    paddingRight: '10px',
  },
});

export const PageBottomNavigation: React.FunctionComponent = () => {
  const menu = React.useContext(MenuContext);
  const user = React.useContext(UserContext);
  const { setSelectedIndex } = menu;

  const checkIsAdmin = () => user.isAdmin ? AdminBottomNavigationMenus : BottomNavigationMenus;

  // @ts-ignore
  const classes = useStyles();
  const selectedIndex = JSON.parse(window.localStorage.getItem('selectedIndex') as string);
  const [value, setValue] = React.useState(selectedIndex.item ?? 0);

  // :TODO Avoid wasteful re-rendering while using inline functions (use .bind on the function as below)
  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      className={`${classes.root} page-content__navigation`}
      showLabels
    >
      {
        checkIsAdmin().map((menu, index) => (
          <BottomNavigationAction
            key={index}
            onClick={setSelectedIndex.bind(null,{ group: 0, item: index })}
            label={menu.label}
            icon={menu.icon}
          />
          )
        )
      }
    </BottomNavigation>
  );
};

export default PageBottomNavigation;
