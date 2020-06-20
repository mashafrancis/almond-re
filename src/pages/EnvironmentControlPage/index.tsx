import * as React from 'react';

// third-party libraries
import {
  Cell,
  Grid,
  Row
} from '@material/react-layout-grid';
import { connect } from 'react-redux';

// components
const DashboardCard = React.lazy(() => import('@components/DashboardCard'));
const DonutDisplay = React.lazy(() => import('@components/DonutDisplay'));
const AreaChardDisplay = React.lazy(() => import('@components/AreaChartDisplay'));
import ActionButton from "@components/ActionButton";
import { FilterList } from "@material-ui/icons";

// thunks
import { displaySnackMessage } from '@modules/snack';
import { getEnvironmentData } from "@modules/sensorData";

// styles
import './EnvironmentControlPage.scss';

// interfaces
import {
  EnvironmentControlPageProps,
  EnvironmentControlPageState
} from './interfaces';
import round from "@utils/helpers/roundDigit";

export const EnvironmentControlPage: React.FunctionComponent<EnvironmentControlPageProps> = (props) => {
  const [state, setState] = React.useState<EnvironmentControlPageState>({
    environmentData: []
  });

  // React.useEffect(() => {
  //   props.getEnvironmentData();
  //     // .then(() => setState({ ...state, environmentData: props.environmentData }))
  // }, [])

  const {
    currentTemperature,
    currentHumidity
  } = props.environmentData;

  const temperature = round(currentTemperature, 1) || 0;
  const humidity = round(currentHumidity, 1) || 0;

  const donutData = [
    {
      heading: "Air Temperature",
      backgroundColor: ['#36A2EB', '#CCCCCC'],
      hoverBackgroundColor: ['#36A2EB', '#CCCCCC'],
      data: [temperature, (100 - temperature)],
      donutInfo: `${temperature} \u00b0C`
    },
    {
      heading: "Plant Humidity",
      backgroundColor: ['#FFCE56', '#CCCCCC'],
      hoverBackgroundColor: ['#FFCE56', '#CCCCCC'],
      data: [humidity, (100 - humidity)],
      donutInfo: `${humidity}%`
    },
    {
      heading: "Water Temperature",
      backgroundColor: ['#7ad283', '#CCCCCC'],
      hoverBackgroundColor: ['#7ad283', '#CCCCCC'],
      data: [humidity, (200 - humidity)],
      donutInfo: `${humidity}%`
    }
  ];

  return (
    <Grid>
      <Row>
        <Cell columns={7} desktopColumns={7} tabletColumns={8} phoneColumns={4}>
          {(window.innerWidth < 539) && <div className="main-subheader"><h3>EnvironmentControl</h3></div>}
        </Cell>
      </Row>
      <Row className="analytics-page">
        {
          donutData.map((data, index) => (
            <Cell key={index} columns={4} desktopColumns={4} tabletColumns={4} phoneColumns={4}>
              <DashboardCard
                classes="recent-activities-available"
                heading={data.heading}
                body={
                  <DonutDisplay
                    backgroundColor={data.backgroundColor}
                    hoverBackgroundColor={data.hoverBackgroundColor}
                    data={data.data}
                    donutInfo={data.donutInfo}
                    halfDonut={true}
                  />
                }
              />
            </Cell>
          ))
        }
        {/*<Cell columns={4} desktopColumns={4} tabletColumns={8} phoneColumns={4}>*/}
        {/*  <DashboardCard*/}
        {/*    classes="recent-activities-available"*/}
        {/*    heading="About"*/}
        {/*    body={`You can monitor the plant environment, the air temperature and humidity. The given set points for optimal plant growth are: 27 degrees celcius for temperature and 55 % for humidity`}*/}
        {/*    // actionItem={<ActionButton name="Refresh" icon="update" />}*/}
        {/*  />*/}
        {/*  /!*<GeneralCardInfo*!/*/}
        {/*  /!*  mainHeader="About Environmental Control"*!/*/}
        {/*  /!*  subHeader={`You can monitor the plant environment, the air temperature and humidity. The given set points for optimal plant growth are: 27 degrees celcius for temperature and 55 % for humidity`}*!/*/}
        {/*  /!*  icon={<BlurCircularIcon className="content-icon general-info-icon" />}*!/*/}
        {/*  /!*  />*!/*/}
        {/*</Cell>*/}
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
            actionItem={<ActionButton name="Filter" icon={<FilterList/>} />}
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
            actionItem={<ActionButton name="Filter" icon={<FilterList/>} />}
          />
        </Cell>
      </Row>
    </Grid>
  );
};

export const mapStateToProps = state => ({
  environmentData: state.sensorData.environmentData
});

export const mapDispatchToProps = dispatch => ({
  displaySnackMessage: message => dispatch(displaySnackMessage(message)),
  getEnvironmentData: () => dispatch(getEnvironmentData())
});

export default connect(mapStateToProps, mapDispatchToProps)(EnvironmentControlPage);
