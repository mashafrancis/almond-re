// react libraries
import { Cell, Grid, Row } from '@material/react-layout-grid';
import * as React from 'react';

// third-party libraries
import { NavLink, Redirect, Switch } from 'react-router-dom';

// interfaces
import { SettingsPageProps } from '@pages/SettingsPage/interfaces';

// helpers
import authorize from '@utils/helpers/authorize';

const checkPermissions = (url) => {
  if (authorize(['roles:view'])) {
    return <Redirect to={`${url}/user-roles`} />;
  }
};

const Settings = ({ match }: SettingsPageProps) => (
  <React.Fragment>
    <Grid>
      <Row>
        <Cell columns={7} desktopColumns={7} tabletColumns={8} phoneColumns={4}>
          {(window.innerWidth < 539) && <div className="main-subheader"><h3>User Roles</h3></div>}
        </Cell>
      </Row>
      <Row>
        <Cell columns={12} desktopColumns={12} tabletColumns={8} phoneColumns={4}>
        </Cell>
      </Row>
    </Grid>
  </React.Fragment>
)
