import * as React from 'react';
import {Doughnut} from 'react-chartjs-2';

function getRandomInt (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getState = () => ({
  labels: [
    'Empty',
    'Water Remaining'
  ],
  datasets: [{
    data: [20, 80],
    backgroundColor: [
      '#CCCCCC',
      '#36A2EB',
    ],
    hoverBackgroundColor: [
      '#939393',
      '#2d9fec'
    ]
  }]
});

const data = {
  // labels: [
  //   'Empty',
  //   'Water Remaining'
  // ],
  datasets: [{
    data: [70, 30],
    backgroundColor: [
      '#CCCCCC',
      '#36A2EB',
    ],
    hoverBackgroundColor: [
      '#939393',
      '#2d9fec'
    ]
  }]
};

export class DoughnutChartDisplay extends React.PureComponent {
  // componentWillMount() {
  //   setInterval(() => {
  //     this.setState(getState());
  //   }, 4000);
  // };

  render() {
    return (
      <div>
        {/*<Doughnut data={this.state} />*/}
        <Doughnut data={data} />
      </div>
    );
  }
}
