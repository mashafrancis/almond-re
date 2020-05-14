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

// styles
import './EnvironmentControlPage.scss';

// interfaces
import {
  EnvironmentControlPageProps,
  EnvironmentControlPageState
} from './interfaces';
import DashboardCard from "@components/DashboardCard";
import ActionButton from "@components/ActionButton";
import {DonutDisplay} from "@components/DonutDisplay";
import {AreaChardDisplay} from "@components/AreaChartDisplay";

export const EnvironmentControlPage: React.FunctionComponent<EnvironmentControlPageProps> = (props) => {
  const [state, setState] = React.useState<EnvironmentControlPageState>({
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
      <Row>
        <Cell columns={7} desktopColumns={7} tabletColumns={8} phoneColumns={4}>
          {(window.innerWidth < 539) && <div className="main-subheader"><h3>EnvironmentControl</h3></div>}
        </Cell>
      </Row>
      <Row className="analytics-page">
        <Cell columns={4} desktopColumns={4} tabletColumns={4} phoneColumns={4}>
          <DashboardCard
            classes="recent-activities-available"
            heading="Air Temperature"
            body={
              <DonutDisplay
                backgroundColor={['#36A2EB', '#CCCCCC']}
                hoverBackgroundColor={['#36A2EB', '#CCCCCC']}
                data={[20, 50]}
                donutInfo={`${18}degs`}
                halfDonut
              />
              }
          />
        </Cell>
        <Cell columns={4} desktopColumns={4} tabletColumns={8} phoneColumns={4}>
          <DashboardCard
            classes="recent-activities-available"
            heading="Air Humidity"
            body={
              <DonutDisplay
                backgroundColor={['#FFCE56', '#CCCCCC']}
                hoverBackgroundColor={['#FFCE56', '#CCCCCC']}
                data={[40, 50]}
                donutInfo={`${80}%`}
                halfDonut
              />
            }
            // actionItem={<ActionButton name="Refresh" icon="update" />}
          />
        </Cell>
        <Cell columns={4} desktopColumns={4} tabletColumns={8} phoneColumns={4}>
          <DashboardCard
            classes="recent-activities-available"
            heading="About"
            body={`You can monitor the plant environment, the air temperature and humidity. The given set points for optimal plant growth are: 27 degrees celcius for temperature and 55 % for humidity`}
            // actionItem={<ActionButton name="Refresh" icon="update" />}
          />
          {/*<GeneralCardInfo*/}
          {/*  mainHeader="About Environmental Control"*/}
          {/*  subHeader={`You can monitor the plant environment, the air temperature and humidity. The given set points for optimal plant growth are: 27 degrees celcius for temperature and 55 % for humidity`}*/}
          {/*  icon={<BlurCircularIcon className="content-icon general-info-icon" />}*/}
          {/*  />*/}
        </Cell>
      </Row>
      <Row>
        <Cell columns={6} desktopColumns={6} tabletColumns={4} phoneColumns={4}>
          <DashboardCard
            classes="recent-activities-available"
            heading="Daily Temperature Chart"
            body={
              <AreaChardDisplay
                backgroundColor={'rgba(25, 103, 210, 0.2)'}
                chartColor={'#36A2EB'}
                chartData={[15, 16, 20, 27, 21, 24, 21, 19, 16]}
              />
            }
            actionItem={<ActionButton name="Filter" icon="filter_list" />}
          />
        </Cell>
        <Cell columns={6} desktopColumns={6} tabletColumns={8} phoneColumns={4}>
          <DashboardCard
            classes="recent-activities-available"
            heading="Daily Humidity Chart"
            body={
              <AreaChardDisplay
                backgroundColor={'rgba(255,206,86,0.2)'}
                chartColor={'#FFCE56'}
                chartData={[25, 36, 50, 57, 40, 70, 55, 30, 47]}
              />
            }
            actionItem={<ActionButton name="Filter" icon="filter_list" />}
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

export default connect(mapStateToProps, mapDispatchToProps)(EnvironmentControlPage);
