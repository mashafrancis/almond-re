import { ChartDataTrend, SensorData } from '@modules/sensorData/interfaces';
import { QueryParams } from '../../shared.interfaces';

export interface EnvironmentControlPageProps {
	sensorData: SensorData;
	getAirTemperatureTrend: (queryParams: QueryParams) => Promise<any>;
	airTemperatureTrend: ChartDataTrend[];
}

export interface EnvironmentControlPageState {
	isDateRangeHidden: boolean;
	currentDateInView: string;
	airTemperatureCardDateRange: string;
}
