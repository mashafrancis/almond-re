import * as React from 'react';

// third-party libraries
import {
  Cell,
  Grid,
  Row
} from '@material/react-layout-grid';
import { connect } from 'react-redux';

// thunks
import { displaySnackMessage } from '../../store/modules/snack';

// pages
import DashboardPage from '../DashboardPage';

// interfaces
import {
  WaterCyclesPageProps,
  WaterCyclesPageState
} from './interfaces';

const WaterCyclesPageComponent = () => {
  return (
    <Grid>
      <Row>
        <Cell
          columns={12}
          desktopColumns={12}
          tabletColumns={8}
          phoneColumns={4}
        >
          <div className="cover">
            <div className="head-title">
              <div className="title-cover title-cover-page">
                <h2>WaterCycles</h2>
              </div>
            </div>
          </div>
        </Cell>
      </Row>
    </Grid>
  );
}

const WaterCyclesPage = () => {
  return (
    <DashboardPage component={WaterCyclesPageComponent()} />
  );
};

export const mapStateToProps = state => ({
  error: state.error,
});

export const mapDispatchToProps = dispatch => ({
  displaySnackMessage: message => dispatch(displaySnackMessage(message)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WaterCyclesPage);
