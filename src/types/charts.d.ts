import { ChartTypeRegistry } from 'chart.js';

declare module 'chart.js' {
	interface ChartTypeRegistry {
		derivedDoughnut: ChartTypeRegistry['doughnut'];
	}
}
