import * as React from 'react';

// third-party libraries
import {
  Cell,
  Grid,
  Row
} from '@material/react-layout-grid';
import { connect } from 'react-redux';

// thunks
import { displaySnackMessage } from '@modules/snack';

// pages
import DashboardContainer from '../DashboardContainer';

// styles
import './AnalyticsPage.scss';

// interfaces
import {
  AnalyticsPageProps,
  AnalyticsPageState
} from './interfaces';

export const AnalyticsPage: React.FunctionComponent<AnalyticsPageProps> = (props) => {
  const [state, setState] = React.useState<AnalyticsPageState>({
    isEditMode: false,
    schedules: [],
    isDeleteModal: false,
    action: '',
    id: '',
    statusClass: '',
    isEnabled: false,
  });

  const AnalyticsPageComponent = () => {
    return (
      <Grid>
        <Row>
          <Cell columns={7} desktopColumns={7} tabletColumns={8} phoneColumns={4}>
            {(window.innerWidth < 539) && <div className="main-subheader"><h3>Analytics</h3></div>}
          </Cell>
        </Row>
      </Grid>
    );
  };

  return (
    <DashboardContainer
      title="Analytics"
      component={ AnalyticsPageComponent() }
    />
  );
};

export const mapStateToProps = state => ({
  error: state.error,
});

export const mapDispatchToProps = dispatch => ({
  displaySnackMessage: message => dispatch(displaySnackMessage(message)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AnalyticsPage);
