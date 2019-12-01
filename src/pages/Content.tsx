import * as React from 'react';

// third party libraries
import { TopAppBarFixedAdjust } from '@material/react-top-app-bar';

import { MenuContext } from '@components/Context';
import { Menus } from '@pages/MenuRoutes';

export const Content = () => (
  <MenuContext.Consumer>
    {({ selectedIndex }) => (
      <TopAppBarFixedAdjust>
        {React.createElement(Menus[selectedIndex].component)}
      </TopAppBarFixedAdjust>
    )}
  </MenuContext.Consumer>
);
