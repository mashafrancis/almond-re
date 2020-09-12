import React, { useContext, useEffect, useState } from 'react';

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
import { useSubscription } from 'mqtt-hooks';
import loadable from '@loadable/component'
import { data } from '@pages/AnalyticsPage/fixtures';
import formatWaterLevelData from '@utils/formatWaterLevel';
import { IData, RegularUserAnalytics } from '@pages/AnalyticsPage/interfaces';

const AnalyticsCard = loadable(() => import('@components/AnalyticsCard'));

const RegularUserAnalytics = (): JSX.Element => {
  const [state, setState] = useState<RegularUserAnalytics>({
    data: {
      temp: 0,
      humid: 0,
      water_level: 0
    },
    lastMessage: {}
  });

  // const { lastMessage } = useSubscription('almond/data');
  //
  // useEffect(() => {
  //   // const { temp, humid, water_level } = message;
  //   setState(prevState => ({
  //     ...prevState,
  //     // data: {
  //     //   temp: temp || 0,
  //     //   humid: humid,
  //     //   water_level: water_level
  //     // }
  //     lastMessage: lastMessage
  //   }));
  //
  //   return () => console.log('cleaning up...');
  // }, [])

  const menu = useContext(MenuContext);
  const { setSelectedIndex } = menu;
  const { temp, humid, water_level } = data;

  // const { data: { temp = 0, humid = 0, water_level = 0 } } = message;

  return (
    <>
      <Row className="analytics-page">
        <Cell columns={4} desktopColumns={4} tabletColumns={4} phoneColumns={4}>
          <AnalyticsCard
            onClick={setSelectedIndex.bind(null,{ group: 0, item: 1 })}
            colorClass="card-color-blue"
            icon={<OpacityTwoTone className="content-icon" />}
            mainInfo="Water Level"
            subInfo={`${formatWaterLevelData(water_level)} %`}
            />
        </Cell>
        <Cell columns={4} desktopColumns={4} tabletColumns={4} phoneColumns={4}>
          <AnalyticsCard
            onClick={setSelectedIndex.bind(null,{ group: 0, item: 1 })}
            colorClass="card-color-yellow"
            icon={<BlurLinearTwoTone className="content-icon" />}
            mainInfo="Water Temperature"
            subInfo={`${state.data.temp} \u00b0C`}
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
            subInfo={`${temp} \u00b0C`}
            />
        </Cell>
        <Cell columns={4} desktopColumns={4} tabletColumns={4} phoneColumns={4}>
          <AnalyticsCard
            onClick={setSelectedIndex.bind(null,{ group: 0, item: 2 })}
            colorClass="card-color-green"
            icon={<Waves className="content-icon" />}
            mainInfo="Air Humidity"
            subInfo={`${humid} %`}
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
        {/*<div>*/}
        {/*  <h3>{lastMessage?.topic}</h3>*/}
        {/*  <h3>{lastMessage?.message}</h3>*/}
        {/*</div>*/}
        {/*<iframe src={'http://admin:froyogreen@authproxy.localhost:3001/d/-ZYO3jNGz/temperature?orgId=1&refresh=5s&from=1598639894006&to=1598640194006'} />*/}
      </Row>
    </>
  )
}

export default RegularUserAnalytics;
