import { SensorData } from '@modules/sensorData/interfaces';

export interface AnalyticsPageProps {
	match: {
		url: string;
	};
	sensorData: SensorData;
}

export interface RegularUserAnalyticsProps {
	sensorData: SensorData;
}
