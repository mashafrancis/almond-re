import { memo, useEffect } from 'react';
import { Doughnut, Chart } from 'react-chartjs-2';
import { DoughnutController } from 'chart.js';
import { DonutDisplayProps } from '@components/organisms/DonutDisplay/interfaces';
import { Grid } from '@material-ui/core';

// some of this code is a variation on https://jsfiddle.net/cmyker/u6rr5moq/
// const originalDoughnutDraw = Chart.controllers.doughnut.prototype.draw;
// Chart.helpers.extend(Chart.controllers.doughnut.prototype, {
// 	draw() {
// 		originalDoughnutDraw.apply(this, arguments);
//
// 		const { chart } = this.chart;
// 		const { ctx } = chart;
// 		const { width } = chart;
// 		const { height } = chart;
//
// 		const fontSize = (height / 80).toFixed(2);
// 		ctx.font = `${fontSize}em Google Sans,Roboto,Helvetica Neue,sans-serif`;
// 		ctx.textBaseline = 'middle';
//
// 		const centerConfig = chart.config.options.elements.center;
// 		const { text } = centerConfig;
// 		const color = centerConfig.color || '#343434';
// 		const textYHeight = centerConfig.textYHeight || 2;
//
// 		const textX = Math.round((width - ctx.measureText(text).width) / 2);
// 		const textY = height / textYHeight;
//
// 		ctx.fillStyle = color;
// 		ctx.fillText(text, textX, textY);
// 	},
// });

// Chart.types.Doughnut.extend({
//   name: "DoughnutTextInside",
//   showTooltip: function() {
//     this.chart.ctx.save();
//     Chart.types.Doughnut.prototype.showTooltip.apply(this, arguments);
//     this.chart.ctx.restore();
//   },
//   draw: function() {
//     Chart.types.Doughnut.prototype.draw.apply(this, arguments);
//
//     var width = this.chart.width,
//       height = this.chart.height;
//
//     var fontSize = (height / 114).toFixed(2);
//     this.chart.ctx.font = fontSize + "em Verdana";
//     this.chart.ctx.textBaseline = "middle";
//
//     var text = "82%",
//       textX = Math.round((width - this.chart.ctx.measureText(text).width) / 2),
//       textY = height / 2;
//
//     this.chart.ctx.fillText(text, textX, textY);
//   }
// });

// class Custom extends DoughnutController {
// 	draw() {
// 		// eslint-disable-next-line prefer-rest-params
// 		super.draw();
//
// 		const { ctx, width, height } = this.chart;
//
// 		ctx.restore();
// 		const fontSize = (height / 114).toFixed(2);
// 		ctx.font = `${fontSize}em Google Sans,Roboto,Helvetica Neue,sans-serif`;
// 		ctx.textBaseline = 'middle';
//
// 		const text = '75%';
// 		const textX = Math.round((width - ctx.measureText(text).width) / 2);
// 		const textY = height / 2;
//
// 		ctx.fillText(text, textX, textY);
// 		ctx.save();
//
// 		// const { ctx, width, height, config } = this.chart;
// 		//
// 		// // const { ctx } = chart;
// 		// // const { width } = chart;
// 		// // const { height } = chart;
// 		//
// 		// const fontSize = (height / 80).toFixed(2);
// 		// ctx.font = `${fontSize}em Google Sans,Roboto,Helvetica Neue,sans-serif`;
// 		// ctx.textBaseline = 'middle';
// 		//
// 		// const centerConfig = config?.options?.font;
// 		// const { text } = centerConfig;
// 		// const color = centerConfig.color || '#343434';
// 		// const textYHeight = centerConfig.textYHeight || 2;
// 		//
// 		// const textX = Math.round((width - ctx.measureText(text).width) / 2);
// 		// const textY = height / textYHeight;
// 		//
// 		// ctx.fillStyle = color;
// 		// ctx.fillText(text, textX, textY);
// 	}
// }
//
// Custom.id = 'derivedDoughnut';
// Custom.defaults = DoughnutController.defaults;

// // Stores the controller so that the chart initialization routine can look it up
// Chart.register(Custom);

const Donut = ({
	backgroundColor,
	hoverBackgroundColor,
	data,
	donutInfo,
	halfDonut,
}: DonutDisplayProps): JSX.Element => {
	// useEffect(() => {
	// 	console.log('Class: , Function: Donut, Line 115 donutInfo():', donutInfo);
	// 	Chart.register({
	// 		afterDraw(chart) {
	// 			const { ctx, width, height } = chart;
	//
	// 			ctx.restore();
	// 			const fontSize = (height / 114).toFixed(2);
	// 			ctx.font = `${fontSize}em Google Sans,Roboto,Helvetica Neue,sans-serif`;
	// 			ctx.textBaseline = 'middle';
	//
	// 			const text = `${donutInfo}`;
	// 			const textX = Math.round((width - ctx.measureText(text).width) / 2);
	// 			const textY = height / 2;
	//
	// 			ctx.fillText(text, textX, textY);
	// 			ctx.save();
	// 		},
	// 		id: 'doughnutChart',
	// 	} as any);
	// }, []);

	const donutDetails = {
		datasets: [
			{
				data,
				backgroundColor,
				hoverBackgroundColor,
				labelFontColor: backgroundColor[0],
				borderWidth: 1,
			},
		],
		// options: {
		// 	elements: {
		// 		center: {
		// 			text: donutInfo,
		// 			color: '#4e4e4e', // Default is #000000
		// 			textYHeight: halfDonut ? 1.2 : 2,
		// 		},
		// 	},
		// 	plugins: {
		// 		animations: false,
		// 	},
		// 	legend: {
		// 		display: false,
		// 	},
		// 	tooltips: {
		// 		enabled: false,
		// 		intersect: true,
		// 	},
		// 	rotation: halfDonut ? Math.PI : -0.5 * Math.PI,
		// 	circumference: halfDonut ? Math.PI : 2 * Math.PI,
		// 	segmentShowStroke: true,
		// 	segmentStrokeColor: '#fff',
		// 	segmentStrokeWidth: 2,
		// 	// percentageInnerCutout: 50,
		// 	// animationSteps: 100,
		// 	// animationEasing: 'easeOutBounce',
		// 	// animateRotate: true,
		// 	// animateScale: false,
		// 	responsive: true,
		// 	showScale: true,
		// 	maintainAspectRatio: false,
		// 	cutout: '50%',
		// 	radius: '50%',
		// },
	};

	// const donutChart = new Chart(document.getElementById('myChart'), {
	// 	type: 'doughnut',
	// 	data,
	// 	options: {
	// 		responsive: true,
	// 		legend: {
	// 			display: false,
	// 		},
	// 	},
	// });

	return (
		<Grid item xs={12}>
			<Doughnut
				data={donutDetails}
				// options={donutDetails.options}
				width={200}
				height={200}
				type="doughnut"
			/>
		</Grid>
	);
};

const donutPropsEqual = (prevData, nextData) => {
	return prevData.water_level === nextData.water_level;
};

const DonutDisplay = memo(Donut, donutPropsEqual);

export default DonutDisplay;
