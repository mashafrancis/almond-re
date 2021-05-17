import { Line } from 'react-chartjs-2';
import { AreaChartDisplayProps } from '@components/organisms/AreaChartDisplay/interfaces';
import 'chartjs-adapter-luxon';
import 'chartjs-plugin-streaming';
import { Grid } from '@material-ui/core';
import Chart from 'chart.js';

const AreaChardDisplay = ({
	chartData,
	backgroundColor,
	chartColor,
	labels,
}: AreaChartDisplayProps): JSX.Element => {
	const data = {
		labels,
		datasets: [
			{
				label: 'Temperature',
				fill: true,
				lineTension: 0.5,
				backgroundColor,
				borderColor: chartColor,
				borderCapStyle: 'round',
				borderJoinStyle: 'round',
				borderWidth: '0.8',
				maintainAspectRatio: false,
				pointBorderColor: chartColor,
				pointBackgroundColor: '#fff',
				pointBorderWidth: 0.6,
				pointHoverRadius: 5,
				pointHoverBackgroundColor: chartColor,
				pointHoverBorderColor: 'rgba(220,220,220,1)',
				pointHoverBorderWidth: 2,
				pointRadius: 1,
				pointHitRadius: 10,
				// data: chartData,
			},
		],
		options: {
			legend: {
				display: false,
			},
			scales: {
				x: {
					type: 'realtime',
					realtime: {
						duration: 60_000,
						// refresh: 1_000,
						// onRefresh: (chart) => {
						// 	const xhr = new XMLHttpRequest();
						// 	xhr.open(
						// 		'GET',
						// 		'http://localhost:8081/api/range-data?start=1619816400&stop=1622494799&measurement=temperature',
						// 	);
						// 	xhr.onload = () => {
						// 		if (xhr.readyState === 4 && xhr.status === 200) {
						// 			const resData = JSON.parse(xhr.responseText);
						// 			Array.prototype.push.apply(
						// 				chart.data.datasets[0].data,
						// 				resData.data.map((element) => Number(element.value)),
						// 			);
						// 			chart.update('none');
						// 		}
						// 	};
						// 	xhr.send();
						// 	console.log(
						// 		'Class: realtime, Function: onRefresh, Line 69 chart():',
						// 		chart,
						// 	);
						// },
						onRefresh: (chart: { data: { datasets: any[] } }) => {
							chart.data.datasets.forEach((dataset) => {
								dataset.data.push({
									x: Date.now(),
									y: Math.random(),
								});
							});
						},
						delay: 2_000,
					},
				},
				y: {
					title: {
						display: true,
						text: 'Temperature',
					},
				},
			},
			layout: {
				padding: {
					left: 0,
					right: 0,
					top: 0,
					bottom: 0,
				},
			},
			// scales: {
			//   xAxes: [{
			//     gridLines: {
			//       drawOnChartArea:false
			//     }
			//   }],
			//   yAxes: [{
			//     gridLines: {
			//       drawOnChartArea:false
			//     }
			//   }]
			// }
		},
	};

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	return <Line data={data} options={data.options} />;
};

export default AreaChardDisplay;
