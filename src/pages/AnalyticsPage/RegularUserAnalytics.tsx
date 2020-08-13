import React, { useContext, FunctionComponent } from 'react';

// components
import {
  Cell,
  Row
} from '@material/react-layout-grid';
import {
  BlurLinearTwoTone, BlurOn, MemoryTwoTone,
  OpacityTwoTone,
  ScheduleTwoTone, Waves
} from '@material-ui/icons';
import { MenuContext } from '@context/MenuContext';
import loadable from '@loadable/component'

const AnalyticsCard = loadable(() => import('@components/AnalyticsCard'));

const RegularUserAnalytics = (): JSX.Element => {
  const menu = useContext(MenuContext);
  const { setSelectedIndex } = menu;

  return (
    <>
      <Row className="analytics-page">
        <Cell columns={4} desktopColumns={4} tabletColumns={4} phoneColumns={4}>
          <AnalyticsCard
            onClick={setSelectedIndex.bind(null,{ group: 0, item: 1 })}
            colorClass="card-color-blue"
            icon={<OpacityTwoTone className="content-icon" />}
            mainInfo="Water Level"
            subInfo="70 %"
            />
        </Cell>
        <Cell columns={4} desktopColumns={4} tabletColumns={4} phoneColumns={4}>
          <AnalyticsCard
            onClick={setSelectedIndex.bind(null,{ group: 0, item: 1 })}
            colorClass="card-color-yellow"
            icon={<BlurLinearTwoTone className="content-icon" />}
            mainInfo="Water Temperature"
            subInfo="18 &deg;C"
            />
        </Cell>
        <Cell columns={4} desktopColumns={4} tabletColumns={4} phoneColumns={4}>
          <AnalyticsCard
            onClick={setSelectedIndex.bind(null,{ group: 0, item: 1 })}
            colorClass="card-color-brown"
            icon={<ScheduleTwoTone className="content-icon" />}
            mainInfo="Next schedule"
            subInfo="14:00"
            />
        </Cell>
      </Row>
      <Row className="analytics-page">
        <Cell columns={4} desktopColumns={4} tabletColumns={4} phoneColumns={4}>
          <AnalyticsCard
            onClick={setSelectedIndex.bind(null,{ group: 0, item: 2 })}
            colorClass="card-color-red"
            icon={<BlurOn className="content-icon" />}
            mainInfo="Air Temperature"
            subInfo="18 &deg;C"
            />
        </Cell>
        <Cell columns={4} desktopColumns={4} tabletColumns={4} phoneColumns={4}>
          <AnalyticsCard
            onClick={setSelectedIndex.bind(null,{ group: 0, item: 2 })}
            colorClass="card-color-green"
            icon={<Waves className="content-icon" />}
            mainInfo="Air Humidity"
            subInfo="58 %"
            />
        </Cell>
        <Cell columns={4} desktopColumns={4} tabletColumns={4} phoneColumns={4}>
          <AnalyticsCard
            onClick={setSelectedIndex.bind(null,{ group: 0, item: 3 })}
            colorClass="card-color-purple"
            icon={<MemoryTwoTone className="content-icon" />}
            mainInfo="Power usage"
            subInfo="30 KW"
            />
        </Cell>
      </Row>
    </>
  )
}

export default RegularUserAnalytics;
