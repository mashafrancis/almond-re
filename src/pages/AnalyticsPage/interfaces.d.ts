import { SensorData } from '@modules/sensorData/interfaces';

export interface AnalyticsPageProps {
	match: {
		url: string;
	};
	sensorData: SensorData;
	getAllSchedules: (id: string) => Promise<any>;
	timeSchedules: Array;
}

export interface RegularUserAnalyticsProps {
	sensorData: SensorData;
	getAllSchedules: (id: string) => Promise<any>;
	timeSchedules: Array;
}
