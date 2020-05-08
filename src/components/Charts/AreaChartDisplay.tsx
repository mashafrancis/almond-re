import * as React from 'react';
import { Line } from "react-chartjs-2";
import './AreaCharts.scss';

const data = {
  labels: ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00', '00:00'],
  datasets: [
    {
      label: 'Temperature',
      fill: true,
      lineTension: 0.3,
      backgroundColor: 'rgba(25, 103, 210, 0.2)',
      borderColor: '#1967D2',
      borderCapStyle: 'round',
      borderJoinStyle: 'round',
      borderWidth: '0.8',
      pointBorderColor: '#1967D2',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 0.6,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: '#1967D2',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [15, 16, 20, 27, 21, 24, 21, 19, 16]
    }
  ]
};

export class AreaChartDisplay extends React.PureComponent {
  render() {
    return (
      <div>
        <Line data={data} />
      </div>
    );
  }
}
