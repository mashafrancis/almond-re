import * as React from 'react';

// third party
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import {
  Favorite,
  Folder,
  LocationOn,
  Restore
} from '@material-ui/icons';

// styles
import { makeStyles } from '@material-ui/core/styles';
import './BottomNavBar.scss';

const useStyles = makeStyles({
  root: {
    width: 500,
  },
});

const BottomNavigationBar = () => {
  // @ts-ignore
  const classes = useStyles();
  const [value, setValue] = React.useState('recents');

  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation value={value} onChange={handleChange} className={classes.root}>
      <BottomNavigationAction label="Recents" value="recents" icon={<Restore />} />
      <BottomNavigationAction label="Favorites" value="favorites" icon={<Favorite />} />
      <BottomNavigationAction label="Nearby" value="nearby" icon={<LocationOn />} />
      <BottomNavigationAction label="Folder" value="folder" icon={<Folder />} />
    </BottomNavigation>
  );
}

export default BottomNavigationBar;
