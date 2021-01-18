import {
	Schedule,
	SchedulePayload,
	Status,
	ToggleSchedulePayload,
} from '@modules/timeSchedules/interfaces';
import { Device } from '@modules/user/interfaces';
import { Location } from 'history';
import {
	ChartDataTrend,
	SensorData,
	WaterData,
} from '@modules/sensorData/interfaces';
import { ErrorObject, QueryParams } from '../../shared.interfaces';

export interface WaterCyclesPageProps {
	addNewSchedule: (schedule: SchedulePayload) => Promise<any>;
	editSchedule: (id: string, schedule: SchedulePayload) => Promise<any>;
	getAllSchedules: (id: string) => Promise<any>;
	deleteSingleSchedule: (id: string) => Promise<any>;
	displaySnackMessage?: (message: string) => Promise<any>;
	togglePump: (payload: ToggleSchedulePayload) => Promise<any>;
	getPumpStatus: (id: string) => Promise<any>;
	toggleScheduleStatus: (
		id: string,
		payload: ToggleSchedulePayload,
	) => Promise<any>;
	getAirTemperatureTrend: (queryParams: QueryParams) => Promise<any>;
	status?: Status;
	error?: ErrorObject;
	schedules: Schedule[];
	match: {
		url: string;
	};
	isLoading: boolean;
	location: Location;
	enabled: boolean;
	devices: Device[];
	sensorData: SensorData;
	waterTemperatureTrend: ChartDataTrend[];
}

export interface WaterCyclesPageState {
	isEditMode: boolean;
	isDeleteModalOpen: boolean;
	scheduleId: string;
	statusClass: string;
	isEnabled: boolean;
	// isFormModalOpen: boolean;
	isScheduleModalOpen: boolean;
	scheduleToEdit: string;
	isActionDone: boolean;
	isLoading: boolean;
	isDateRangeHidden: boolean;
	currentDateInView: string;
	waterCardDateRange: string;
	selectedTimeSchedule: any;
	hasError: boolean;
	schedules: Schedule[];
}
