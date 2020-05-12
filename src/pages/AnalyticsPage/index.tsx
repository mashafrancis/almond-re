import * as React from 'react';

// third-party libraries
import {
  Cell,
  Grid,
  Row
} from '@material/react-layout-grid';
import { connect } from 'react-redux';

// components
import OpacityIcon from '@material-ui/icons/Opacity';
import MemoryIcon from '@material-ui/icons/Memory';
import WbIncandescentIcon from '@material-ui/icons/WbIncandescent';
import WavesIcon from "@material-ui/icons/Waves";
import BlurOnIcon from '@material-ui/icons/BlurOn';
import AnalyticsCard from "@components/AnalyticsCard";

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

  return (
    <Grid>
      <Row className="analytics-page">
        <Cell columns={4} desktopColumns={4} tabletColumns={4} phoneColumns={4}>
          <AnalyticsCard
            colorClass="card-color-blue"
            icon={<OpacityIcon className="content-icon" />}
            mainInfo="Next water schedule"
            subInfo="14:00 PM"
          />
        </Cell>
        <Cell columns={4} desktopColumns={4} tabletColumns={4} phoneColumns={4}>
          <AnalyticsCard
            colorClass="card-color-yellow"
            icon={<WbIncandescentIcon className="content-icon" />}
            mainInfo="Water Temperature"
            subInfo="18 &#8451;"
          />
        </Cell>
        <Cell columns={4} desktopColumns={4} tabletColumns={4} phoneColumns={4}>
          <AnalyticsCard
            colorClass="card-color-purple"
            icon={<MemoryIcon className="content-icon" />}
            mainInfo="Daily power usage"
            subInfo="30 KWatts"
          />
        </Cell>
      </Row>
      <Row className="analytics-page">
        <Cell columns={4} desktopColumns={4} tabletColumns={4} phoneColumns={4}>
          <AnalyticsCard
            colorClass="card-color-red"
            icon={<BlurOnIcon className="content-icon" />}
            mainInfo="Air Temperature"
            subInfo="18 &#8451;"
          />
        </Cell>
        <Cell columns={4} desktopColumns={4} tabletColumns={4} phoneColumns={4}>
          <AnalyticsCard
            colorClass="card-color-green"
            icon={<WavesIcon className="content-icon" />}
            mainInfo="Air Humidity"
            subInfo="58 %"
          />
        </Cell>
      </Row>
    </Grid>
  );
};

export const mapStateToProps = state => ({
  error: state.error,
});

export const mapDispatchToProps = dispatch => ({
  displaySnackMessage: message => dispatch(displaySnackMessage(message)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AnalyticsPage);
