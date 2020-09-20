import React from 'react';
import { Line } from 'react-chartjs-2';
import './AreaCharts.scss';
import { AreaChartDisplayProps } from '@components/AreaChartDisplay/interfaces';

const AreaChardDisplay = (props: AreaChartDisplayProps): JSX.Element => {
	const { chartData, backgroundColor, chartColor } = props;

	const data = {
		labels: [
			'00:00',
			'03:00',
			'06:00',
			'09:00',
			'12:00',
			'15:00',
			'18:00',
			'21:00',
			'00:00',
		],
		datasets: [
			{
				// label: 'Temperature',
				fill: true,
				lineTension: 0.5,
				backgroundColor,
				borderColor: chartColor,
				borderCapStyle: 'round',
				borderJoinStyle: 'round',
				borderWidth: '0.8',
				pointBorderColor: chartColor,
				pointBackgroundColor: '#fff',
				pointBorderWidth: 0.6,
				pointHoverRadius: 5,
				pointHoverBackgroundColor: chartColor,
				pointHoverBorderColor: 'rgba(220,220,220,1)',
				pointHoverBorderWidth: 2,
				pointRadius: 1,
				pointHitRadius: 10,
				data: chartData,
			},
		],
		options: {
			legend: {
				display: false,
			},
		},
	};

	return <Line data={data} options={data.options} />;
};

export default AreaChardDisplay;
